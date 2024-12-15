import vine from '@vinejs/vine';
import type { HttpContext } from '@adonisjs/core/http';

export default class StoreCategoryController {
	static validator = vine.compile(
		vine.object({
			name: vine.string().trim(),
			slug: vine.string().trim(),
		})
	);

	render({ inertia }: HttpContext) {
		return inertia.render('admin/taxonomies/categories/store');
	}

	async execute({ request }: HttpContext) {}
}
