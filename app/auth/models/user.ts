import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { BaseModel, beforeSave, column } from '@adonisjs/lucid/orm'
import type { IUserRole } from '#auth/enums/user_role'
import type { UUID } from '#types/common'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  declare id: UUID

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column()
  declare email: string

  @column()
  declare password: string

  @column()
  declare rememberMeToken?: string

  @column()
  declare role: IUserRole

  @beforeSave()
  static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await hash.make(user.password)
    }
  }

  async verifyPasswordForAuth(plainTextPassword: string) {
    return hash.verify(this.password, plainTextPassword)
  }
}
