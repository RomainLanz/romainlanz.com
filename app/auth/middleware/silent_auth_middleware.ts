import { inject } from '@adonisjs/core'
import AuthService from '#auth/services/auth_service'
import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

@inject()
export default class SilentAuthMiddleware {
  constructor(private authService: AuthService) {}

  async handle(ctx: HttpContext, next: NextFn) {
    const authenticatedUserId = ctx.session.get(this.authService.getSessionKey())

    if (authenticatedUserId !== undefined) {
      ctx.user = await this.authService.fetchAuthenticatedUser(authenticatedUserId)
      ctx.view.share({ user: ctx.user })
    }

    return await next()
  }
}
