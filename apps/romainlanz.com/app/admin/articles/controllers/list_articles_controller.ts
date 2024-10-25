import { inject } from '@adonisjs/core';
import { AllArticleViewModel } from '#admin/articles/view_models/all_article_view_model';
import { ArticleRepository } from '#articles/repositories/article_repository';
import type { HttpContext } from '@adonisjs/core/http';

@inject()
export default class ListArticlesController {
	constructor(private repository: ArticleRepository) {}

	async render({ inertia }: HttpContext) {
		const articles = await this.repository.all();

		return inertia.render('admin/articles/list', { vm: AllArticleViewModel.fromDomain(articles).serialize() });
	}
}
