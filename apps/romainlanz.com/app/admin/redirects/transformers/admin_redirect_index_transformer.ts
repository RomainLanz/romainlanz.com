import { BaseTransformer } from '@adonisjs/core/transformers';
import type { Redirect } from '#redirects/domain/redirect';

type AdminRedirectIndex = {
	redirects: Redirect[];
};

export default class AdminRedirectIndexTransformer extends BaseTransformer<AdminRedirectIndex> {
	toObject() {
		return {
			redirects: this.resource.redirects.map((redirect) => ({
				id: redirect.getIdentifier().toString(),
				slug: redirect.props.slug,
				destination: redirect.props.destination,
			})),
		};
	}
}
