import { assert } from '@poppinss/utils/assert'
import { UserRole } from '#auth/enums/user_role'
import type { HttpContext } from '@adonisjs/core/http'
import Post from '#blog/models/post'
import string from '@poppinss/utils/string'

export default class PostsController {
  create({ user, view, response }: HttpContext) {
    assert(user, 'User is not authenticated')

    if (user.role !== UserRole.Admin) {
      return response.redirect().back()
    }

    return view.render('pages/admin/blog/posts/create')
  }

  async store({ user, request, response }: HttpContext) {
    assert(user, 'User is not authenticated')

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
