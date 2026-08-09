import { err, ok, type Result } from '#core/result';
import { db } from '#shared/services/db';
import { Category } from '#taxonomies/domain/category';
import { CategoryIdentifier } from '#taxonomies/domain/category_identifier';

export type FindCategoryBySlugError = {
	type: 'category_not_found';
};

export class FindCategoryBySlugQuery {
	async execute(slug: string): Promise<Result<Category, FindCategoryBySlugError>> {
		const categoryRecord = await db
			.selectFrom('categories')
			.select(['id', 'name', 'slug'])
			.where('slug', '=', slug)
			.executeTakeFirst();

		if (!categoryRecord) {
			return err({ type: 'category_not_found' });
		}

		return ok(
			Category.create({
				id: CategoryIdentifier.fromString(categoryRecord.id),
				name: categoryRecord.name,
				slug: categoryRecord.slug,
			}),
		);
	}
}
