import type { HttpContext } from '@adonisjs/core/http';

export default class ContactController {
	render({ inertia }: HttpContext) {
		return inertia.render('contact');
	}

	async execute({}: HttpContext) {}
}
