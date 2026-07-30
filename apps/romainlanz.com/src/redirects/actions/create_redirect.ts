import { inject } from '@adonisjs/core';
import { Redirect } from '#redirects/domain/redirect';
import { RedirectIdentifier } from '#redirects/domain/redirect_identifier';
import { RedirectRepository } from '#redirects/repositories/redirect_repository';

interface CreateRedirectInput {
	destination: string;
	slug: string;
}

@inject()
export class CreateRedirect {
	constructor(private repository: RedirectRepository) {}

	execute(input: CreateRedirectInput) {
		const redirect = Redirect.create({
			id: RedirectIdentifier.generate(),
			destination: input.destination,
			slug: input.slug,
		});

		return this.repository.create(redirect);
	}
}
