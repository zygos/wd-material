import 'dotenv/config'
import { CamelCasePlugin, Kysely, SqliteDialect } from 'kysely'
import SQlite from 'better-sqlite3'
import { type DB } from './types'

export default function createDatabase(url: string, { readonly = false } = {}) {
  return new Kysely<DB>({
    dialect: new SqliteDialect({
      database: new SQlite(url, { readonly }),
    }),
    plugins: [new CamelCasePlugin()],
  })
}

export type Database = Kysely<DB>
export type DatabasePartial<T> = Kysely<T>
export * from './types'
