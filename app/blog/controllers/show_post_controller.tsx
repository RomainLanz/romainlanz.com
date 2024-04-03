import { inject } from '@adonisjs/core'
import { PostRepository } from '#blog/repositories/post_repository'
import { BlogView } from '#views/pages/blog/blog'
import { MarkdownCompiler } from '#blog/services/markdown_compiler'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class ShowPostController {
  constructor(
    private repository: PostRepository,
    private markdownCompiler: MarkdownCompiler
  ) {}

  async render({ params }: HttpContext) {
    const post = await this.repository.findBySlug(params.slug)

    const ast = await this.markdownCompiler.toAST(post.markdown_content)

    return <BlogView.Show post={post} ast={ast?.children} />
  }
}
