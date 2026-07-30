import { inject } from '@adonisjs/core';
import vine from '@vinejs/vine';
import { CreateRedirect } from '#redirects/actions/create_redirect';
import type { HttpContext } from '@adonisjs/core/http';

@inject()
export default class StoreRedirectController {
	static validator = vine.compile(
		vine.object({
			destination: vine.string().maxLength(150),
			slug: vine.string().maxLength(150),
		}),
	);

	constructor(private createRedirect: CreateRedirect) {}

	render({ inertia }: HttpContext) {
		return inertia.render('admin/redirects/create', {});
	}

	async execute({ request, response }: HttpContext) {
		const payload = await request.validateUsing(StoreRedirectController.validator);

		await this.createRedirect.execute({
			destination: payload.destination,
			slug: payload.slug,
		});

		return response.redirect().toRoute('admin.redirects.index');
	}
}
