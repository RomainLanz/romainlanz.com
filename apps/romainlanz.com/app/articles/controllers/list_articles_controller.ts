import { inject } from '@adonisjs/core';
import { ArticleRepository } from '#articles/repositories/article_repository';
import { ArticleListViewModel } from '#articles/view_models/article_list_view_model';
import { CategoryRepository } from '#categories/repositories/category_repository';
import type { HttpContext } from '@adonisjs/core/http';

@inject()
export default class ListArticlesController {
	constructor(
		private articleRepository: ArticleRepository,
		private categoryRepository: CategoryRepository
	) {}

	async render({ request, inertia }: HttpContext) {
		const page = request.input('page', 1);

		const [articles, categories, allArticlesCount] = await Promise.all([
			this.articleRepository.paginated(page, 4),
			this.categoryRepository.countWithArticles(),
			this.articleRepository.count(),
		]);

		return inertia.render('articles/list', {
			allArticlesCount,
			vm: ArticleListViewModel.fromDomain(articles, categories).serialize(),
		});
	}
}
