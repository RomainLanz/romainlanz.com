import { test } from '@japa/runner';
import { UserRepository } from '#identity/repositories/user_repository';
import { db } from '#shared/services/db';
import { migrateDatabase, truncateDatabase } from '#tests/database_test_utils';
import { AdminFactory, ArticleFactory, CategoryFactory, TagFactory } from '#tests/factories/index';
import type { FactoryRow } from '#tests/factories/index';
import type { ApiClient } from '@japa/api-client';

const userRepository = new UserRepository();

async function createAdmin() {
	const record = await AdminFactory.create();
	const admin = await userRepository.findUserByEmail(record.email);

	if (!admin) throw new Error('Admin user was not created');

	return admin;
}

function articlePayload(categoryId: string, tagIds: string[] = []) {
	return {
		title: 'Article sur AdonisJS',
		summary: 'Un résumé de cet article',
		markdownContent: 'Le contenu de cet article',
		publishedAt: '',
		categoryId,
		tagIds,
	};
}

async function createArticle(client: ApiClient, categoryId: string, tagIds: string[] = []) {
	const admin = await createAdmin();

	return client
		.post('/admin/articles')
		.loginAs(admin)
		.withCsrfToken()
		.redirects(0)
		.header('referer', '/admin/articles/create')
		.json(articlePayload(categoryId, tagIds));
}

async function updateArticle(client: ApiClient, article: FactoryRow<'articles'>, categoryId: string, tagIds: string[]) {
	const admin = await createAdmin();

	return client
		.put(`/admin/articles/${article.id}`)
		.loginAs(admin)
		.withCsrfToken()
		.redirects(0)
		.header('referer', `/admin/articles/${article.id}/edit`)
		.json({
			...articlePayload(categoryId, tagIds),
			slug: article.slug,
		});
}

async function findArticleTagIds(title: string) {
	return db
		.selectFrom('tag_articles')
		.innerJoin('articles', 'articles.id', 'tag_articles.article_id')
		.select('tag_articles.tag_id')
		.where('articles.title', '=', title)
		.orderBy('tag_articles.tag_id')
		.execute()
		.then((rows) => rows.map(({ tag_id }) => tag_id));
}

test.group('Admin article Tags', (group) => {
	group.each.setup(async () => {
		await migrateDatabase();
		await truncateDatabase();
	});

	test('creates an Article without a Tag', async ({ client, assert }) => {
		const category = await CategoryFactory.create();
		const response = await createArticle(client, category.id);

		response.assertStatus(302);
		response.assertHeader('location', '/admin/articles');
		assert.deepEqual(await findArticleTagIds('Article sur AdonisJS'), []);
	});

	test('creates an Article with one Tag', async ({ client, assert }) => {
		const category = await CategoryFactory.create();
		const tag = await TagFactory.create();
		const response = await createArticle(client, category.id, [tag.id]);

		response.assertStatus(302);
		response.assertHeader('location', '/admin/articles');
		assert.deepEqual(await findArticleTagIds('Article sur AdonisJS'), [tag.id]);
	});

	test('creates an Article with multiple Tags', async ({ client, assert }) => {
		const category = await CategoryFactory.create();
		const tags = await TagFactory.createMany(2);
		const response = await createArticle(
			client,
			category.id,
			tags.map(({ id }) => id),
		);

		response.assertStatus(302);
		response.assertHeader('location', '/admin/articles');
		assert.deepEqual(await findArticleTagIds('Article sur AdonisJS'), tags.map(({ id }) => id).sort());
	});

	test('shows the associated Tags when editing an Article', async ({ client, assert }) => {
		const category = await CategoryFactory.create();
		const tags = await TagFactory.createMany(2);
		const article = await ArticleFactory.for('category', category).with('tags', tags).create();
		const admin = await createAdmin();
		const response = await client.get(`/admin/articles/${article.id}/edit`).loginAs(admin).withInertia();

		response.assertStatus(200);
		response.assertInertiaComponent('admin/articles/update');
		assert.sameMembers(
			(response.inertiaProps.article as { tag_ids: string[] }).tag_ids,
			tags.map(({ id }) => id),
		);
		assert.sameMembers(
			(response.inertiaProps.tags as Array<{ id: string }>).map(({ id }) => id),
			tags.map(({ id }) => id),
		);
	});

	test('updates an Article to have zero Tags', async ({ client, assert }) => {
		const category = await CategoryFactory.create();
		const tags = await TagFactory.createMany(2);
		const article = await ArticleFactory.for('category', category).with('tags', tags).create();
		const response = await updateArticle(client, article, category.id, []);

		response.assertStatus(302);
		response.assertHeader('location', '/admin/articles');
		assert.deepEqual(await findArticleTagIds('Article sur AdonisJS'), []);
	});

	test('updates an Article to have multiple Tags', async ({ client, assert }) => {
		const category = await CategoryFactory.create();
		const tags = await TagFactory.createMany(2);
		const article = await ArticleFactory.for('category', category).create();
		const response = await updateArticle(
			client,
			article,
			category.id,
			tags.map(({ id }) => id),
		);

		response.assertStatus(302);
		response.assertHeader('location', '/admin/articles');
		assert.deepEqual(await findArticleTagIds('Article sur AdonisJS'), tags.map(({ id }) => id).sort());
	});

	test('rejects an Article with a Tag that does not exist', async ({ client, assert }) => {
		const category = await CategoryFactory.create();
		const response = await createArticle(client, category.id, ['7a28e15e-f122-4fa6-aaf2-64fc5d6b8d02']);

		response.assertStatus(302);
		response.assertHeader('location', '/admin/articles/create');
		response.assertFlashMessage('inputErrorsBag', {
			'tagIds.0': ['Le Tag sélectionné n’existe pas.'],
		});
		assert.isUndefined(
			await db.selectFrom('articles').select('id').where('title', '=', 'Article sur AdonisJS').executeTakeFirst(),
		);
	});

	test('rejects an Article update with a Tag that does not exist', async ({ client, assert }) => {
		const category = await CategoryFactory.create();
		const tag = await TagFactory.create();
		const article = await ArticleFactory.for('category', category).with('tags', tag).create();
		const response = await updateArticle(client, article, category.id, ['7a28e15e-f122-4fa6-aaf2-64fc5d6b8d02']);

		response.assertStatus(302);
		response.assertHeader('location', `/admin/articles/${article.id}/edit`);
		response.assertFlashMessage('inputErrorsBag', {
			'tagIds.0': ['Le Tag sélectionné n’existe pas.'],
		});
		assert.deepEqual(await findArticleTagIds(article.title), [tag.id]);
		assert.isUndefined(
			await db.selectFrom('articles').select('id').where('title', '=', 'Article sur AdonisJS').executeTakeFirst(),
		);
	});

	test('returns not found when updating an Article that does not exist', async ({ client }) => {
		const category = await CategoryFactory.create();
		const missingArticle = await ArticleFactory.for('category', category).create();
		await db.deleteFrom('articles').where('id', '=', missingArticle.id).execute();
		const response = await updateArticle(client, missingArticle, category.id, []);

		response.assertStatus(404);
	});
});
