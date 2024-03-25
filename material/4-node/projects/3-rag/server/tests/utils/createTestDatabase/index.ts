import { CamelCasePlugin, Kysely, SqliteDialect } from 'kysely'
import SQLite from 'better-sqlite3'
import ModuleMigrationProvider from './ModuleMigrationProvider'
import { migrateToLatest } from '@/database/migrate'
import { type DB } from '@/database'

const DATABASE_FILE = ':memory:'

export default async () => {
  const provider = new ModuleMigrationProvider()

  const database = new Kysely<DB>({
    dialect: new SqliteDialect({ database: new SQLite(DATABASE_FILE) }),
    plugins: [new CamelCasePlugin()],
  })

  const { results, error } = await migrateToLatest(provider, database)

  results
    ?.filter((result) => result.status === 'Error')
    .forEach((result) => {
      console.error(`failed to execute migration "${result.migrationName}"`)
    })

  return database
}
