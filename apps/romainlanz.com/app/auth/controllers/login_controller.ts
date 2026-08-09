import { inject } from '@adonisjs/core';
import { AuthService } from '#identity/services/auth_service';
import type { HttpContext } from '@adonisjs/core/http';

@inject()
export default class LoginController {
	constructor(private authService: AuthService) {}

	async execute({ auth, request, response, session }: HttpContext) {
		const { email, password } = request.all();

		const result = await this.authService.attempt(email, password);

		if (!result.ok) {
			const errorType = result.error.type;

			switch (errorType) {
				case 'invalid_credentials':
					session.flashErrors({
						E_INVALID_CREDENTIALS: "Aucun compte n'a été trouvé avec les identifiants fournis.",
					});
					break;
				default: {
					const exhaustive: never = errorType;
					return exhaustive;
				}
			}

			return response.redirect().back();
		}

		await auth.use('web').login(result.value);

		return response.redirect().toPath('/');
	}
}
