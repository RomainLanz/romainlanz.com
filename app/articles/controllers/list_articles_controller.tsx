import { inject } from '@adonisjs/core'
import { ArticleRepository } from '#articles/repositories/article_repository'
import { ArticleView } from '#views/pages/articles/main'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class ListArticlesController {
  constructor(private repository: ArticleRepository) {}

  async render({ request }: HttpContext) {
    const page = request.input('page', 1)
    const posts = await this.repository.paginated(page, 4)

    return <ArticleView.List posts={posts} />
  }
}
