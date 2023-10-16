import { inject } from '@adonisjs/core'
import AuthService from '#auth/services/auth_service'
import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

@inject()
export default class GuestAuthMiddleware {
  constructor(private authService: AuthService) {}

  async handle(ctx: HttpContext, next: NextFn) {
    if (ctx.user) {
      return ctx.response.redirect().back()
    }

    const authenticatedUserId = ctx.session.get(this.authService.getSessionKey())

    if (authenticatedUserId) {
      return ctx.response.redirect().back()
    }

    return await next()
  }
}
