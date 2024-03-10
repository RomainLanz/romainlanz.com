import { Kysely, sql } from 'kysely'
import { PostStatus } from '#blog/enums/post_status'

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable('posts')
    .addColumn('id', 'uuid', (col) => col.primaryKey().defaultTo(sql`gen_random_uuid()`))
    .addColumn('created_at', 'timestamp', (col) => col.notNull())
    .addColumn('updated_at', 'timestamp', (col) => col.notNull())
    .addColumn('title', 'varchar(100)', (col) => col.notNull())
    .addColumn('slug', 'varchar(120)', (col) => col.unique().notNull())
    .addColumn('description', 'varchar')
    .addColumn('canonical_url', 'varchar')
    .addColumn('content', 'text', (col) => col.notNull())
    .addColumn('status', 'integer', (col) => col.notNull().defaultTo(PostStatus.Draft))
    .execute()
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('posts').execute()
}
