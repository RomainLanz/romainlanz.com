import { inject } from '@adonisjs/core';
import { AllTaxonomiesViewModel } from '#admin/taxonomies/view_models/all_taxonomies_view_model';
import { ListCategoriesQuery } from '#taxonomies/queries/list_categories_query';
import type { HttpContext } from '@adonisjs/core/http';

@inject()
export default class ListTaxonomiesController {
	constructor(private readonly listCategories: ListCategoriesQuery) {}

	async render({ inertia }: HttpContext) {
		const categories = await this.listCategories.execute();

		return inertia.render('admin/taxonomies/list', {
			vm: AllTaxonomiesViewModel.fromDomain(categories).serialize(),
		});
	}
}
