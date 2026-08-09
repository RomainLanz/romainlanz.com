import { inject } from '@adonisjs/core';
import { RecordNotFoundException } from '#app/core/exceptions/record_not_found_exception';
import { GetArticleBySlugQuery } from '#articles/queries/get_article_by_slug_query';
import { TimeServiceContract } from '#core/contracts/time_service_contract';
import { OgImageGeneratorService } from '#shared/services/og_image_generator_service';
import type { HttpContext } from '@adonisjs/core/http';

@inject()
export default class ShowArticleOgImageController {
	constructor(
		private readonly getArticleBySlug: GetArticleBySlugQuery,
		private readonly ogImageGeneratorService: OgImageGeneratorService,
		private readonly timeService: TimeServiceContract,
	) {}

	async render({ auth, params, response }: HttpContext) {
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

		const image = await this.ogImageGeneratorService.generate(article.props.title, article.props.summary ?? '');

		return response
			.header('Content-Type', 'image/png')
			.header('Cache-Control', 'public, max-age=3600, stale-while-revalidate=86400')
			.stream(image);
	}
}
