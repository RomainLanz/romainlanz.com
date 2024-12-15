import { inject } from '@adonisjs/core';
import { AllTaxonomiesViewModel } from '#admin/taxonomies/view_models/all_taxonomies_view_model';
import { CategoryRepository } from '#taxonomies/repositories/category_repository';
import type { HttpContext } from '@adonisjs/core/http';

@inject()
export default class ListTaxonomiesController {
	constructor(private readonly categoryRepository: CategoryRepository) {}

	async render({ inertia }: HttpContext) {
		const categories = await this.categoryRepository.all();

		return inertia.render('admin/taxonomies/list', {
			vm: AllTaxonomiesViewModel.fromDomain(categories).serialize(),
		});
	}
}
