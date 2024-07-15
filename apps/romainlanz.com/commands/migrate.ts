import path from 'node:path'
import { db } from '#core/services/db'
import * as fs from 'node:fs/promises'
import { BaseCommand } from '@adonisjs/core/ace'
import { Migrator } from 'kysely'
import { FileMigrationProvider } from '#core/file_migration_provider'
import type { CommandOptions } from '@adonisjs/core/types/ace'

export default class Migrate extends BaseCommand {
  static commandName = 'migrate'
  static description = 'Migrate the database by executing pending migrations'
  static options: CommandOptions = {
    startApp: true,
  }

  declare migrator: Migrator

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
    })
  }

  /**
   * The complete lifecycle hook runs after the "run" method
   * and hence, we use it to close the data connection.
   */
  async completed() {
    await db.destroy()
  }

  /**
   * Runs migrations up method
   */
  async run() {
    const { error, results } = await this.migrator.migrateToLatest()

    /**
     * Print results
     */
    results?.forEach((it) => {
      switch (it.status) {
        case 'Success':
          this.logger.success(`migration "${it.migrationName}" was executed successfully`)
          break
        case 'Error':
          this.logger.error(`failed to execute migration "${it.migrationName}"`)
          break
        case 'NotExecuted':
          this.logger.info(`migration pending "${it.migrationName}"`)
      }
    })

    /**
     * Display error
     */
    if (error) {
      this.logger.error('Failed to migrate')
      this.error = error
      this.exitCode = 1
    }
  }
}
