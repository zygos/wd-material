import { CamelCasePlugin, Kysely, SqliteDialect } from 'kysely'
import SQLite from 'better-sqlite3'
import { type DB } from './types'

type DatabaseOptions = {
  connectionString: string
}

export function createDatabase(options: DatabaseOptions): Kysely<DB> {
  return new Kysely<DB>({
    dialect: new SqliteDialect({
      database: new SQLite(options.connectionString),
    }),
    plugins: [new CamelCasePlugin()],
  })
}

export type Database = Kysely<DB>
export type DatabasePartial<T> = Kysely<T>
export * from './types'
