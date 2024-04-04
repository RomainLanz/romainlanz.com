import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

// region Controller's Imports
const hmr = import.meta.hot?.boundary
const GetLiveStatusController = () => import('#twitch/controllers/get_live_status_controller', hmr)
const DeleteRedirectController = () =>
  import('#redirects/controllers/delete_redirect_controller', hmr)
const GetRedirectsController = () => import('#redirects/controllers/get_redirects_controller', hmr)
const ListPostsController = () => import('#blog/controllers/list_posts_controller', hmr)
const LoginController = () => import('#auth/controllers/login_controller', hmr)
const LogoutController = () => import('#auth/controllers/logout_controller', hmr)
const PagesController = () => import('#pages/controllers/pages_controller', hmr)
const ProcessRedirectController = () =>
  import('#redirects/controllers/process_redirect_controller', hmr)
const ShowPostController = () => import('#blog/controllers/show_post_controller', hmr)
const StorePostController = () => import('#blog/controllers/store_post_controller', hmr)
const StoreRedirectController = () =>
  import('#redirects/controllers/store_redirect_controller', hmr)
const UpdatePostController = () => import('#blog/controllers/update_post_controller', hmr)
const UploadImageController = () => import('#media/controllers/upload_image_controller', hmr)
// endregion

router.get('r/*', [ProcessRedirectController]).as('redirects.show')
router.get('/live/status', [GetLiveStatusController, 'render']).as('live.status')

router
  .group(() => {
    router.get('dashboard', [PagesController, 'dashboard']).as('pages.dashboard')
    router.get('blog/posts', [ListPostsController, 'render']).as('blog.posts.index')
    router.get('blog/posts/create', [StorePostController, 'render']).as('blog.posts.create')
    router.post('blog/posts', [StorePostController, 'execute']).as('blog.posts.store')
    router.get('blog/posts/:id/edit', [UpdatePostController, 'render']).as('blog.posts.edit')
    router.put('blog/posts/:id', [UpdatePostController, 'execute']).as('blog.posts.update')

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

router
  .get('/', async () => {
    const { Landing } = await import('#views/pages/landing', hmr)

    return <Landing />
  })
  .as('pages.landing')

router.get('/blog/:slug', [ShowPostController, 'render']).as('blog.posts.show')

// router.get('pastes/create', [PastesController, 'create']).as('pastes.create')
// router.get('pastes/:id', [PastesController, 'show']).as('pastes.show')
// router.post('pastes', [PastesController, 'store']).as('pastes.store')

router
  .group(() => {
    router.get('login', [LoginController, 'render']).as('auth.login')
    router.post('login', [LoginController])
  })
  .middleware(middleware.guest())

router.delete('logout', [LogoutController]).as('auth.logout')
