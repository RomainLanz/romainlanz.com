import { pathToFileURL } from 'node:url'
import type { FileMigrationProviderProps, Migration, MigrationProvider } from 'kysely'

/**
 * Custom FileMigrationProvider to make it work on Windows too.
 *
 * Original: https://github.com/kysely-org/kysely/blob/93630057467f8d78b1688e6b002bb312aeccce68/src/migration/file-migration-provider.ts
 *
 * @see https://github.com/kysely-org/kysely/issues/254
 * @see https://github.com/kysely-org/kysely/issues/698
 * @see https://github.com/kysely-org/kysely/issues/768
 */
export class FileMigrationProvider implements MigrationProvider {
  readonly #props: FileMigrationProviderProps

  constructor(props: FileMigrationProviderProps) {
    this.#props = props
  }

  async getMigrations(): Promise<Record<string, Migration>> {
    const migrations: Record<string, Migration> = {}
    const files = await this.#props.fs.readdir(this.#props.migrationFolder)

    for (const fileName of files) {
      if (
        fileName.endsWith('.js') ||
        (fileName.endsWith('.ts') && !fileName.endsWith('.d.ts')) ||
        fileName.endsWith('.mjs') ||
        (fileName.endsWith('.mts') && !fileName.endsWith('.d.mts'))
      ) {
        const path = pathToFileURL(this.#props.path.join(this.#props.migrationFolder, fileName))
        const migration = await import(path.href)
        const migrationKey = fileName.substring(0, fileName.lastIndexOf('.'))

        // Handle esModuleInterop export's `default` prop...
        if (isMigration(migration?.default)) {
          migrations[migrationKey] = migration.default
        } else if (isMigration(migration)) {
          migrations[migrationKey] = migration
        }
      }
    }

    return migrations
  }
}

function isMigration(obj: unknown): obj is Migration {
  return isObject(obj) && isFunction(obj.up)
}

function isFunction(obj: unknown): obj is Function {
  return typeof obj === 'function'
}

function isObject(obj: unknown): obj is ShallowRecord<string, unknown> {
  return typeof obj === 'object' && obj !== null
}

type DrainOuterGeneric<T> = [T] extends [unknown] ? T : never

type ShallowRecord<K extends keyof any, T> = DrainOuterGeneric<{
  [P in K]: T
}>
