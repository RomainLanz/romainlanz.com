import { inject } from '@adonisjs/core'
import { PostRepository } from '#blog/repositories/post_repository'
import { BlogView } from '#views/pages/blog/blog'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class ListPostsController {
  constructor(private repository: PostRepository) {}

  async render({ request }: HttpContext) {
    const page = request.input('page', 1)
    const posts = await this.repository.paginated(page, 4)

    return <BlogView.List posts={posts} />
  }
}
