import { inject } from '@adonisjs/core'
import hash from '@adonisjs/core/services/hash'
import { UserRepository } from '#auth/repositories/user_repository'

@inject()
export class AuthService {
  constructor(private repository: UserRepository) {}

  /**
   * Attempts to verify the user credentials.
   */
  async attempt(email: string, password: string) {
    const user = await this.repository.findUserByEmail(email)

    if (!user) {
      //? This is a security measure to prevent timing attacks.
      await hash.use('scrypt').make('password')

      return false
    }

    const hasValidPassword = await hash.verify(user.password, password)

    if (!hasValidPassword) {
      return false
    }

    return user
  }
}
