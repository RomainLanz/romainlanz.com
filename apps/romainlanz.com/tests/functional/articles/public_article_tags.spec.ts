import { test } from '@japa/runner';
import { ArticleFixture } from '#tests/fixtures/article_fixture';

type PublicTag = {
	id: string;
	name: string;
	slug: string;
	color: string;
};

test.group('Public article tags', (group) => {
	let fixture: ArticleFixture;

	group.each.setup(async () => {
		fixture = new ArticleFixture();
		await fixture.resetDatabase();
	});

	test('exposes article tags on the article detail page', async ({ client, assert }) => {
		const adonis = await fixture.givenTag({ name: 'Adonis', slug: 'adonis', color: 'cyan' });
		const vue = await fixture.givenTag({ name: 'Vue', slug: 'vue', color: 'lime' });
		await fixture.givenPublishedArticle({ slug: 'tagged-article', tags: [vue, adonis] });

		const response = await client.get('/articles/tagged-article').withInertia();

		response.assertStatus(200);
		response.assertInertiaComponent('articles/show');
		const props = response.inertiaProps as { vm: { article: { tags: PublicTag[] } } };
		assert.deepEqual(props.vm.article.tags, [
			{ id: adonis.id, name: 'Adonis', slug: 'adonis', color: 'cyan' },
			{ id: vue.id, name: 'Vue', slug: 'vue', color: 'lime' },
		]);
	});

	test('exposes an empty tag list for an untagged article detail page', async ({ client, assert }) => {
		await fixture.givenPublishedArticle({ slug: 'untagged-article' });

		const response = await client.get('/articles/untagged-article').withInertia();

		response.assertStatus(200);
		const props = response.inertiaProps as { vm: { article: { tags: PublicTag[] } } };
		assert.deepEqual(props.vm.article.tags, []);
	});

	test('exposes article tags on landing page cards', async ({ client, assert }) => {
		const typescript = await fixture.givenTag({ name: 'TypeScript', slug: 'typescript', color: 'violet' });
		await fixture.givenPublishedArticle({ slug: 'latest-article', tags: typescript });

		const response = await client.get('/').withInertia();

		response.assertStatus(200);
		response.assertInertiaComponent('landing');
		const props = response.inertiaProps as { vm: { articles: Array<{ tags: PublicTag[] }> } };
		assert.deepEqual(props.vm.articles[0].tags, [
			{ id: typescript.id, name: 'TypeScript', slug: 'typescript', color: 'violet' },
		]);
	});
});
