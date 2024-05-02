import { inject } from '@adonisjs/core'
import { ArticleRepository } from '#articles/repositories/article_repository'
import { Landing } from '#views/pages/landing'

@inject()
export default class LandingController {
  constructor(private postRepository: ArticleRepository) {}

  async render() {
    const posts = await this.postRepository.findLastFourPublished()

    return <Landing posts={posts} />
  }
}
