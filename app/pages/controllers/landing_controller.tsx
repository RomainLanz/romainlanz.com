import { inject } from '@adonisjs/core'
import { PostRepository } from '#blog/repositories/post_repository'
import { Landing } from '#views/pages/landing'

@inject()
export default class LandingController {
  constructor(private postRepository: PostRepository) {}

  async render() {
    const posts = await this.postRepository.findLastFourPublished()

    return <Landing posts={posts} />
  }
}
