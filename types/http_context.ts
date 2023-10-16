import User from '#auth/models/user'

declare module '@adonisjs/core/http' {
  interface HttpContext {
    user: User | null
  }
}
