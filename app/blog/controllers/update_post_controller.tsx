import { inject } from '@adonisjs/core'
import vine from '@vinejs/vine'
import { HttpContext } from '@adonisjs/core/http'
import { PostPolicy } from '#blog/policies/post_policy'
import { PostRepository } from '#blog/repositories/post_repository'
import { PostView } from '#views/pages/admin/blog/posts/posts'
import { MarkdownCompiler } from '#blog/services/markdown_compiler'

@inject()
export default class UpdatePostController {
  static validator = vine.compile(
    vine.object({
      title: vine.string().minLength(3).maxLength(100),
      canonicalUrl: vine.string().normalizeUrl(),
      markdownContent: vine.string().minLength(3),
    })
  )

  constructor(
    private repository: PostRepository,
    private markdownCompiler: MarkdownCompiler
  ) {}

  async render({ bouncer, params }: HttpContext) {
    await bouncer.with(PostPolicy).allows('update')

    const post = await this.repository.findById(params.id)

    return <PostView.Update post={post} />
  }

  async execute({ bouncer, request, response }: HttpContext) {
    await bouncer.with(PostPolicy).allows('update')

    const { title, markdownContent, canonicalUrl } = await request.validateUsing(
      UpdatePostController.validator
    )

    const htmlContent = await this.markdownCompiler.toHtml(markdownContent)

    await this.repository.update({
      id: request.param('id')!,
      title,
      markdownContent,
      canonicalUrl,
      htmlContent: htmlContent.contents,
    })

    return response.redirect().toRoute('admin.blog.posts.index')
  }
}
