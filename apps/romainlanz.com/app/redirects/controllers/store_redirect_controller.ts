import { inject } from '@adonisjs/core';
import vine from '@vinejs/vine';
import { RedirectRepository } from '#redirects/repositories/redirect_repository';
import type { HttpContext } from '@adonisjs/core/http';
import type { Infer } from '@vinejs/vine/types';

export type StoreRedirectPayload = Infer<typeof StoreRedirectController.validator>;

@inject()
export default class StoreRedirectController {
	static validator = vine.compile(
		vine.object({
			url: vine.string().maxLength(150),
			to: vine.string().maxLength(150),
		})
	);

	constructor(private repository: RedirectRepository) {}

	render() {
		// return <RedirectView.Create />;
	}

	async handle({ request, response }: HttpContext) {
		const payload = await request.validateUsing(StoreRedirectController.validator);

		await this.repository.create(payload);

		return response.redirect().toRoute('admin.redirects.index');
	}
}
