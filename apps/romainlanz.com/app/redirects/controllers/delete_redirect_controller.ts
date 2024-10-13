import { inject } from '@adonisjs/core';
import { RedirectRepository } from '#redirects/repositories/redirect_repository';
import type { HttpContext } from '@adonisjs/core/http';

@inject()
export default class DeleteRedirectController {
	constructor(private repository: RedirectRepository) {}

	async handle({ params, response }: HttpContext) {
		await this.repository.delete(params.id);

		return response.redirect().toRoute('admin.redirects.index');
	}
}
