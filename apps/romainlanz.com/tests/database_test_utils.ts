import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Migrator, sql } from 'kysely';
import { FileMigrationProvider } from '#core/file_migration_provider';
import { db } from '#core/services/db';

const migrationFolder = fileURLToPath(new URL('../database/migrations', import.meta.url));

export async function migrateDatabase() {
	const migrator = new Migrator({
		db,
		provider: new FileMigrationProvider({
			fs,
			path,
			migrationFolder,
		}),
	});
	const { error } = await migrator.migrateToLatest();

	if (error) {
		throw error;
	}
}

export async function truncateDatabase() {
	const { rows } = await sql<{ tablename: string }>`
		SELECT tablename
		FROM pg_tables
		WHERE schemaname = 'public'
			AND tablename NOT IN ('kysely_migration', 'kysely_migration_lock')
	`.execute(db);

	if (rows.length === 0) {
		return;
	}

	await sql`
		TRUNCATE TABLE ${sql.join(rows.map((row) => sql.id('public', row.tablename)))}
		RESTART IDENTITY CASCADE
	`.execute(db);
}
