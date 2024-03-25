import 'dotenv/config'
import * as path from 'path'
import * as fs from 'fs/promises'
import { FileMigrationProvider } from 'kysely'
import config from '../../config'
import createDatabase, { type DatabaseConfig } from '..'
import { migrateToLatest } from '.'

const MIGRATIONS_PATH = '../migrations'

/* eslint-disable no-console */
async function migrateDefault(databaseConfig: DatabaseConfig) {
  const db = createDatabase(databaseConfig)

  const nodeProvider = new FileMigrationProvider({
    fs,
    path,
    migrationFolder: path.join(__dirname, MIGRATIONS_PATH),
  })

  const { results, error } = await migrateToLatest(nodeProvider, db)

  results?.forEach((it) => {
    if (it.status === 'Success') {
      console.log(`migration "${it.migrationName}" was executed successfully`)
    } else if (it.status === 'Error') {
      console.error(`failed to execute migration "${it.migrationName}"`)
    }
  })

  if (error) {
    console.error('failed to migrate')
    console.error(error)
    process.exit(1)
  }

  await db.destroy()
}

if (require.main === module) {
  migrateDefault(config.database)
}
