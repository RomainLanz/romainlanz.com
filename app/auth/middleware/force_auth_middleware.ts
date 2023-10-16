import { inject } from '@adonisjs/core'
import AuthService from '#auth/services/auth_service'
import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

@inject()
export default class ForceAuthMiddleware {
  constructor(private authService: AuthService) {}

  async handle(ctx: HttpContext, next: NextFn) {
    if (ctx.user) {
      return await next()
    }

    const authenticatedUserId = ctx.session.get(this.authService.getSessionKey())

    if (!authenticatedUserId) {
      return ctx.response.redirect().toPath('/')
    }

    ctx.user = await this.authService.fetchAuthenticatedUser(authenticatedUserId)
    ctx.view.share({ user: ctx.user })

    if (!ctx.user) {
      return ctx.response.redirect().toPath('/')
    }

    return await next()
  }
}
