import { inject } from '@adonisjs/core'
import AuthService from '#auth/services/auth_service'
import type { HttpContext } from '@adonisjs/core/http'
import { Login } from '#views/pages/auth/login'

const kAuthSessionKey = 'authenticated_user'

@inject()
export default class AuthController {
  constructor(private authService: AuthService) {}

  showLoginForm() {
    return <Login />
  }

  async login({ request, session, response }: HttpContext) {
    const { email, password } = request.all()

    const user = await this.authService.tryLogin(email, password)

    if (!user) {
      session.flash('error', "Aucun compte n'a été trouvé avec les identifiants fournis.")
      session.flashAll()

      return response.redirect().back()
    }

    session.put(kAuthSessionKey, user.id)

    return response.redirect().toPath('/')
  }

  async logout({ session, response }: HttpContext) {
    session.forget(kAuthSessionKey)

    return response.redirect().toPath('/')
  }
}
