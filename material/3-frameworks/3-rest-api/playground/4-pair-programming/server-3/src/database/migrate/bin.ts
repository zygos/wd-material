/* eslint-disable no-console */
import 'dotenv/config'
import * as path from 'node:path'
import * as fs from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import SQLite, { type Database } from 'better-sqlite3'
import { FileMigrationProvider, Kysely, SqliteDialect } from 'kysely'
import { migrateToLatest } from './index'

const MIGRATIONS_PATH = '../migrations'

async function migrateDefault(url: string) {
  const db = new Kysely<Database>({
    dialect: new SqliteDialect({
      database: new SQLite(url),
    }),
  })

  const dirname = path.dirname(fileURLToPath(import.meta.url))

  const nodeProvider = new FileMigrationProvider({
    fs,
    path,
    migrationFolder: path.join(dirname, MIGRATIONS_PATH),
  })

  const { results, error } = await migrateToLatest(nodeProvider, db)

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

const pathToThisFile = path.resolve(fileURLToPath(import.meta.url))
const pathPassedToNode = path.resolve(process.argv[1])
const isFileRunDirectly = pathToThisFile.includes(pathPassedToNode)

if (isFileRunDirectly) {
  const { DATABASE_URL } = process.env

  if (typeof DATABASE_URL !== 'string') {
    throw new Error('Provide DATABASE_URL in your environment variables.')
  }

  migrateDefault(DATABASE_URL)
}
