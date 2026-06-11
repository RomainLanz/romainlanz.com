import { inject } from '@adonisjs/core';
import { ListAdminArticlesQuery } from '#admin/articles/queries/list_admin_articles_query';
import { AllArticleViewModel } from '#admin/articles/view_models/all_article_view_model';
import { TimeServiceContract } from '#core/contracts/time_service_contract';
import type { HttpContext } from '@adonisjs/core/http';

@inject()
export default class ListArticlesController {
	constructor(
		private readonly listAdminArticles: ListAdminArticlesQuery,
		private readonly timeService: TimeServiceContract,
	) {}

	async render({ inertia }: HttpContext) {
		const articles = await this.listAdminArticles.execute();

		return inertia.render('admin/articles/list', {
			vm: AllArticleViewModel.fromDomain(articles, this.timeService.now()).serialize(),
		});
	}
}
