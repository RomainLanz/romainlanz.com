import { inject } from '@adonisjs/core';
import vine from '@vinejs/vine';
import { Redirect } from '#redirects/domain/redirect';
import { RedirectIdentifier } from '#redirects/domain/redirect_identifier';
import { RedirectRepository } from '#redirects/repositories/redirect_repository';
import type { HttpContext } from '@adonisjs/core/http';

@inject()
export default class StoreRedirectController {
	static validator = vine.compile(
		vine.object({
			destination: vine.string().maxLength(150),
			slug: vine.string().maxLength(150),
		})
	);

	constructor(private repository: RedirectRepository) {}

	render({ inertia }: HttpContext) {
		return inertia.render('admin/redirects/create');
	}

	async execute({ request, response }: HttpContext) {
		const payload = await request.validateUsing(StoreRedirectController.validator);

		const redirect = Redirect.create({
			id: RedirectIdentifier.generate(),
			destination: payload.destination,
			slug: payload.slug,
		});

		await this.repository.create(redirect);

		return response.redirect().toRoute('admin.redirects.index');
	}
}
