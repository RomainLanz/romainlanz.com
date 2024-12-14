import { inject } from '@adonisjs/core';
import { AllArticleViewModel } from '#admin/articles/view_models/all_article_view_model';
import { ArticleRepository } from '#articles/repositories/article_repository';
import { TimeServiceContract } from '#core/contracts/time_service_contract';
import type { HttpContext } from '@adonisjs/core/http';

@inject()
export default class ListArticlesController {
	constructor(
		private readonly repository: ArticleRepository,
		private readonly timeService: TimeServiceContract
	) {}

	async render({ inertia }: HttpContext) {
		const articles = await this.repository.all();

		return inertia.render('admin/articles/list', {
			vm: AllArticleViewModel.fromDomain(articles, this.timeService.now()).serialize(),
		});
	}
}
