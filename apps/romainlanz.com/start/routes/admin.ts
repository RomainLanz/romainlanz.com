import router from '@adonisjs/core/services/router';
import { controllers } from '#generated/controllers';
import { middleware } from '#start/kernel';

const {
	admin: {
		articles: {
			ListArticles: ListArticlesController,
			StoreArticle: StoreArticleController,
			UpdateArticle: UpdateArticleController,
		},
		pages: { Pages: PagesController },
		redirects: {
			DeleteRedirect: DeleteRedirectController,
			ListRedirects: ListRedirectsController,
			StoreRedirect: StoreRedirectController,
		},
		taxonomies: { ListTaxonomies: ListTaxonomiesController, StoreCategory: StoreCategoryController },
	},
	common: { ComputeOgImage: ComputeOgImageController },
} = controllers;

router
	.group(() => {
		router.get('dashboard', [PagesController, 'dashboard']).as('pages.dashboard');
		router.get('og/preview', [ComputeOgImageController, 'execute']).as('og.preview');
		router.get('articles', [ListArticlesController, 'render']).as('articles.index');
		router.get('articles/create', [StoreArticleController, 'render']).as('articles.create');
		router.post('articles', [StoreArticleController, 'execute']).as('articles.store');
		router.get('articles/:id/edit', [UpdateArticleController, 'render']).as('articles.edit');
		router.put('articles/:id', [UpdateArticleController, 'execute']).as('articles.update');

		router.get('redirects', [ListRedirectsController, 'render']).as('redirects.index');
		router.get('redirects/create', [StoreRedirectController, 'render']).as('redirects.create');
		router.post('redirects', [StoreRedirectController, 'execute']).as('redirects.store');
		router.delete('redirects/:id', [DeleteRedirectController, 'execute']).as('redirects.delete');

		router.get('taxonomies', [ListTaxonomiesController, 'render']).as('taxonomies.index');
		router.get('taxonomies/categories/create', [StoreCategoryController, 'render']).as('taxonomies.categories.create');
		router.post('taxonomies/categories', [StoreCategoryController, 'execute']).as('taxonomies.categories.store');
	})
	.prefix('admin')
	.as('admin')
	.middleware([middleware.auth()]);
