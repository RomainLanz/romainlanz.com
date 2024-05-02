import { inject } from '@adonisjs/core'
import { ArticleRepository } from '#articles/repositories/article_repository'
import { AdminArticleView } from '#views/pages/admin/articles/main'

@inject()
export default class ListArticlesController {
  constructor(private repository: ArticleRepository) {}

  async render() {
    const posts = await this.repository.all()

    return <AdminArticleView.List posts={posts} />
  }
}
