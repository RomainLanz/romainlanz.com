import { ArticleStatus } from '#articles/enums/article_status';
import type { Kysely } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
	await db.schema
		.createTable('articles')
		.addColumn('id', 'uuid', (col) => col.primaryKey())
		.addColumn('created_at', 'timestamptz', (col) => col.notNull())
		.addColumn('updated_at', 'timestamptz')
		.addColumn('published_at', 'timestamptz')
		.addColumn('title', 'text', (col) => col.notNull())
		.addColumn('slug', 'text', (col) => col.unique().notNull())
		.addColumn('summary', 'text', (col) => col.notNull())
		.addColumn('markdown_content', 'text', (col) => col.notNull())
		.addColumn('markdown_ast', 'jsonb', (col) => col.notNull())
		.addColumn('status', 'integer', (col) => col.notNull().defaultTo(ArticleStatus.Draft))
		.addColumn('category_id', 'uuid', (col) => col.notNull().references('categories.id'))
		.execute();

	await db.schema.createIndex('fk_articles_category_id').on('articles').column('category_id').execute();
}

export async function down(db: Kysely<any>): Promise<void> {
	await db.schema.dropTable('articles').execute();
}
