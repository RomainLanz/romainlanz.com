import { Kysely } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable('tag_posts')
    .addColumn('tag_id', 'uuid', (col) => col.notNull().references('tags.id'))
    .addColumn('post_id', 'uuid', (col) => col.notNull().references('posts.id'))
    .addPrimaryKeyConstraint('pk_tag_posts', ['tag_id', 'post_id'])
    .execute()
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('tag_posts').execute()
}
