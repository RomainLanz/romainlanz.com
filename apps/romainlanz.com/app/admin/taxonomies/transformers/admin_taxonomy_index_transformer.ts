import { BaseTransformer } from '@adonisjs/core/transformers';
import type { Category } from '#taxonomies/domain/category';

type AdminTaxonomyIndex = {
	categories: Category[];
};

export default class AdminTaxonomyIndexTransformer extends BaseTransformer<AdminTaxonomyIndex> {
	toObject() {
		return {
			categories: this.resource.categories.map((category) => ({
				id: category.getIdentifier().toString(),
				name: category.props.name,
				illustrationName: category.props.illustrationName,
			})),
		};
	}
}
