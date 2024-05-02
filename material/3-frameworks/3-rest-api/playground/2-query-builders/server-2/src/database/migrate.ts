/* eslint-disable no-console */
import 'dotenv/config'
import * as path from 'node:path'
import fs from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import SQLite, { type Database } from 'better-sqlite3'
import { Kysely, Migrator, SqliteDialect, FileMigrationProvider } from 'kysely'

const { DATABASE_URL } = process.env
const MIGRATIONS_PATH = './migrations'

async function migrateToLatest() {
  if (typeof DATABASE_URL !== 'string') {
    throw new Error('Provide DATABASE_URL in your environment variables.')
  }

  const db = new Kysely<Database>({
    dialect: new SqliteDialect({
      database: new SQLite(DATABASE_URL),
    }),
  })

  const dirname = path.dirname(fileURLToPath(import.meta.url))
  const migrator = new Migrator({
    db,
    provider: new FileMigrationProvider({
      fs,
      path,
      migrationFolder: path.join(dirname, MIGRATIONS_PATH),
    }),
  })

  const { error, results } = await migrator.migrateToLatest()

  if (!results?.length) {
    console.log('No migrations to run.')
  }

  results?.forEach((it) => {
    if (it.status === 'Success') {
      console.info(`Migration "${it.migrationName}" was executed successfully.`)
    } else if (it.status === 'Error') {
      console.error(`Failed to execute migration "${it.migrationName}".`)
    }
  })

  if (error) {
    console.error('Failed to migrate.')
    console.error(error)
    process.exit(1)
  }

  await db.destroy()
}

migrateToLatest()
