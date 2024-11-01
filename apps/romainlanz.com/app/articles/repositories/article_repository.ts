import { Article } from '#articles/domain/article';
import { ArticleIdentifier } from '#articles/domain/article_identifier';
import { db } from '#core/services/db';
import { DateTime } from 'luxon';
import type { ResultOf } from '#types/common';

interface StoreArticleDTO {
	title: string;
	summary: string;
	slug: string;
	markdownContent: string;
	markdownAst: any;
	categoryId: string;
}

interface UpdateArticleDTO {
	id: string;
	summary: string;
	title: string;
	markdownContent: string;
	markdownAst: any;
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
				markdown_ast: payload.markdownAst,
				markdown_content: payload.markdownContent,
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
				markdown_ast: payload.markdownAst,
				markdown_content: payload.markdownContent,
				category_id: payload.categoryId,
			})
			.where('id', '=', payload.id)
			.execute();
	}

	findById(id: string) {
		return db.selectFrom('articles').selectAll().where('id', '=', id).executeTakeFirst();
	}

	findBySlug(slug: string) {
		return db
			.selectFrom('articles')
			.leftJoin('categories', 'articles.category_id', 'categories.id')
			.select([
				'articles.id',
				'articles.title',
				'articles.slug',
				'articles.markdown_ast',
				'articles.markdown_content',
				'articles.created_at',
				'categories.name as category_name',
				'categories.slug as category_slug',
			])
			.where('articles.slug', '=', slug)
			.executeTakeFirstOrThrow();
	}
}
