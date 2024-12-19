import type { Kysely } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
	await db.schema
		.createTable('cache')
		.addColumn('key', 'text', (col) => col.primaryKey())
		.addColumn('value', 'jsonb')
		.addColumn('expires_at', 'int8')
		.execute();
}

export async function down(db: Kysely<any>): Promise<void> {
	await db.schema.dropTable('cache').execute();
}
