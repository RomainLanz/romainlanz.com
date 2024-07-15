import { UserRole } from '#auth/enums/user_role'
import type { HttpContext } from '@adonisjs/core/http'
import { Dashboard } from '#views/pages/admin/dashboard'

export default class PagesController {
  dashboard({ auth, response }: HttpContext) {
    const user = auth.getUserOrFail()

    if (user.role !== UserRole.Admin) {
      return response.redirect().back()
    }

    return <Dashboard />
  }
}
