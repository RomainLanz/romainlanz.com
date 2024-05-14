import { Kysely } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable('article_categories')
    .addColumn('article_id', 'uuid', (col) => col.notNull().references('articles.id'))
    .addColumn('category_id', 'uuid', (col) => col.notNull().references('categories.id'))
    .addPrimaryKeyConstraint('pk_articles_categories', ['category_id', 'article_id'])
    .addUniqueConstraint('uc_article', ['article_id'])
    .execute()
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('article_categories').execute()
}
