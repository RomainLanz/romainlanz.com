import { db } from '#core/services/db';
import type { ResultOf } from '#types/common';

interface StoreArticleDTO {
	title: string;
	description: string;
	slug: string;
	markdownContent: string;
	markdownAst: any;
	canonicalUrl: string;
	categoryId: string;
}

interface UpdateArticleDTO {
	id: string;
	description: string;
	title: string;
	markdownContent: string;
	markdownAst: any;
	canonicalUrl: string;
	categoryId: string;
}

export type ArticleListQueryResult = ResultOf<ArticleRepository, 'all'>;
export type ArticleLastFourPublishedQueryResult = ResultOf<ArticleRepository, 'findLastFourPublished'>;
export type ArticlePaginatedQueryResult = ResultOf<ArticleRepository, 'paginated'>;
export type ArticleQueryResult = ResultOf<ArticleRepository, 'findBySlug'>;
export type ArticleByIdQueryResult = ResultOf<ArticleRepository, 'findById'>;

export class ArticleRepository {
	all() {
		return db.selectFrom('articles').select(['id', 'title', 'slug', 'published_at']).execute();
	}

	paginated(page: number, perPage: number) {
		return db
			.selectFrom('articles')
			.select(['title', 'description', 'slug', 'published_at'])
			.orderBy('published_at', 'desc')
			.where('published_at', 'is not', null)
			.where('published_at', '<=', new Date())
			.offset((page - 1) * perPage)
			.limit(perPage)
			.execute();
	}

	findLastFourPublished() {
		return db
			.selectFrom('articles')
			.select(['title', 'description', 'slug', 'published_at'])
			.orderBy('published_at', 'desc')
			.where('published_at', 'is not', null)
			.where('published_at', '<=', new Date())
			.limit(4)
			.execute();
	}

	create(payload: StoreArticleDTO) {
		return db
			.insertInto('articles')
			.values({
				created_at: new Date(),
				updated_at: new Date(),
				title: payload.title,
				slug: payload.slug,
				description: payload.description,
				markdown_ast: payload.markdownAst,
				markdown_content: payload.markdownContent,
				canonical_url: payload.canonicalUrl,
				category_id: payload.categoryId,
			})
			.execute();
	}

	update(payload: UpdateArticleDTO) {
		return db
			.updateTable('articles')
			.set({
				title: payload.title,
				description: payload.description,
				markdown_ast: payload.markdownAst,
				markdown_content: payload.markdownContent,
				canonical_url: payload.canonicalUrl,
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
