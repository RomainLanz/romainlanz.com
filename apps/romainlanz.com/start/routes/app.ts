import router from '@adonisjs/core/services/router';
import { controllers } from '#generated/controllers';
import { middleware } from '#start/kernel';

const {
	articles: {
		ListArticles: ListArticlesController,
		ShowArticle: ShowArticleController,
		ShowArticleOgImage: ShowArticleOgImageController,
	},
	auth: { Login: LoginController, Logout: LogoutController },
	pages: { About: AboutController, Contact: ContactController, Landing: LandingController },
} = controllers;

router.get('health', () => ({ uptime: Math.ceil(process.uptime()) }));

router.get('/', [LandingController, 'render']).as('pages.landing');
router.get('articles', [ListArticlesController, 'render']).as('articles.index');
router.get('articles/:slug/og.png', [ShowArticleOgImageController, 'render']).as('articles.og');
router.get('articles/:slug', [ShowArticleController, 'render']).as('articles.show');
router.get('contact', [ContactController, 'render']).as('pages.contact');
router.post('contact', [ContactController, 'execute']).as('pages.contact.store');
router.get('a-propos', [AboutController, 'render']).as('pages.about');
// router.get('newsletters/register', [RegisterEmailController, 'render']).as('newsletters.register');
// router.post('newsletters/register', [RegisterEmailController, 'execute']).as('newsletters.store');
// router.get('newsletters/:id/confirm', [ConfirmEmailController, 'execute']).as('newsletters.confirm');

router
	.group(() => {
		router.post('login', [LoginController, 'execute']).as('auth.login');
	})
	.middleware(middleware.guest());

router.delete('logout', [LogoutController]).as('auth.logout');
