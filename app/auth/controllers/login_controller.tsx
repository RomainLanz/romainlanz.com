import { inject } from '@adonisjs/core'
import { AuthService } from '#auth/services/auth_service'
import { Login } from '#views/pages/auth/login'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class LoginController {
  constructor(private authService: AuthService) {}

  render() {
    return <Login />
  }

  async handle({ auth, request, response, session }: HttpContext) {
    const { email, password } = request.all()

    const user = await this.authService.attempt(email, password)

    if (!user) {
      session.flash('error', "Aucun compte n'a été trouvé avec les identifiants fournis.")
      session.flashAll()

      return response.redirect().back()
    }

    await auth.use('web').login(user)

    return response.redirect().toPath('/')
  }
}
