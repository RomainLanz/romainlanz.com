import { Article } from '#articles/domain/article';
import { ArticleIdentifier } from '#articles/domain/article_identifier';
import { Category } from '#categories/domain/category';
import { CategoryIdentifier } from '#categories/domain/category_identifier';
import { db } from '#core/services/db';
import { DateTime } from 'luxon';
import type { IllustrationName } from '@rlanz/design-system/illustration';
import type { ResultOf } from '#types/common';

interface StoreArticleDTO {
	title: string;
	summary: string;
	slug: string;
	contentHtml: string;
	contentMarkdown: string;
	categoryId: string;
}

interface UpdateArticleDTO {
	id: string;
	summary: string;
	title: string;
	contentHtml: string;
	contentMarkdown: string;
	categoryId: string;
}

export type ArticleListQueryResult = ResultOf<ArticleRepository, 'all'>;
export type ArticlePaginatedQueryResult = ResultOf<ArticleRepository, 'paginated'>;
export type ArticleQueryResult = ResultOf<ArticleRepository, 'findBySlug'>;
export type ArticleByIdQueryResult = ResultOf<ArticleRepository, 'findById'>;

export class ArticleRepository {
	async all() {
		const articleRecords = await db.selectFrom('articles').select(['id', 'title', 'slug', 'published_at']).execute();

		return articleRecords.map((article) => {
			return Article.create({
				id: ArticleIdentifier.fromString(article.id),
				publishedAt: article.published_at ? DateTime.fromJSDate(article.published_at) : null,
				title: article.title,
				slug: article.slug,
				summary: null,
				content: null,
			});
		});
	}

	async count() {
		const countQueryResult = await db
			.selectFrom('articles')
			.select((builder) => builder.fn.count('articles.id').as('count'))
			.execute();

		return Number(countQueryResult[0].count);
	}

	async paginated(page: number, perPage: number) {
		const articleRecords = await db
			.selectFrom('articles')
			.select(['id', 'title', 'summary', 'slug', 'published_at'])
			.orderBy('published_at', 'desc')
			.where('published_at', 'is not', null)
			.where('published_at', '<=', new Date())
			.offset((page - 1) * perPage)
			.limit(perPage)
			.execute();

		return articleRecords.map((article) => {
			return Article.create({
				id: ArticleIdentifier.fromString(article.id),
				publishedAt: DateTime.fromJSDate(article.published_at!),
				title: article.title,
				slug: article.slug,
				summary: article.summary,
				content: null,
			});
		});
	}

	async findLastFourPublished() {
		const articleRecords = await db
			.selectFrom('articles')
			.select(['id', 'title', 'summary', 'slug', 'published_at'])
			.orderBy('published_at', 'desc')
			.where('published_at', 'is not', null)
			.where('published_at', '<=', new Date())
			.limit(4)
			.execute();

		return articleRecords.map((article) => {
			return Article.create({
				id: ArticleIdentifier.fromString(article.id),
				publishedAt: DateTime.fromJSDate(article.published_at!),
				title: article.title,
				slug: article.slug,
				summary: article.summary,
				content: null,
			});
		});
	}

	create(payload: StoreArticleDTO) {
		return db
			.insertInto('articles')
			.values({
				id: ArticleIdentifier.generate().toString(),
				created_at: new Date(),
				title: payload.title,
				slug: payload.slug,
				summary: payload.summary,
				content_html: payload.contentHtml,
				content_markdown: payload.contentMarkdown,
				category_id: payload.categoryId,
			})
			.execute();
	}

	update(payload: UpdateArticleDTO) {
		return db
			.updateTable('articles')
			.set({
				title: payload.title,
				summary: payload.summary,
				content_html: payload.contentHtml,
				content_markdown: payload.contentMarkdown,
				category_id: payload.categoryId,
			})
			.where('id', '=', payload.id)
			.execute();
	}

	findById(id: string) {
		return db.selectFrom('articles').selectAll().where('id', '=', id).executeTakeFirst();
	}

	async findBySlug(slug: string) {
		const articleRecord = await db
			.selectFrom('articles')
			.leftJoin('categories', 'articles.category_id', 'categories.id')
			.select([
				'articles.id',
				'articles.title',
				'articles.slug',
				'articles.content_html',
				'articles.published_at',
				'categories.id as category_id',
				'categories.name as category_name',
				'categories.slug as category_slug',
				'categories.illustration_name as category_illustration_name',
			])
			.where('articles.slug', '=', slug)
			.executeTakeFirstOrThrow();

		return Article.create({
			id: ArticleIdentifier.fromString(articleRecord.id),
			title: articleRecord.title,
			slug: articleRecord.slug,
			content: articleRecord.content_html,
			summary: null,
			publishedAt: DateTime.fromJSDate(articleRecord.published_at!),
			category: Category.create({
				id: CategoryIdentifier.fromString(articleRecord.category_id!),
				name: articleRecord.category_name!,
				slug: articleRecord.category_slug!,
				illustrationName: articleRecord.category_illustration_name as IllustrationName,
			}),
		});
	}
}
