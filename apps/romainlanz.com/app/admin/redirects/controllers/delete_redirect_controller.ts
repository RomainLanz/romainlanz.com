import { inject } from '@adonisjs/core';
import { RedirectIdentifier } from '#redirects/domain/redirect_identifier';
import { RedirectRepository } from '#redirects/repositories/redirect_repository';
import type { HttpContext } from '@adonisjs/core/http';

@inject()
export default class DeleteRedirectController {
	constructor(private repository: RedirectRepository) {}

	async execute({ params, response }: HttpContext) {
		await this.repository.delete(RedirectIdentifier.fromString(params.id));

		return response.redirect().toRoute('admin.redirects.index');
	}
}
