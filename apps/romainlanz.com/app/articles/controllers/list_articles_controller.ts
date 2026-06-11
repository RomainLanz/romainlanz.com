import { inject } from '@adonisjs/core';
import { CountPublishedArticlesQuery } from '#articles/queries/count_published_articles_query';
import { ListPublishedArticlesQuery } from '#articles/queries/list_published_articles_query';
import { ArticleListViewModel } from '#articles/view_models/article_list_view_model';
import { FindCategoryBySlugQuery } from '#taxonomies/queries/find_category_by_slug_query';
import { ListCategoriesWithPublishedArticlesQuery } from '#taxonomies/queries/list_categories_with_published_articles_query';
import type { HttpContext } from '@adonisjs/core/http';

@inject()
export default class ListArticlesController {
	constructor(
		private listPublishedArticles: ListPublishedArticlesQuery,
		private countPublishedArticles: CountPublishedArticlesQuery,
		private findCategoryBySlug: FindCategoryBySlugQuery,
		private listCategoriesWithPublishedArticles: ListCategoriesWithPublishedArticlesQuery,
	) {}

	async render({ request, inertia }: HttpContext) {
		const page = Number(request.input('page', 1));
		const categorySlug = request.input('category', null);

		if (categorySlug) {
			await this.findCategoryBySlug.execute(categorySlug);
		}

		const [articles, categories, allArticlesCount] = await Promise.all([
			this.listPublishedArticles.execute({ page, perPage: 4, categorySlug }),
			this.listCategoriesWithPublishedArticles.execute(),
			this.countPublishedArticles.execute(),
		]);

		return inertia.render('articles/list', {
			activeCategory: categorySlug,
			activePage: page,
			allArticlesCount,
			vm: ArticleListViewModel.fromDomain(articles, categories).serialize(),
		});
	}
}
