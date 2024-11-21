import { inject } from '@adonisjs/core';
import vine from '@vinejs/vine';
import { NewsletterRegistration } from '#newsletter/services/newsletter_registration';
import type { HttpContext } from '@adonisjs/core/http';

@inject()
export default class RegisterEmailController {
	static validator = vine.compile(
		vine.object({
			email: vine.string().email().trim().maxLength(255).toLowerCase(),
		})
	);

	constructor(private service: NewsletterRegistration) {}

	render() {
		// return <Newsletter.Register />;
	}

	async execute({ request }: HttpContext) {
		const { email } = await request.validateUsing(RegisterEmailController.validator);

		this.service.execute(email);
	}
}
