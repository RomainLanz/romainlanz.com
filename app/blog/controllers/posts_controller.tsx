import { UserRole } from '#auth/enums/user_role'
import type { HttpContext } from '@adonisjs/core/http'
import Post from '#blog/models/post'
import string from '@poppinss/utils/string'
import { PostView } from '#views/pages/admin/blog/posts/posts'

export default class PostsController {
  create({ auth, response }: HttpContext) {
    const user = auth.getUserOrFail()

    if (user.role !== UserRole.Admin) {
      return response.redirect().back()
    }

    return <PostView.Create />
  }

  async store({ auth, request, response }: HttpContext) {
    const user = auth.getUserOrFail()

    if (user.role !== UserRole.Admin) {
      return response.redirect().back()
    }

    const { title, content } = request.all()

    await Post.create({
      title,
      content,
      slug: string.slug(title),
    })

    return response.redirect().back()
  }
}
