import User from '#auth/models/user'
import hash from '@adonisjs/core/services/hash'

export default class AuthService {
  getSessionKey() {
    return 'authenticated_user'
  }

  fetchAuthenticatedUser(id: number) {
    return User.find(id)
  }

  async tryLogin(email: string, password: string) {
    const maybeUser = await User.findBy('email', email)

    if (!maybeUser) {
      //? Fake a slow response to prevent timing attacks
      await hash.verify(
        '$scrypt$n=16384,r=8,p=1$4xmOEpXPo56aRnntL5/YzA$VyXeQqLxLD48axpdkuGSU1A80uGt4/dv2ynLP4lfzkA2FaBLq1bo8lNi/1+o6+ZR6Bh77oIwpa4x9rim+kOAfQ',
        '123'
      )

      return null
    }

    const isSame = await hash.verify(maybeUser.password, password)

    return isSame ? maybeUser : null
  }
}
