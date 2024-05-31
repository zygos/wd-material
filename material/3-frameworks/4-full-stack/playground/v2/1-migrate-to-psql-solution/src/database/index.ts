import { CamelCasePlugin, Kysely, PostgresDialect } from 'kysely'
import pg from 'pg'
import { type DB } from './types'

// NEW: optionally, using PoolConfig instead of our custom type.
// After all, our createDatabase is only passing options to the
// pg.Pool constructor, so we can simply use the same type that
// we see if we hover over the Pool constructor.
export function createDatabase(options: pg.PoolConfig): Kysely<DB> {
  return new Kysely<DB>({
    dialect: new PostgresDialect({
      pool: new pg.Pool(options),
    }),
    plugins: [new CamelCasePlugin()],
  })
}

export type Database = Kysely<DB>
export type DatabasePartial<T> = Kysely<T>
export * from './types'
