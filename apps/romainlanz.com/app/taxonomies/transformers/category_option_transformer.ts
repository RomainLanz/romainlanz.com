import { BaseTransformer } from '@adonisjs/core/transformers';
import type { Category } from '#taxonomies/domain/category';

export default class CategoryOptionTransformer extends BaseTransformer<Category> {
	toObject() {
		return {
			id: this.resource.getIdentifier().toString(),
			name: this.resource.props.name,
			illustrationName: this.resource.props.illustrationName,
		};
	}
}
