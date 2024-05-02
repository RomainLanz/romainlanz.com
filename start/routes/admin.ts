import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

// region Controller's Imports
const DeleteRedirectController = () => import('#redirects/controllers/delete_redirect_controller')
const GetRedirectsController = () => import('#redirects/controllers/get_redirects_controller')
const ListPostsController = () => import('#admin/articles/controllers/list_articles_controller')
const PagesController = () => import('#pages/controllers/pages_controller')
const StorePostController = () => import('#admin/articles/controllers/store_article_controller')
const StoreRedirectController = () => import('#redirects/controllers/store_redirect_controller')
const UpdatePostController = () => import('#admin/articles/controllers/update_article_controller')
// endregion

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
