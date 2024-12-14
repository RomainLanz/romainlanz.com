import type { Kysely } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
	await db.schema
		.createTable('redirect_visits')
		.addColumn('id', 'uuid', (col) => col.primaryKey())
		.addColumn('created_at', 'timestamptz', (col) => col.notNull())
		.addColumn('ip_address', 'uuid', (col) => col.unique().notNull())
		.addColumn('referer', 'text')
		.addColumn('redirect_id', 'uuid', (col) => col.notNull())
		.addColumn('count', 'int4', (col) => col.notNull().defaultTo(1))
		.execute();

	await db.schema.createIndex('fk_redirect_visits_redirect_id').on('redirect_visits').column('redirect_id').execute();
}

export async function down(db: Kysely<any>): Promise<void> {
	await db.schema.dropTable('redirect_visits').execute();
}
