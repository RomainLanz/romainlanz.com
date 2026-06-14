import app from '@adonisjs/core/services/app';
import { test } from '@japa/runner';
import { DateTime } from 'luxon';
import AdminArticleIndexTransformer from '#admin/articles/transformers/admin_article_index_transformer';
import { Article } from '#articles/domain/article';
import { ArticleIdentifier } from '#articles/domain/article_identifier';

test.group('Admin article index transformer', () => {
	test('returns an object with articles for the admin articles list', async ({ assert }) => {
		const now = DateTime.fromISO('2026-06-14T12:00:00.000Z');
		const publishedAt = DateTime.fromISO('2026-06-13T12:00:00.000Z');
		const article = Article.create({
			id: ArticleIdentifier.fromString('0190188f-e84d-7db6-a0b7-832acd63f1ab'),
			publishedAt,
			title: 'Markdown directives',
			slug: 'markdown-directives',
			summary: null,
			content: null,
			readingTime: 1,
		});

		const vm = await AdminArticleIndexTransformer.transform({ articles: [article], now }).resolve(
			app.container.createResolver(),
			0,
		);

		assert.deepInclude(vm, {
			articles: [
				{
					id: '0190188f-e84d-7db6-a0b7-832acd63f1ab',
					title: 'Markdown directives',
					slug: 'markdown-directives',
					isPublished: true,
					publishedAtHuman: publishedAt.toFormat('ff'),
				},
			],
		});
	});
});
