import { assert } from '@poppinss/utils/assert'
import { UserRole } from '#auth/enums/user_role'
import type { HttpContext } from '@adonisjs/core/http'
import { Dashboard } from '#views/pages/admin/dashboard'

export default class PagesController {
  dashboard({ user, response }: HttpContext) {
    assert(user, 'User is not authenticated')

    if (user.role !== UserRole.Admin) {
      return response.redirect().back()
    }

    return <Dashboard />
  }
}
