import { BaseSchema } from '@adonisjs/lucid/schema'
import { PostStatus } from '#blog/enums/post_status'

export default class extends BaseSchema {
  protected tableName = 'posts'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.db.rawQuery('gen_random_uuid()').knexQuery)
      table.timestamp('created_at', { useTz: false }).notNullable()
      table.timestamp('updated_at', { useTz: false }).notNullable()
      table.string('title', 100).notNullable()
      table.string('slug', 120).unique().notNullable()
      table.string('description').nullable()
      table.string('canonical_url').nullable()
      table.text('content').notNullable()
      table.integer('status').unsigned().defaultTo(PostStatus.Draft).notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
