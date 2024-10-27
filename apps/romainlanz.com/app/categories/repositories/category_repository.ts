import { Category } from '#categories/domain/category';
import { CategoryIdentifier } from '#categories/domain/category_identifier';
import { db } from '#core/services/db';
import type { ResultOf } from '#types/common';

export type CategoryListQueryResult = ResultOf<CategoryRepository, 'all'>;
export type CategoryCountWithArticlesQueryResult = ResultOf<CategoryRepository, 'countWithArticles'>;

export class CategoryRepository {
	async all() {
		const categoryRecords = await db
			.selectFrom('categories')
			.select(['id', 'name', 'slug', 'illustration_name'])
			.orderBy('name')
			.execute();

		return categoryRecords.map((categoryRecord) => {
			return Category.create({
				id: CategoryIdentifier.fromString(categoryRecord.id),
				name: categoryRecord.name,
				slug: categoryRecord.slug,
				illustrationName: categoryRecord.illustration_name,
			});
		});
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
