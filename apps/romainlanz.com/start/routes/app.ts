import router from '@adonisjs/core/services/router';
import { middleware } from '#start/kernel';

// region Controller's Imports
const AboutController = () => import('#pages/controllers/about_controller');
const ComputeOgImageControllers = () => import('#common/controllers/compute_og_image_controllers');
// const ConfirmEmailController = () => import('#newsletter/controllers/confirm_email_controller');
const ContactController = () => import('#pages/controllers/contact_controller');
const LandingController = () => import('#pages/controllers/landing_controller');
const ListArticlesController = () => import('#articles/controllers/list_articles_controller');
const LoginController = () => import('#auth/controllers/login_controller');
const LogoutController = () => import('#auth/controllers/logout_controller');
// const RegisterEmailController = () => import('#newsletter/controllers/register_email_controller');
const ShowArticleController = () => import('#articles/controllers/show_article_controller');
// endregion

router.get('og/compute', [ComputeOgImageControllers, 'execute']).as('og.compute');

router.get('/', [LandingController, 'render']).as('pages.landing');
router.get('articles', [ListArticlesController, 'render']).as('articles.index');
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
