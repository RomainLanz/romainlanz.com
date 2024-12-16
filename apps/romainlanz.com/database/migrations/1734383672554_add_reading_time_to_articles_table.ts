import type { Kysely } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
	await db.schema
		.alterTable('articles')
		.addColumn('reading_time', 'integer', (col) => col.notNull().defaultTo(0))
		.execute();
}

export async function down(db: Kysely<any>): Promise<void> {
	await db.schema.alterTable('articles').dropColumn('reading_time').execute();
}
