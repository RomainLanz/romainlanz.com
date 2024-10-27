import type { Kysely } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
	await db.schema
		.createTable('categories')
		.addColumn('id', 'uuid', (col) => col.primaryKey())
		.addColumn('name', 'text', (col) => col.notNull().unique())
		.addColumn('slug', 'text', (col) => col.notNull().unique())
		.addColumn('illustration_name', 'text')
		.execute();
}

export async function down(db: Kysely<any>): Promise<void> {
	await db.schema.dropTable('categories').execute();
}
