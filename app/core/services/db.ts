import pg from 'pg'
import { Kysely, PostgresDialect } from 'kysely'
import env from '#start/env'
import type { DB } from '#types/db'

const { Pool } = pg

const pool = new Pool({
  host: env.get('DB_HOST'),
  user: env.get('DB_USER'),
  password: env.get('DB_PASSWORD'),
  database: env.get('DB_DATABASE'),
  max: 20,
})

const dialect = new PostgresDialect({
  pool,
})

export const db = new Kysely<DB>({
  dialect,
})
