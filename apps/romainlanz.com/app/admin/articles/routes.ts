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
	},
} = controllers;

router
	.group(() => {
		router.get('og/preview', [PreviewOgImageController, 'execute']).as('og.preview');
		router.get('articles', [ListArticlesController, 'render']).as('articles.index');
		router.get('articles/create', [StoreArticleController, 'render']).as('articles.create');
		router.post('articles', [StoreArticleController, 'execute']).as('articles.store');
		router.get('articles/:id/edit', [UpdateArticleController, 'render']).as('articles.edit');
		router.put('articles/:id', [UpdateArticleController, 'execute']).as('articles.update');
	})
	.prefix('admin')
	.as('admin')
	.middleware([middleware.auth()]);
