import { db } from '#core/services/db';
import type { ResultOf } from '#types/common';

export type CategoryListQueryResult = ResultOf<CategoryRepository, 'all'>;
export type CategoryCountWithArticlesQueryResult = ResultOf<CategoryRepository, 'countWithArticles'>;

export class CategoryRepository {
	all() {
		return db.selectFrom('categories').select(['id', 'name', 'slug']).orderBy('name').execute();
	}

	countWithArticles() {
		return db
			.selectFrom('categories')
			.leftJoin('articles', 'categories.id', 'articles.category_id')
			.groupBy('categories.id')
			.select(({ fn }) => [
				'categories.id',
				'categories.name',
				'categories.slug',
				fn.count('articles.id').as('articles_count'),
			])
			.having(({ fn }) => fn.count('articles.id'), '>', 0)
			.orderBy('categories.name')
			.execute();
	}
}
