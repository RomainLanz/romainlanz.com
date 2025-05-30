import { inject } from '@adonisjs/core';
import { ArticleRepository } from '#articles/repositories/article_repository';
import { ArticleListViewModel } from '#articles/view_models/article_list_view_model';
import { CategoryRepository } from '#taxonomies/repositories/category_repository';
import type { HttpContext } from '@adonisjs/core/http';

@inject()
export default class ListArticlesController {
	constructor(
		private articleRepository: ArticleRepository,
		private categoryRepository: CategoryRepository
	) {}

	async render({ request, inertia }: HttpContext) {
		const page = Number(request.input('page', 1));
		const categorySlug = request.input('category', null);

		const category = categorySlug ? await this.categoryRepository.findBySlug(categorySlug) : null;

		const [articles, categories, allArticlesCount] = await Promise.all([
			this.articleRepository.scopeCategory(category).paginated(page, 4),
			this.categoryRepository.countWithArticles(),
			this.articleRepository.count(),
		]);

		return inertia.render('articles/list', {
			activeCategory: categorySlug,
			activePage: page,
			allArticlesCount,
			vm: ArticleListViewModel.fromDomain(articles, categories).serialize(),
		});
	}
}
