import { sql, type Kysely } from 'kysely';

const supportedColors = ['cyan', 'violet', 'red', 'yellow', 'lime'];

export async function up(db: Kysely<any>): Promise<void> {
	await db.updateTable('tags').set({ color: 'cyan' }).where('color', 'not in', supportedColors).execute();
	await db.schema
		.alterTable('tags')
		.addCheckConstraint('tags_color_check', sql`color in ('cyan', 'violet', 'red', 'yellow', 'lime')`)
		.execute();
}

export async function down(db: Kysely<any>): Promise<void> {
	await db.schema.alterTable('tags').dropConstraint('tags_color_check').execute();
}
