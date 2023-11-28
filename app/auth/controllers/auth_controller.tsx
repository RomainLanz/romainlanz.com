import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import { Login } from '#views/pages/auth/login'

@inject()
export default class AuthController {
  showLoginForm() {
    return <Login />
  }

  async login({ auth, request, session, response }: HttpContext) {
    const { email, password } = request.all()

    try {
      await auth.use('web').attempt(email, password)
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
