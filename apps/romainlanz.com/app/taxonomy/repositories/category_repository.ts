import { db } from '#core/services/db';
import { Category } from '../domain/category';
import { CategoryIdentifier } from '../domain/category_identifier';
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

	async countWithArticles() {
		const categoryRecords = await db
			.selectFrom('categories')
			.leftJoin('articles', 'categories.id', 'articles.category_id')
			.groupBy('categories.id')
			.select(({ fn }) => [
				'categories.id',
				'categories.name',
				'categories.slug',
				'categories.illustration_name',
				fn.count('articles.id').as('articles_count'),
			])
			.where('published_at', 'is not', null)
			.where('published_at', '<=', new Date())
			.having(({ fn }) => fn.count('articles.id'), '>', 0)
			.orderBy('categories.name')
			.execute();

		return categoryRecords.map((categoryRecord) => {
			return Category.create({
				id: CategoryIdentifier.fromString(categoryRecord.id),
				name: categoryRecord.name,
				slug: categoryRecord.slug,
				illustrationName: categoryRecord.illustration_name,
				articleCount: Number(categoryRecord.articles_count),
			});
		});
	}

	async findBySlug(slug: string) {
		const categoryRecord = await db
			.selectFrom('categories')
			.select(['id', 'name', 'slug'])
			.where('slug', '=', slug)
			.executeTakeFirstOrThrow();

		return Category.create({
			id: CategoryIdentifier.fromString(categoryRecord.id),
			name: categoryRecord.name,
			slug: categoryRecord.slug,
		});
	}
}
