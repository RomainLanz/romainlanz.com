import router from '@adonisjs/core/services/router';
import { middleware } from '#start/kernel';

// region Controller's Imports
const DeleteRedirectController = () => import('#admin/redirects/controllers/delete_redirect_controller');
const ListArticlesController = () => import('#admin/articles/controllers/list_articles_controller');
const ListRedirectsController = () => import('#admin/redirects/controllers/list_redirects_controller');
const PagesController = () => import('#admin/pages/controllers/pages_controller');
const StoreArticleController = () => import('#admin/articles/controllers/store_article_controller');
const StoreRedirectController = () => import('#admin/redirects/controllers/store_redirect_controller');
const UpdateArticleController = () => import('#admin/articles/controllers/update_article_controller');
// endregion

router
	.group(() => {
		router.get('dashboard', [PagesController, 'dashboard']).as('pages.dashboard');
		router.get('articles', [ListArticlesController, 'render']).as('articles.index');
		router.get('articles/create', [StoreArticleController, 'render']).as('articles.create');
		router.post('articles', [StoreArticleController, 'execute']).as('articles.store');
		router.get('articles/:id/edit', [UpdateArticleController, 'render']).as('articles.edit');
		router.put('articles/:id', [UpdateArticleController, 'execute']).as('articles.update');

		router.get('redirects', [ListRedirectsController, 'render']).as('redirects.index');
		router.get('redirects/create', [StoreRedirectController, 'render']).as('redirects.create');
		router.post('redirects', [StoreRedirectController]).as('redirects.store');
		router.delete('redirects/:id', [DeleteRedirectController]).as('redirects.delete');
	})
	.prefix('admin')
	.as('admin')
	.middleware([middleware.auth()]);
