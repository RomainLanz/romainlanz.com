import { BaseTransformer } from '@adonisjs/core/transformers';
import type { Tag } from '#taxonomies/domain/tag';

export default class TagOptionTransformer extends BaseTransformer<Tag> {
	toObject() {
		return {
			id: this.resource.getIdentifier().toString(),
			name: this.resource.props.name,
		};
	}
}
