import { UserRole } from '#auth/enums/user_role'
import type { HttpContext } from '@adonisjs/core/http'
import Post from '#blog/models/post'
import string from '@poppinss/utils/string'
import { PostView } from '#views/pages/admin/blog/posts/posts'
import { storePostValidator } from '#blog/validators/post_validator'

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

    const { title, content, canonicalUrl } = await request.validateUsing(storePostValidator)

    await Post.create({
      title,
      canonicalUrl,
      content,
      slug: string.slug(title).toLocaleLowerCase(),
    })

    return response.redirect().back()
  }
}
