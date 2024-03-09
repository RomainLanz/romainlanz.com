import { db } from '#core/services/db'

export class UserRepository {
  findUserByEmail(email: string) {
    return db.selectFrom('users').selectAll().where('email', '=', email).executeTakeFirst()
  }
}
