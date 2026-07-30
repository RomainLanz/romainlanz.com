import { db } from '#core/services/db';

export interface PublishedArticlesFilters {
	categorySlug: string | null;
	tagSlug: string | null;
}

export class PublishedArticlesQueryBuilder {
	build(filters: PublishedArticlesFilters) {
		return db
			.selectFrom('articles')
			.leftJoin('categories', 'articles.category_id', 'categories.id')
			.where('articles.published_at', 'is not', null)
			.where('articles.published_at', '<=', new Date())
			.$if(filters.categorySlug !== null, (builder) => {
				return builder.where('categories.slug', '=', filters.categorySlug!);
			})
			.$if(filters.tagSlug !== null, (builder) => {
				return builder
					.innerJoin('tag_articles', 'articles.id', 'tag_articles.article_id')
					.innerJoin('tags', 'tag_articles.tag_id', 'tags.id')
					.where('tags.slug', '=', filters.tagSlug!);
			});
	}
}
