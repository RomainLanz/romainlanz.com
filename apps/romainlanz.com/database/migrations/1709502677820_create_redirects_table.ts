import type { Kysely } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
	await db.schema
		.createTable('redirects')
		.addColumn('id', 'uuid', (col) => col.primaryKey())
		.addColumn('created_at', 'timestamptz', (col) => col.notNull())
		.addColumn('updated_at', 'timestamptz')
		.addColumn('slug', 'text', (col) => col.unique().notNull())
		.addColumn('destination', 'text', (col) => col.notNull())
		.execute();
}

export async function down(db: Kysely<any>): Promise<void> {
	await db.schema.dropTable('redirects').execute();
}
