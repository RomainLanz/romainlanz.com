import router from '@adonisjs/core/services/router';
import { controllers } from '#generated/controllers';
import { middleware } from '#start/kernel';

const {
	admin: {
		articles: {
			ListArticles: ListArticlesController,
			PreviewOgImage: PreviewOgImageController,
			StoreArticle: StoreArticleController,
			UpdateArticle: UpdateArticleController,
		},
		pages: { Pages: PagesController },
		redirects: {
			DeleteRedirect: DeleteRedirectController,
			ListRedirects: ListRedirectsController,
			StoreRedirect: StoreRedirectController,
		},
		taxonomies: {
			ListTaxonomies: ListTaxonomiesController,
			StoreCategory: StoreCategoryController,
			StoreTag: StoreTagController,
		},
	},
} = controllers;

router
	.group(() => {
		router.get('dashboard', [PagesController, 'dashboard']).as('pages.dashboard');
		router.get('og/preview', [PreviewOgImageController, 'execute']).as('og.preview');
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
		router.get('taxonomies/tags/create', [StoreTagController, 'render']).as('taxonomies.tags.create');
		router.post('taxonomies/tags', [StoreTagController, 'execute']).as('taxonomies.tags.store');
	})
	.prefix('admin')
	.as('admin')
	.middleware([middleware.auth()]);
