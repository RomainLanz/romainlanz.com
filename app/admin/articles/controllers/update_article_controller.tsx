import { inject } from '@adonisjs/core'
import vine from '@vinejs/vine'
import { ArticlePolicy } from '#admin/articles/policies/article_policy'
import { ArticleRepository } from '#articles/repositories/article_repository'
import { MarkdownCompiler } from '#articles/services/markdown_compiler'
import { AdminArticleView } from '#views/pages/admin/articles/main'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class UpdateArticleController {
  static validator = vine.compile(
    vine.object({
      title: vine.string().minLength(3).maxLength(100),
      canonicalUrl: vine.string().normalizeUrl(),
      markdownContent: vine.string().minLength(3),
    })
  )

  constructor(
    private repository: ArticleRepository,
    private markdownCompiler: MarkdownCompiler
  ) {}

  async render({ bouncer, params }: HttpContext) {
    await bouncer.with(ArticlePolicy).allows('update')

    const article = await this.repository.findById(params.id)

    return <AdminArticleView.Update article={article} />
  }

  async execute({ bouncer, request, response }: HttpContext) {
    await bouncer.with(ArticlePolicy).allows('update')

    const { title, markdownContent, canonicalUrl } = await request.validateUsing(
      UpdateArticleController.validator
    )

    const markdownAst = await this.markdownCompiler.toAST(markdownContent)

    await this.repository.update({
      id: request.param('id')!,
      title,
      markdownContent,
      canonicalUrl,
      markdownAst,
    })

    return response.redirect().toRoute('admin.articles.index')
  }
}
