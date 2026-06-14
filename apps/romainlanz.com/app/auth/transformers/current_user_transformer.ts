import { BaseTransformer } from '@adonisjs/core/transformers';
import type { User } from '#auth/domain/user';

export default class CurrentUserTransformer extends BaseTransformer<User> {
	toObject() {
		return {
			id: this.resource.getIdentifier().toString(),
			name: this.resource.props.name,
			avatarUrl: this.resource.props.avatarUrl || `https://unavatar.io/${this.resource.props.email}`,
			isAdmin: this.resource.props.isAdmin,
		};
	}
}
