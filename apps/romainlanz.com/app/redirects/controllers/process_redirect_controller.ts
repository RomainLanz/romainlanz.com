import { inject } from '@adonisjs/core';
import { RedirectRepository } from '#redirects/repositories/redirect_repository';
import type { HttpContext } from '@adonisjs/core/http';

@inject()
export default class ProcessRedirectController {
	constructor(private repository: RedirectRepository) {}

	async execute({ params, response }: HttpContext) {
		const redirect = await this.repository.findByUrl(params['*']);

		if (!redirect) {
			return response.status(404).send('Not found');
		}

		await this.repository.increaseVisitCount(redirect.id);

		return response.redirect(redirect.to);
	}
}
