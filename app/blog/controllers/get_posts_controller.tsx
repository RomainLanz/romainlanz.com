import { inject } from '@adonisjs/core'
import { PostRepository } from '#blog/repositories/post_repository'
import { Index } from '#views/pages/admin/blog/posts/index'

@inject()
export default class GetPostsController {
  constructor(private repository: PostRepository) {}

  async handle() {
    const posts = await this.repository.all()

    return <Index posts={posts} />
  }
}
