import { inject } from '@adonisjs/core';
import { ArticleRepository } from '#articles/repositories/article_repository';
import { ArticleViewModel } from '#articles/view_models/article_view_model';
import type { HttpContext } from '@adonisjs/core/http';

@inject()
export default class ShowArticleController {
	constructor(private repository: ArticleRepository) {}

	async render({ params, inertia }: HttpContext) {
		const article = await this.repository.findBySlug(params.slug);

		return inertia.render('articles/show', { vm: ArticleViewModel.fromDomain(article).serialize() });
	}
}
