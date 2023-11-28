import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class SilentMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    await ctx.auth.use('web').check()
    return next()
  }
}
