import fs from 'node:fs/promises';
import path from 'node:path';
import { BaseCommand } from '@adonisjs/core/ace';
import ace from '@adonisjs/core/services/ace';
import { Migrator } from 'kysely';
import { FileMigrationProvider } from '#core/file_migration_provider';
import { db } from '#core/services/db';
import type { CommandOptions } from '@adonisjs/core/types/ace';

export default class MigrateFresh extends BaseCommand {
	static commandName = 'migrate:fresh';
	static description = '';

	static options: CommandOptions = {
		startApp: true,
	};

	declare migrator: Migrator;

	/**
	 * Prepare lifecycle hook runs before the "run" method
	 * and hence, we use it to prepare the migrator
	 * instance
	 */
	async prepare() {
		this.migrator = new Migrator({
			db,
			provider: new FileMigrationProvider({
				fs,
				path,
				migrationFolder: this.app.migrationsPath(),
			}),
		});
	}

	/**
	 * The complete lifecycle hook runs after the "run" method
	 * and hence, we use it to close the data connection.
	 */
	async completed() {
		await db.destroy();
	}

	async run() {
		const tables = await db
			// @ts-expect-error - dynamic table name
			.selectFrom('information_schema.tables')
			// @ts-expect-error - dynamic table name
			.where('table_schema', '=', 'public')
			// @ts-expect-error - dynamic table name
			.select(['table_name'])
			.execute();

		for (const table of tables) {
			await db.schema.dropTable(table.table_name).cascade().execute();
		}

		await ace.exec('migrate', []);
	}
}
