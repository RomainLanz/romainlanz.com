import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import { BaseCommand, flags } from '@adonisjs/core/ace';
import { db } from '#core/services/db';
import { Migrator } from 'kysely';
import { FileMigrationProvider } from '#core/file_migration_provider';
import type { CommandOptions } from '@adonisjs/core/types/ace';

export default class MigrateRollback extends BaseCommand {
	static commandName = 'migrate:rollback';
	static description = 'Rollback the database by running down method on the migration files';
	static options: CommandOptions = {
		startApp: true,
	};

	@flags.number({ description: 'Define number of migrations to rollback', default: 1, alias: 's' })
	declare step: number;

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

	/**
	 * Runs migrations down method
	 */
	async run() {
		for (let i = 0; i < this.step; i++) {
			await this.#migrateDown();
		}
	}

	async #migrateDown() {
		const { error, results } = await this.migrator.migrateDown();

		/**
		 * Print results
		 */
		results?.forEach((it) => {
			switch (it.status) {
				case 'Success':
					this.logger.success(`migration "${it.migrationName}" rolled back successfully`);
					break;
				case 'Error':
					this.logger.error(`failed to rollback migration "${it.migrationName}"`);
					break;
				case 'NotExecuted':
					this.logger.info(`rollback pending "${it.migrationName}"`);
			}
		});

		/**
		 * Display error
		 */
		if (error) {
			this.logger.error('Failed to rollback');
			this.error = error;
			this.exitCode = 1;
		}
	}
}
