import { inject } from '@adonisjs/core';
import { ArticleRepository } from '#articles/repositories/article_repository';
import type { HttpContext } from '@adonisjs/core/http';

@inject()
export default class LandingController {
	constructor(private repository: ArticleRepository) {}

	async render({ inertia }: HttpContext) {
		const articles = await this.repository.findLastFourPublished();

		return inertia.render('landing', { articles });
	}
}
