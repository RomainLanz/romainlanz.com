import { db } from '#core/services/db';
import { Category } from '#taxonomies/domain/category';
import { CategoryIdentifier } from '#taxonomies/domain/category_identifier';
import type { IllustrationName } from '@rlanz/design-system/illustration-name';

export class ListCategoriesQuery {
	async execute() {
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
				illustrationName: categoryRecord.illustration_name as IllustrationName,
			});
		});
	}
}
