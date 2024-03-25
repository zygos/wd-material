import 'dotenv/config'
import { Pool } from 'pg'
import { CamelCasePlugin, Kysely, PostgresDialect } from 'kysely'
import { type DB } from './types'

export type DatabaseConfig = {
  database: string
  host: string
  user: string
  password: string
  port: number
  max?: number
}

export default function createDatabase(config: DatabaseConfig) {
  return new Kysely<DB>({
    dialect: new PostgresDialect({
      pool: async () =>
        new Pool({
          max: 10,
          ...config,
        }),
    }),
    plugins: [new CamelCasePlugin()],
  })
}

export type Database = Kysely<DB>
export type DatabasePartial<T> = Kysely<T>
export * from './types'
