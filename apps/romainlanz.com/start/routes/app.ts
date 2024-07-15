import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

// region Controller's Imports
const ConfirmEmailController = () => import('#newsletter/controllers/confirm_email_controller')
const LandingController = () => import('#pages/controllers/landing_controller')
const ListArticlesController = () => import('#articles/controllers/list_articles_controller')
const LoginController = () => import('#auth/controllers/login_controller')
const LogoutController = () => import('#auth/controllers/logout_controller')
const RegisterEmailController = () => import('#newsletter/controllers/register_email_controller')
const ShowArticleController = () => import('#articles/controllers/show_article_controller')
// endregion

router.get('/', [LandingController, 'render']).as('pages.landing')
router.get('articles', [ListArticlesController, 'render']).as('pages.articles')
router.get('articles/:slug', [ShowArticleController, 'render']).as('articles.show')
router.get('newsletters/register', [RegisterEmailController, 'render']).as('newsletters.register')
router.post('newsletters/register', [RegisterEmailController, 'execute']).as('newsletters.store')
router.get('newsletters/:id/confirm', [ConfirmEmailController, 'execute']).as('newsletters.confirm')

router
  .group(() => {
    router.get('login', [LoginController, 'render']).as('auth.login')
    router.post('login', [LoginController])
  })
  .middleware(middleware.guest())

router.delete('logout', [LogoutController]).as('auth.logout')
