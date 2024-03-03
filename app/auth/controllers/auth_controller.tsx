import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import { Login } from '#views/pages/auth/login'
import User from '#auth/models/user'

@inject()
export default class AuthController {
  showLoginForm() {
    return <Login />
  }

  async login({ auth, request, session, response }: HttpContext) {
    const { email, password } = request.all()

    try {
      const user = await User.verifyCredentials(email, password)

      await auth.use('web').login(user)
    } catch (e) {
      session.flash('error', "Aucun compte n'a été trouvé avec les identifiants fournis.")
      session.flashAll()

      return response.redirect().back()
    }

    return response.redirect().toPath('/')
  }

  async logout({ auth, response }: HttpContext) {
    await auth.use('web').logout()

    return response.redirect().toPath('/')
  }
}
