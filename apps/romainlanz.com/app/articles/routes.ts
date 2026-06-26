import router from '@adonisjs/core/services/router';
import { controllers } from '#generated/controllers';

const {
	articles: {
		ListArticles: ListArticlesController,
		ShowArticle: ShowArticleController,
		ShowArticleOgImage: ShowArticleOgImageController,
	},
} = controllers;

router.get('articles', [ListArticlesController, 'render']).as('articles.index');
router.get('articles/:slug/og.png', [ShowArticleOgImageController, 'render']).as('articles.og');
router.get('articles/:slug', [ShowArticleController, 'render']).as('articles.show');
