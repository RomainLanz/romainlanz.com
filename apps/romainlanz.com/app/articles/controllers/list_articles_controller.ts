import { inject } from '@adonisjs/core';
import { ArticleRepository } from '#articles/repositories/article_repository';
import { ArticleListViewModel } from '#articles/view_models/article_list_view_model';
import { CategoryRepository } from '#categories/repositories/category_repository';
import type { HttpContext } from '@adonisjs/core/http';

@inject()
export default class ListArticlesController {
	constructor(
		private repository: ArticleRepository,
		private categoryRepository: CategoryRepository
	) {}

	async render({ request, inertia }: HttpContext) {
		const page = request.input('page', 1);

		const [articles, categories] = await Promise.all([
			this.repository.paginated(page, 4),
			this.categoryRepository.countWithArticles(),
		]);

		return inertia.render('articles/list', { vm: ArticleListViewModel.fromDomain(articles, categories).serialize() });
	}
}
