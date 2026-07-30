import { test } from '@japa/runner';
import { CreateArticle } from '#articles/actions/create_article';
import { UpdateArticle } from '#articles/actions/update_article';
import type { ArticleRepository } from '#articles/repositories/article_repository';
import type { MarkdownCompiler } from '#articles/services/markdown_compiler';

type CreatePayload = Parameters<ArticleRepository['create']>[0];
type UpdatePayload = Parameters<ArticleRepository['update']>[0];

test.group('Article actions', () => {
	test('creates an article with compiled HTML, reading time, slug, and a Zurich publication date', async ({
		assert,
	}) => {
		let payload: CreatePayload | undefined;
		const repository = {
			async create(value: CreatePayload) {
				payload = value;
			},
		} as ArticleRepository;
		const compiler = {
			async toHtml() {
				return { toString: () => '<p>Compiled</p>' };
			},
		} as unknown as MarkdownCompiler;

		await new CreateArticle(repository, compiler).execute({
			title: 'Déjà Vu Article',
			summary: 'Summary',
			markdownContent: Array.from({ length: 239 }, () => 'word').join(' '),
			publishedAt: '2026-07-30T10:00',
			categoryId: 'category-id',
			tagIds: ['tag-id'],
		});

		assert.equal(payload?.contentHtml, '<p>Compiled</p>');
		assert.equal(payload?.readingTime, 2);
		assert.equal(payload?.slug, 'deja-vu-article');
		assert.equal(payload?.publishedAt?.toISOString(), '2026-07-30T08:00:00.000Z');
		assert.equal(payload?.contentMarkdown.split(' ').length, 239);
		assert.deepEqual(payload?.tagIds, ['tag-id']);
	});

	test('creates an unpublished article when the publication date is absent', async ({ assert }) => {
		let payload: CreatePayload | undefined;
		const repository = {
			async create(value: CreatePayload) {
				payload = value;
			},
		} as ArticleRepository;
		const compiler = {
			async toHtml() {
				return { toString: () => '<p>Draft</p>' };
			},
		} as unknown as MarkdownCompiler;

		await new CreateArticle(repository, compiler).execute({
			title: 'Draft article',
			summary: 'Summary',
			markdownContent: 'content',
			publishedAt: undefined,
			categoryId: 'category-id',
			tagIds: [],
		});

		assert.isNull(payload?.publishedAt);
	});

	test('updates the requested article and preserves its supplied slug', async ({ assert }) => {
		let payload: UpdatePayload | undefined;
		const repository = {
			async update(value: UpdatePayload) {
				payload = value;
			},
		} as ArticleRepository;
		const compiler = {
			async toHtml() {
				return { toString: () => '<p>Updated</p>' };
			},
		} as unknown as MarkdownCompiler;

		await new UpdateArticle(repository, compiler).execute({
			id: 'article-id',
			title: 'Updated title',
			summary: 'Updated summary',
			slug: 'custom-slug',
			markdownContent: 'updated markdown',
			publishedAt: undefined,
			categoryId: 'category-id',
			tagIds: [],
		});

		assert.equal(payload?.id, 'article-id');
		assert.equal(payload?.slug, 'custom-slug');
		assert.equal(payload?.contentHtml, '<p>Updated</p>');
		assert.equal(payload?.readingTime, 1);
		assert.isNull(payload?.publishedAt);
	});
});
