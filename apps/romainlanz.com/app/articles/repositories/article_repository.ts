import { DateTime } from 'luxon';
import { Article } from '#articles/domain/article';
import { ArticleIdentifier } from '#articles/domain/article_identifier';
import { RecordNotFoundException } from '#core/exceptions/record_not_found_exception';
import { db } from '#core/services/db';
import { Category } from '#taxonomies/domain/category';
import { CategoryIdentifier } from '#taxonomies/domain/category_identifier';
import type { IllustrationName } from '@rlanz/design-system/illustration-name';

interface StoreArticleDTO {
	title: string;
	summary: string;
	slug: string;
	contentHtml: string;
	contentMarkdown: string;
	readingTime: number;
	categoryId: string;
}

interface UpdateArticleDTO {
	id: string;
	summary: string;
	title: string;
	contentHtml: string;
	contentMarkdown: string;
	readingTime: number;
	categoryId: string;
}

export class ArticleRepository {
	#scopeCategory: Category | null = null;

	async all() {
		const articleRecords = await db
			.selectFrom('articles')
			.select(['id', 'title', 'slug', 'published_at', 'reading_time'])
			.orderBy('published_at desc')
			.execute();

		return articleRecords.map((article) => {
			return Article.create({
				id: ArticleIdentifier.fromString(article.id),
				publishedAt: article.published_at ? DateTime.fromJSDate(article.published_at) : null,
				title: article.title,
				slug: article.slug,
				readingTime: article.reading_time,
				summary: null,
				content: null,
			});
		});
	}

	scopeCategory(category: Category | null) {
		this.#scopeCategory = category;

		return this;
	}

	async count() {
		const countQueryResult = await db
			.selectFrom('articles')
			.select((builder) => builder.fn.count('articles.id').as('count'))
			.where('published_at', 'is not', null)
			.where('published_at', '<=', new Date())
			.execute();

		return Number(countQueryResult[0].count);
	}

	async paginated(page: number, perPage: number) {
		const articleRecords = await db
			.selectFrom('articles')
			.select(['id', 'title', 'summary', 'slug', 'published_at', 'reading_time'])
			.orderBy('published_at', 'desc')
			.where('published_at', 'is not', null)
			.where('published_at', '<=', new Date())
			.$if(this.#scopeCategory !== null, (builder) => {
				const categoryId = this.#scopeCategory!.getIdentifier().toString();
				this.#scopeCategory = null;
				return builder.where('category_id', '=', categoryId);
			})
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
				readingTime: article.reading_time,
				content: null,
			});
		});
	}

	async findLastFourPublished() {
		const articleRecords = await db
			.selectFrom('articles')
			.select(['id', 'title', 'summary', 'slug', 'published_at', 'reading_time'])
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
				readingTime: article.reading_time,
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
				reading_time: payload.readingTime,
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
				reading_time: payload.readingTime,
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
				'articles.summary',
				'articles.content_html',
				'articles.published_at',
				'articles.reading_time',
				'categories.id as category_id',
				'categories.name as category_name',
				'categories.slug as category_slug',
				'categories.illustration_name as category_illustration_name',
			])
			.where('articles.slug', '=', slug)
			.executeTakeFirst();

		if (!articleRecord) {
			throw new RecordNotFoundException();
		}

		return Article.create({
			id: ArticleIdentifier.fromString(articleRecord.id),
			title: articleRecord.title,
			slug: articleRecord.slug,
			content: articleRecord.content_html,
			summary: articleRecord.summary,
			publishedAt: DateTime.fromJSDate(articleRecord.published_at!),
			readingTime: articleRecord.reading_time,
			category: Category.create({
				id: CategoryIdentifier.fromString(articleRecord.category_id!),
				name: articleRecord.category_name!,
				slug: articleRecord.category_slug!,
				illustrationName: articleRecord.category_illustration_name as IllustrationName,
			}),
		});
	}
}
