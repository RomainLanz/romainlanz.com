import type { Kysely } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
	await db.schema
		.alterTable('tags')
		.addColumn('slug', 'text', (col) => col.notNull())
		.execute();
	await db.schema.alterTable('tags').addUniqueConstraint('tags_slug_unique', ['slug']).execute();
}

export async function down(db: Kysely<any>): Promise<void> {
	await db.schema.alterTable('tags').dropConstraint('tags_slug_unique').execute();
	await db.schema.alterTable('tags').dropColumn('slug').execute();
}
