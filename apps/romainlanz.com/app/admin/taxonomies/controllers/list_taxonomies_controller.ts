import { inject } from '@adonisjs/core';
import AdminTaxonomyIndexTransformer from '#admin/taxonomies/transformers/admin_taxonomy_index_transformer';
import { ListCategoriesQuery } from '#taxonomies/queries/list_categories_query';
import { ListTagsQuery } from '#taxonomies/queries/list_tags_query';
import type { HttpContext } from '@adonisjs/core/http';

@inject()
export default class ListTaxonomiesController {
	constructor(
		private readonly listCategories: ListCategoriesQuery,
		private readonly listTags: ListTagsQuery,
	) {}

	async render({ inertia }: HttpContext) {
		const categories = await this.listCategories.execute();
		const tags = await this.listTags.execute();

		return inertia.render('admin/taxonomies/list', {
			vm: AdminTaxonomyIndexTransformer.transform({ categories, tags }),
		});
	}
}
