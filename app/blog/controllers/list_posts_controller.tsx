import { inject } from '@adonisjs/core'
import { PostRepository } from '#blog/repositories/post_repository'
import { PostView } from '#views/pages/admin/blog/posts/posts'

@inject()
export default class ListPostsController {
  constructor(private repository: PostRepository) {}

  async render() {
    const posts = await this.repository.all()

    return <PostView.List posts={posts} />
  }
}
