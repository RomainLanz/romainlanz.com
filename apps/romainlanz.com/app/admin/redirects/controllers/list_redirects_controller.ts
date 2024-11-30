import { inject } from '@adonisjs/core';
import { AllRedirectViewModel } from '#admin/redirects/view_models/all_redirect_view_model';
import { RedirectRepository } from '#redirects/repositories/redirect_repository';
import type { HttpContext } from '@adonisjs/core/http';

@inject()
export default class ListRedirectsController {
	constructor(private repository: RedirectRepository) {}

	async render({ inertia }: HttpContext) {
		const redirects = await this.repository.all();

		return inertia.render('admin/redirects/list', { vm: AllRedirectViewModel.fromDomain(redirects).serialize() });
	}
}
