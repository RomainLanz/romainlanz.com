import type { User } from '#auth/domain/user';

export type CurrentUserViewModelSerialized = ReturnType<CurrentUserViewModel['serialize']>;

export class CurrentUserViewModel {
	constructor(private user?: User) {}

	static fromDomain(user?: User) {
		return new this(user);
	}

	serialize() {
		if (!this.user) {
			return null;
		}

		return {
			id: this.user.getIdentifier().toString(),
			name: this.user.props.name,
			avatarUrl: this.user.props.avatarUrl || `https://unavatar.io/${this.user.props.email}`,
			isAdmin: this.user.props.isAdmin,
		};
	}
}
