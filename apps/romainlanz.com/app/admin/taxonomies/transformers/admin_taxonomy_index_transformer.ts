import { BaseTransformer } from '@adonisjs/core/transformers';
import type { Category } from '#taxonomies/domain/category';
import type { Tag } from '#taxonomies/domain/tag';

type AdminTaxonomyIndex = {
	categories: Category[];
	tags: Tag[];
};

export default class AdminTaxonomyIndexTransformer extends BaseTransformer<AdminTaxonomyIndex> {
	toObject() {
		return {
			categories: this.resource.categories.map((category) => ({
				id: category.getIdentifier().toString(),
				name: category.props.name,
				illustrationName: category.props.illustrationName,
			})),
			tags: this.resource.tags.map((tag) => ({
				id: tag.getIdentifier().toString(),
				name: tag.props.name,
				slug: tag.props.slug,
				color: tag.props.color,
			})),
		};
	}
}
