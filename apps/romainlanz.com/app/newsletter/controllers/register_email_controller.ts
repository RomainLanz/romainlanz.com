import { inject } from '@adonisjs/core';
import vine from '@vinejs/vine';
import { BrevoService } from '#newsletter/services/brevo_service';
import type { HttpContext } from '@adonisjs/core/http';

@inject()
export default class RegisterEmailController {
	static validator = vine.compile(
		vine.object({
			email: vine.string().email().trim().maxLength(255).toLowerCase(),
		})
	);

	constructor(private readonly brevoService: BrevoService) {}

	async execute({ request, response }: HttpContext) {
		const { email } = await request.validateUsing(RegisterEmailController.validator);

		await this.brevoService.sendDoubleOptInConfirmation(email);

		return response.redirect().back();
	}
}
