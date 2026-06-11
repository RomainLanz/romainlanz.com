import { db } from '#core/services/db';
import { Category } from '#taxonomies/domain/category';
import { CategoryIdentifier } from '#taxonomies/domain/category_identifier';

export class FindCategoryBySlugQuery {
	async execute(slug: string) {
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
