import type { Kysely } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
	await db.schema
		.createTable('tag_articles')
		.addColumn('tag_id', 'uuid', (col) => col.notNull().references('tags.id'))
		.addColumn('article_id', 'uuid', (col) => col.notNull().references('articles.id'))
		.addPrimaryKeyConstraint('pk_tag_articles', ['tag_id', 'article_id'])
		.execute();
}

export async function down(db: Kysely<any>): Promise<void> {
	await db.schema.dropTable('tag_articles').execute();
}
