import type { HttpContext } from '@adonisjs/core/http';

export default class PartnersController {
	render({ inertia }: HttpContext) {
		return inertia.render('partners', {});
	}
}
