import { inject } from '@adonisjs/core';
import { ArticleRepository } from '#articles/repositories/article_repository';
import { ArticleView } from '#views/pages/articles/main';
import type { HttpContext } from '@adonisjs/core/http';

@inject()
export default class ShowArticleController {
	constructor(private repository: ArticleRepository) {}

	async render({ params }: HttpContext) {
		const article = await this.repository.findBySlug(params.slug);

		return <ArticleView.Show article={article} />;
	}
}
