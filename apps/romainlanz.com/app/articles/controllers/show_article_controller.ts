import { inject } from '@adonisjs/core';
import config from '@adonisjs/core/services/config';
import { urlFor } from '@adonisjs/core/services/url_builder';
import ArticlePageTransformer from '#app/articles/transformers/article_page_transformer';
import { RecordNotFoundException } from '#app/core/exceptions/record_not_found_exception';
import { GetArticleBySlugQuery } from '#articles/queries/get_article_by_slug_query';
import { TimeServiceContract } from '#core/contracts/time_service_contract';
import type { HttpContext } from '@adonisjs/core/http';

@inject()
export default class ShowArticleController {
	constructor(
		private readonly getArticleBySlug: GetArticleBySlugQuery,
		private readonly timeService: TimeServiceContract,
	) {}

	async render({ auth, params, inertia }: HttpContext) {
		const result = await this.getArticleBySlug.execute(params.slug);

		if (!result.ok) {
			const errorType = result.error.type;

			switch (errorType) {
				case 'article_not_found':
					throw new RecordNotFoundException();
				default: {
					const exhaustive: never = errorType;
					return exhaustive;
				}
			}
		}

		const article = result.value;

		if (!article.isPublished(this.timeService.now()) && !auth.user?.isAdmin) {
			throw new RecordNotFoundException();
		}

		const ogImagePath = urlFor('articles.og', { slug: article.props.slug });

		return inertia.render('articles/show', {
			vm: ArticlePageTransformer.transform(article),
			ogImageUrl: `${config.get('app.appUrl')}${ogImagePath}`,
		});
	}
}
