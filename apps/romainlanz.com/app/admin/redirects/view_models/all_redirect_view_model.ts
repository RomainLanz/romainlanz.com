import type { Redirect } from '#redirects/domain/redirect';

export type AllRedirectViewModelSerialized = ReturnType<AllRedirectViewModel['serialize']>;

export class AllRedirectViewModel {
	constructor(private readonly redirects: Redirect[]) {}

	static fromDomain(redirects: Redirect[]) {
		return new this(redirects);
	}

	serialize() {
		return {
			redirects: this.redirects.map((redirect) => ({
				id: redirect.getIdentifier().toString(),
				slug: redirect.props.slug,
				destination: redirect.props.destination,
			})),
		};
	}
}
