import { inject } from '@adonisjs/core'
import vine from '@vinejs/vine'
import string from '@poppinss/utils/string'
import { UserRole } from '#auth/enums/user_role'
import { PostRepository } from '#blog/repositories/post_repository'
import { MarkdownCompiler } from '#blog/services/markdown_compiler'
import { PostView } from '#views/pages/admin/blog/posts/posts'
import type { Infer } from '@vinejs/vine/types'
import type { HttpContext } from '@adonisjs/core/http'

export type StorePostPayload = Infer<typeof StorePostController.validator>

@inject()
export default class StorePostController {
  static validator = vine.compile(
    vine.object({
      title: vine.string().minLength(3).maxLength(100),
      canonicalUrl: vine.string().normalizeUrl().optional(),
      markdownContent: vine.string().minLength(3),
    })
  )

  constructor(
    private repository: PostRepository,
    private markdownCompiler: MarkdownCompiler
  ) {}

  render({ auth, response }: HttpContext) {
    const user = auth.getUserOrFail()

    if (user.role !== UserRole.Admin) {
      return response.redirect().back()
    }

    return <PostView.Create />
  }

  async handle({ auth, request, response }: HttpContext) {
    const user = auth.getUserOrFail()

    if (user.role !== UserRole.Admin) {
      return response.redirect().back()
    }

    const { title, markdownContent, canonicalUrl } = await request.validateUsing(
      StorePostController.validator
    )

    const slug = string.slug(title).toLocaleLowerCase()
    const htmlContent = await this.markdownCompiler.toHtml(markdownContent)

    await this.repository.create({
      canonicalUrl: canonicalUrl || slug,
      title,
      markdownContent,
      htmlContent: htmlContent.contents,
      slug,
    })

    return response.redirect().toRoute('admin.blog.posts.index')
  }
}
