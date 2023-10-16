import { inject } from '@adonisjs/core'
import AuthService from '#auth/services/auth_service'
import type { HttpContext } from '@adonisjs/core/http'

const kAuthSessionKey = 'authenticated_user'

@inject()
export default class AuthController {
  constructor(private authService: AuthService) {}

  showLoginForm({ view }: HttpContext) {
    return view.render('pages/auth/login')
  }

  async login({ request, session, response }: HttpContext) {
    const { email, password } = request.all()

    const user = await this.authService.login(email, password)

    if (!user) {
      session.flash('error', 'Invalid credentials')

      return response.redirect().back()
    }

    session.put(kAuthSessionKey, { user: user.id })

    return response.redirect().toPath('/')
  }

  async logout({ session, response }: HttpContext) {
    session.forget(kAuthSessionKey)

    return response.redirect().toPath('/')
  }
}
