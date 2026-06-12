import { inject } from '@adonisjs/core';
import { CountPublishedArticlesQuery } from '#articles/queries/count_published_articles_query';
import { ListPublishedArticlesQuery } from '#articles/queries/list_published_articles_query';
import { ArticleListViewModel } from '#articles/view_models/article_list_view_model';
import { FindCategoryBySlugQuery } from '#taxonomies/queries/find_category_by_slug_query';
import { FindTagBySlugQuery } from '#taxonomies/queries/find_tag_by_slug_query';
import { ListCategoriesWithPublishedArticlesQuery } from '#taxonomies/queries/list_categories_with_published_articles_query';
import type { HttpContext } from '@adonisjs/core/http';

@inject()
export default class ListArticlesController {
	constructor(
		private listPublishedArticles: ListPublishedArticlesQuery,
		private countPublishedArticles: CountPublishedArticlesQuery,
		private findCategoryBySlug: FindCategoryBySlugQuery,
		private findTagBySlug: FindTagBySlugQuery,
		private listCategoriesWithPublishedArticles: ListCategoriesWithPublishedArticlesQuery,
	) {}

	async render({ request, inertia }: HttpContext) {
		const page = Number(request.input('page', 1));
		const categorySlug = request.input('category', null);
		const tagSlug = request.input('tag', null);

		if (categorySlug) {
			await this.findCategoryBySlug.execute(categorySlug);
		}
		if (tagSlug) {
			await this.findTagBySlug.execute(tagSlug);
		}

		const paginationArticlesCountPromise = this.countPublishedArticles.execute({ categorySlug, tagSlug });
		const categoryListingAllArticlesCountPromise =
			categorySlug === null
				? paginationArticlesCountPromise
				: this.countPublishedArticles.execute({ categorySlug: null, tagSlug });

		const [articles, categories, categoryListingAllArticlesCount, paginationArticlesCount] = await Promise.all([
			this.listPublishedArticles.execute({ page, perPage: 4, categorySlug, tagSlug }),
			this.listCategoriesWithPublishedArticles.execute(),
			categoryListingAllArticlesCountPromise,
			paginationArticlesCountPromise,
		]);

		return inertia.render('articles/list', {
			activeCategory: categorySlug,
			activeTag: tagSlug,
			activePage: page,
			categoryListingAllArticlesCount,
			paginationArticlesCount,
			vm: ArticleListViewModel.fromDomain(articles, categories).serialize(),
		});
	}
}
