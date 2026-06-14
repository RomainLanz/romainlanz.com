import { inject } from '@adonisjs/core';
import AdminRedirectIndexTransformer from '#admin/redirects/transformers/admin_redirect_index_transformer';
import { RedirectRepository } from '#redirects/repositories/redirect_repository';
import type { HttpContext } from '@adonisjs/core/http';

@inject()
export default class ListRedirectsController {
	constructor(private repository: RedirectRepository) {}

	async render({ inertia }: HttpContext) {
		const redirects = await this.repository.all();

		return inertia.render('admin/redirects/list', {
			vm: AdminRedirectIndexTransformer.transform({ redirects }),
		});
	}
}
