import { inject } from '@adonisjs/core';
import { ListLatestPublishedArticlesQuery } from '#articles/queries/list_latest_published_articles_query';
import { LandingViewModel } from '#pages/view_models/landing_view_model';
import type { HttpContext } from '@adonisjs/core/http';

@inject()
export default class LandingController {
	constructor(private listLatestPublishedArticles: ListLatestPublishedArticlesQuery) {}

	async render({ inertia }: HttpContext) {
		const articles = await this.listLatestPublishedArticles.execute(4);

		return inertia.render('landing', { vm: LandingViewModel.fromDomain(articles).serialize() });
	}
}
