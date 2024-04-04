import { inject } from '@adonisjs/core'
import { PostRepository } from '#blog/repositories/post_repository'
import { BlogView } from '#views/pages/blog/blog'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class ShowPostController {
  constructor(private repository: PostRepository) {}

  async render({ params }: HttpContext) {
    const post = await this.repository.findBySlug(params.slug)

    return <BlogView.Show post={post} />
  }
}
