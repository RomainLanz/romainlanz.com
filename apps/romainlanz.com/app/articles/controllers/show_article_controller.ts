import { inject } from '@adonisjs/core';
import config from '@adonisjs/core/services/config';
import { signedUrlFor } from '@adonisjs/core/services/url_builder';
import { GetArticleBySlugQuery } from '#articles/queries/get_article_by_slug_query';
import { ArticleViewModel } from '#articles/view_models/article_view_model';
import { TimeServiceContract } from '#core/contracts/time_service_contract';
import { RecordNotFoundException } from '#core/exceptions/record_not_found_exception';
import type { HttpContext } from '@adonisjs/core/http';

@inject()
export default class ShowArticleController {
	constructor(
		private readonly getArticleBySlug: GetArticleBySlugQuery,
		private readonly timeService: TimeServiceContract,
	) {}

	async render({ auth, params, inertia }: HttpContext) {
		const article = await this.getArticleBySlug.execute(params.slug);

		if (!article.isPublished(this.timeService.now()) && !auth.user?.isAdmin) {
			throw new RecordNotFoundException();
		}

		const ogImagePath = signedUrlFor('og.compute', undefined, {
			expiresIn: '24h',
			qs: { title: article.props.title, subtitle: article.props.summary },
		});

		return inertia.render('articles/show', {
			vm: ArticleViewModel.fromDomain(article).serialize(),
			ogImageUrl: `${config.get('app.appUrl')}${ogImagePath}`,
		});
	}
}
