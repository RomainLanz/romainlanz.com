import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
import { Home } from '#views/pages/home'

// region Controller's Imports
const RedirectsController = () => import('#redirects/controllers/redirects_controller')
const AssetsController = () => import('../app/media/controllers/assets_controller.js')
const PagesController = () => import('#pages/controllers/pages_controller')
const PostsController = () => import('#blog/controllers/posts_controller')
const PastesController = () => import('#paste/controllers/pastes_controller')
const AuthController = () => import('#auth/controllers/auth_controller')
// endregion

router.get('r/:url', [RedirectsController, 'show']).as('redirects.show')

router
  .group(() => {
    router.get('dashboard', [PagesController, 'dashboard']).as('pages.dashboard')
    router.get('blog/posts/create', [PostsController, 'create']).as('blog.posts.create')
    router.post('blog/posts', [PostsController, 'store']).as('blog.posts.store')

    router.get('redirects', [RedirectsController, 'index']).as('redirects.index')
    router.get('redirects/create', [RedirectsController, 'create']).as('redirects.create')
    router.post('redirects', [RedirectsController, 'store']).as('redirects.store')
  })
  .prefix('admin')
  .as('admin')
  .middleware([middleware.auth()])

router
  .group(() => {
    router.post('assets', [AssetsController, 'store']).as('assets.store')
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
    router.get('login', [AuthController, 'showLoginForm']).as('auth.login')
    router.post('login', [AuthController, 'login'])
  })
  .middleware(middleware.guest())

router.delete('logout', [AuthController, 'logout']).as('auth.logout')
