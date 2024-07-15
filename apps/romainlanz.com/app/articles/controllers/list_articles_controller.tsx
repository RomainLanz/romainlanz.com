import { inject } from '@adonisjs/core'
import { ArticleRepository } from '#articles/repositories/article_repository'
import { ArticleView } from '#views/pages/articles/main'
import type { HttpContext } from '@adonisjs/core/http'
import { CategoryRepository } from '#categories/repositories/category_repository'

@inject()
export default class ListArticlesController {
  constructor(
    private repository: ArticleRepository,
    private categoryRepository: CategoryRepository
  ) {}

  async render({ request }: HttpContext) {
    const page = request.input('page', 1)

    const [articles, categoryCount] = await Promise.all([
      this.repository.paginated(page, 4),
      this.categoryRepository.countWithArticles(),
    ])

    return <ArticleView.List articles={articles} categoryCount={categoryCount} />
  }
}
