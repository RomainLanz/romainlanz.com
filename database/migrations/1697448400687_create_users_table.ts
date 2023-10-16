import { BaseSchema } from '@adonisjs/lucid/schema'
import { UserRole } from '#auth/enums/user_role'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.db.rawQuery('gen_random_uuid()').knexQuery)
      table.timestamp('created_at', { useTz: false }).notNullable()
      table.timestamp('updated_at', { useTz: false }).notNullable()
      table.string('email', 150).notNullable().unique()
      table.string('password').notNullable()
      table.string('remember_me_token').nullable()
      table.integer('role').unsigned().defaultTo(UserRole.User)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
