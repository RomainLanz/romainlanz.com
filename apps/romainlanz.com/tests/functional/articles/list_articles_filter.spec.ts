import { test } from '@japa/runner';
import { ArticleFixture } from '#tests/fixtures/article_fixture';

test.group('List articles filters', (group) => {
	let fixture: ArticleFixture;

	group.each.setup(async () => {
		fixture = new ArticleFixture();
		await fixture.resetDatabase();
	});

	test('lists published articles without filters', async ({ client, assert }) => {
		await fixture.givenPublishedArticles([
			{
				title: 'Adonis article',
				slug: 'adonis-article',
				publishedAt: new Date('2026-01-01T00:00:00.000Z'),
			},
			{
				title: 'Vue article',
				slug: 'vue-article',
				publishedAt: new Date('2026-01-02T00:00:00.000Z'),
			},
		]);

		const props = await fixture.visitArticles(client);

		fixture.assertArticleTitles(assert, props, ['Vue article', 'Adonis article']);
		assert.equal(props.activeCategory, null);
		assert.equal(props.activeTag, null);
		assert.equal(props.categoryListingAllArticlesCount, 2);
		assert.equal(props.paginationArticlesCount, 2);
	});

	test('filters published articles by category', async ({ client, assert }) => {
		const backend = await fixture.givenCategory({ name: 'Backend', slug: 'backend' });
		const frontend = await fixture.givenCategory({ name: 'Frontend', slug: 'frontend' });
		await fixture.givenPublishedArticles([
			{ title: 'Adonis article', slug: 'adonis-article', category: backend },
			{ title: 'Vue article', slug: 'vue-article', category: frontend },
		]);

		const props = await fixture.visitArticles(client, { category: 'backend' });

		fixture.assertArticleTitles(assert, props, ['Adonis article']);
		assert.equal(props.activeCategory, 'backend');
		assert.equal(props.activeTag, null);
		assert.equal(props.categoryListingAllArticlesCount, 2);
		assert.equal(props.paginationArticlesCount, 1);
	});

	test('filters published articles by tag', async ({ client, assert }) => {
		const adonis = await fixture.givenTag({ name: 'Adonis', slug: 'adonis', color: 'cyan' });
		const vue = await fixture.givenTag({ name: 'Vue', slug: 'vue', color: 'lime' });
		await fixture.givenPublishedArticles([
			{ title: 'Adonis article', slug: 'adonis-article', tags: adonis },
			{ title: 'Vue article', slug: 'vue-article', tags: vue },
		]);

		const props = await fixture.visitArticles(client, { tag: 'adonis' });

		fixture.assertArticleTitles(assert, props, ['Adonis article']);
		assert.equal(props.activeCategory, null);
		assert.equal(props.activeTag, 'adonis');
		assert.equal(props.categoryListingAllArticlesCount, 1);
		assert.equal(props.paginationArticlesCount, 1);
	});

	test('combines category and tag filters with AND logic', async ({ client, assert }) => {
		const backend = await fixture.givenCategory({ name: 'Backend', slug: 'backend' });
		const frontend = await fixture.givenCategory({ name: 'Frontend', slug: 'frontend' });
		const adonis = await fixture.givenTag({ name: 'Adonis', slug: 'adonis', color: 'cyan' });
		const vue = await fixture.givenTag({ name: 'Vue', slug: 'vue', color: 'lime' });
		await fixture.givenPublishedArticles([
			{ title: 'Backend Adonis', slug: 'backend-adonis', category: backend, tags: adonis },
			{ title: 'Frontend Adonis', slug: 'frontend-adonis', category: frontend, tags: adonis },
			{ title: 'Backend Vue', slug: 'backend-vue', category: backend, tags: vue },
		]);

		const props = await fixture.visitArticles(client, { category: 'backend', tag: 'adonis' });

		fixture.assertArticleTitles(assert, props, ['Backend Adonis']);
		assert.equal(props.activeCategory, 'backend');
		assert.equal(props.activeTag, 'adonis');
		assert.equal(props.categoryListingAllArticlesCount, 2);
		assert.equal(props.paginationArticlesCount, 1);
	});

	test('returns not found for an unknown tag', async ({ client }) => {
		const response = await client.get('/articles').qs({ tag: 'unknown-tag' }).withInertia();

		response.assertStatus(404);
	});

	test('keeps category and tag filters while paginating', async ({ client, assert }) => {
		const backend = await fixture.givenCategory({ name: 'Backend', slug: 'backend' });
		const frontend = await fixture.givenCategory({ name: 'Frontend', slug: 'frontend' });
		const adonis = await fixture.givenTag({ name: 'Adonis', slug: 'adonis', color: 'cyan' });
		const vue = await fixture.givenTag({ name: 'Vue', slug: 'vue', color: 'lime' });
		await fixture.givenPublishedArticles([
			...Array.from({ length: 5 }, (_, index) => ({
				title: `Backend Adonis ${index + 1}`,
				slug: `backend-adonis-${index + 1}`,
				category: backend,
				tags: adonis,
				publishedAt: new Date(`2026-01-0${index + 1}T00:00:00.000Z`),
			})),
			{ title: 'Frontend Adonis', slug: 'frontend-adonis', category: frontend, tags: adonis },
			{ title: 'Backend Vue', slug: 'backend-vue', category: backend, tags: vue },
		]);

		const props = await fixture.visitArticles(client, { category: 'backend', tag: 'adonis', page: 2 });

		fixture.assertArticleTitles(assert, props, ['Backend Adonis 1']);
		assert.equal(props.activeCategory, 'backend');
		assert.equal(props.activeTag, 'adonis');
		assert.equal(props.activePage, 2);
		assert.equal(props.categoryListingAllArticlesCount, 6);
		assert.equal(props.paginationArticlesCount, 5);
	});
});
