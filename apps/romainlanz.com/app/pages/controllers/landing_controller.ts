import { inject } from '@adonisjs/core';
import { ListLatestPublishedArticlesQuery } from '#articles/queries/list_latest_published_articles_query';
import LandingPageTransformer from '#pages/transformers/landing_page_transformer';
import type { HttpContext } from '@adonisjs/core/http';

@inject()
export default class LandingController {
	constructor(private listLatestPublishedArticles: ListLatestPublishedArticlesQuery) {}

	async render({ inertia }: HttpContext) {
		const articles = await this.listLatestPublishedArticles.execute(4);

		return inertia.render('landing', { vm: LandingPageTransformer.transform({ articles }) });
	}
}
