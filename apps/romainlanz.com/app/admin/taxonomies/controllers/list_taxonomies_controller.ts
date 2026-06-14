import { inject } from '@adonisjs/core';
import AdminTaxonomyIndexTransformer from '#admin/taxonomies/transformers/admin_taxonomy_index_transformer';
import { ListCategoriesQuery } from '#taxonomies/queries/list_categories_query';
import type { HttpContext } from '@adonisjs/core/http';

@inject()
export default class ListTaxonomiesController {
	constructor(private readonly listCategories: ListCategoriesQuery) {}

	async render({ inertia }: HttpContext) {
		const categories = await this.listCategories.execute();

		return inertia.render('admin/taxonomies/list', {
			vm: AdminTaxonomyIndexTransformer.transform({ categories }),
		});
	}
}
