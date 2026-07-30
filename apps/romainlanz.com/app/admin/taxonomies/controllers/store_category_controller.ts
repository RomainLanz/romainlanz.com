import vine from '@vinejs/vine';
import { TaxonomyPolicy } from '#admin/taxonomies/policies/taxonomy_policy';
import type { HttpContext } from '@adonisjs/core/http';

export default class StoreCategoryController {
	static validator = vine.compile(
		vine.object({
			name: vine.string().trim(),
			slug: vine.string().trim(),
		}),
	);

	async render({ bouncer, inertia }: HttpContext) {
		await bouncer.with(TaxonomyPolicy).authorize('manage');

		return inertia.render('admin/taxonomies/categories/create', {});
	}

	async execute({ bouncer }: HttpContext) {
		await bouncer.with(TaxonomyPolicy).authorize('manage');
	}
}
