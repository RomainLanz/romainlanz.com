import { inject } from '@adonisjs/core'
import vine from '@vinejs/vine'
import string from '@poppinss/utils/string'
import { ArticlePolicy } from '#admin/articles/policies/article_policy'
import { ArticleRepository } from '#articles/repositories/article_repository'
import { MarkdownCompiler } from '#articles/services/markdown_compiler'
import { AdminArticleView } from '#views/pages/admin/articles/main'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class StoreArticleController {
  static validator = vine.compile(
    vine.object({
      title: vine.string().minLength(3).maxLength(100),
      description: vine.string().minLength(3).maxLength(255),
      canonicalUrl: vine.string().normalizeUrl().optional(),
      markdownContent: vine.string().minLength(3),
    })
  )

  constructor(
    private repository: ArticleRepository,
    private markdownCompiler: MarkdownCompiler
  ) {}

  async render({ bouncer }: HttpContext) {
    await bouncer.with(ArticlePolicy).allows('create')

    return <AdminArticleView.Create />
  }

  async execute({ bouncer, request, response }: HttpContext) {
    await bouncer.with(ArticlePolicy).allows('create')

    const { title, description, markdownContent, canonicalUrl } = await request.validateUsing(
      StoreArticleController.validator
    )

    const slug = string.slug(title).toLocaleLowerCase()
    const markdownAst = await this.markdownCompiler.toAST(markdownContent)

    await this.repository.create({
      canonicalUrl: canonicalUrl || slug,
      title,
      description,
      markdownContent,
      markdownAst,
      slug,
    })

    return response.redirect().toRoute('admin.blog.posts.index')
  }
}
