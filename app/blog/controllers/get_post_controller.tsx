import { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import { PostRepository } from '#blog/repositories/post_repository'
import { BlogView } from '#views/pages/blog/blog'

@inject()
export default class GetPostController {
  constructor(private repository: PostRepository) {}

  async handle({ params }: HttpContext) {
    const post = await this.repository.findBySlug(params.slug)

    return <BlogView.Show post={post} />
  }
}
