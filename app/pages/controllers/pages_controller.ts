import { assert } from '@poppinss/utils/assert'
import { UserRole } from '#auth/enums/user_role'
import type { HttpContext } from '@adonisjs/core/http'

export default class PagesController {
  dashboard({ user, response, view }: HttpContext) {
    assert(user, 'User is not authenticated')

    if (user.role !== UserRole.Admin) {
      return response.redirect().back()
    }

    return view.render('pages/admin/dashboard')
  }
}
