import { Kysely, sql } from 'kysely';
import { ArticleStatus } from '#articles/enums/article_status';

export async function up(db: Kysely<any>): Promise<void> {
	await db.schema
		.createTable('articles')
		.addColumn('id', 'uuid', (col) => col.primaryKey().defaultTo(sql`gen_random_uuid()`))
		.addColumn('created_at', 'timestamp', (col) => col.notNull())
		.addColumn('updated_at', 'timestamp', (col) => col.notNull())
		.addColumn('published_at', 'timestamp')
		.addColumn('title', 'varchar(100)', (col) => col.notNull())
		.addColumn('slug', 'varchar(120)', (col) => col.unique().notNull())
		.addColumn('description', 'varchar', (col) => col.notNull())
		.addColumn('canonical_url', 'varchar')
		.addColumn('markdown_content', 'text', (col) => col.notNull())
		.addColumn('markdown_ast', 'jsonb', (col) => col.notNull())
		.addColumn('status', 'integer', (col) => col.notNull().defaultTo(ArticleStatus.Draft))
		.addColumn('category_id', 'uuid', (col) => col.notNull().references('categories.id'))
		.execute();
}

export async function down(db: Kysely<any>): Promise<void> {
	await db.schema.dropTable('articles').execute();
}
