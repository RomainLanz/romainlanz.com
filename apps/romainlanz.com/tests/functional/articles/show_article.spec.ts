import { test } from '@japa/runner';
import { ArticleFixture } from '#tests/fixtures/article_fixture';

test.group('Show article', (group) => {
	let fixture: ArticleFixture;

	group.each.setup(async () => {
		fixture = new ArticleFixture();
		await fixture.resetDatabase();
	});

	test('returns not found for an unknown article', async ({ client }) => {
		const response = await client.get('/articles/unknown-article').withInertia();

		response.assertStatus(404);
	});

	test('returns not found for an unknown article Open Graph image', async ({ client }) => {
		const response = await client.get('/articles/unknown-article/og.png');

		response.assertStatus(404);
	});

	test('returns not found for an unpublished article', async ({ client }) => {
		await fixture.givenPublishedArticle({
			slug: 'future-article',
			publishedAt: new Date('2099-01-01T00:00:00.000Z'),
		});

		const response = await client.get('/articles/future-article').withInertia();

		response.assertStatus(404);
	});

	test('returns not found for an unpublished article Open Graph image', async ({ client }) => {
		await fixture.givenPublishedArticle({
			slug: 'future-article',
			publishedAt: new Date('2099-01-01T00:00:00.000Z'),
		});

		const response = await client.get('/articles/future-article/og.png');

		response.assertStatus(404);
	});
});
