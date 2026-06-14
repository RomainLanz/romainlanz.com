import { BaseTransformer } from '@adonisjs/core/transformers';
import type { Paste } from '#paste/domain/paste';

export default class PastePageTransformer extends BaseTransformer<Paste> {
	toObject() {
		return {
			paste: {
				id: this.resource.getIdentifier().toString(),
				content: this.resource.props.content,
			},
		};
	}
}
