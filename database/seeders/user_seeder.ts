import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#auth/models/user'
import { UserRole } from '#auth/enums/user_role'

export default class extends BaseSeeder {
  async run() {
    await User.updateOrCreate(
      { email: 'romain.lanz@pm.me' },
      {
        email: 'romain.lanz@pm.me',
        password: 'secret',
        role: UserRole.Admin,
      }
    )
  }
}
