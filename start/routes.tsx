import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
import { Home } from '#views/pages/home'

// region Controller's Imports
const DeleteRedirectController = () => import('#redirects/controllers/delete_redirect_controller')
const GetPostsController = () => import('#blog/controllers/get_posts_controller')
const StorePostController = () => import('#blog/controllers/store_post_controller')
const GetRedirectsController = () => import('#redirects/controllers/get_redirects_controller')
const StoreRedirectController = () => import('#redirects/controllers/store_redirect_controller')
const ProcessRedirectController = () => import('#redirects/controllers/process_redirect_controller')
const UploadImageController = () => import('#media/controllers/upload_image_controller')
const LoginController = () => import('#auth/controllers/login_controller')
const LogoutController = () => import('#auth/controllers/logout_controller')
const PagesController = () => import('#pages/controllers/pages_controller')
const PastesController = () => import('#paste/controllers/pastes_controller')
// endregion

router.get('r/*', [ProcessRedirectController]).as('redirects.show')

router
  .group(() => {
    router.get('dashboard', [PagesController, 'dashboard']).as('pages.dashboard')
    router.get('blog/posts', [GetPostsController]).as('blog.posts.index')
    router.get('blog/posts/create', [StorePostController, 'render']).as('blog.posts.create')
    router.post('blog/posts', [StorePostController]).as('blog.posts.store')

    router.get('redirects', [GetRedirectsController]).as('redirects.index')
    router.get('redirects/create', [StoreRedirectController, 'render']).as('redirects.create')
    router.post('redirects', [StoreRedirectController]).as('redirects.store')
    router.delete('redirects/:id', [DeleteRedirectController]).as('redirects.delete')
  })
  .prefix('admin')
  .as('admin')
  .middleware([middleware.auth()])

router
  .group(() => {
    router.post('assets/images', [UploadImageController]).as('assets.store')
  })
  .prefix('api')
  .as('api')
  .middleware([middleware.auth()])

// router.get('/', async ({ view }) => view.render('pages/home')).as('pages.home')
router.get('/', () => <Home />).as('pages.home')

router.get('pastes/create', [PastesController, 'create']).as('pastes.create')
router.get('pastes/:id', [PastesController, 'show']).as('pastes.show')
router.post('pastes', [PastesController, 'store']).as('pastes.store')

router
  .group(() => {
    router.get('login', [LoginController, 'render']).as('auth.login')
    router.post('login', [LoginController])
  })
  .middleware(middleware.guest())

router.delete('logout', [LogoutController]).as('auth.logout')
