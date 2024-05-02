/* eslint-disable no-console */
import { type Database } from 'better-sqlite3'
import database from '.'
import * as createArticleTable from './migrations/20231007T071828Z-createArticleTable'

const MIGRATIONS_TABLE = 'migrations'

// To make our example very simple, we are not
// including a down function, which would reverse
// the changes made by the up function
type Migration = {
  timestamp: Date
  up: (db: Database) => unknown
}

// Our database will store migrations that have been applied
// to the database in a table called "migrations".
// It will compare the migrations that it "remembers"
// to the migrations that we have listed in our migrations folder.
type MigrationRecord = {
  timestamp: string
}

// our list of migrations, in order
const migrations: Migration[] = [createArticleTable]

function migrateToLatest(db: Database) {
  // make sure migrations table exists
  createMigrationsTable(db)

  const timestamps = getMigratedTimestamps(db)

  // filter out migrations that we already ran
  const migrationsToRun = migrations.filter(
    ({ timestamp }) => !timestamps.includes(timestamp.toISOString())
  )

  if (migrationsToRun.length === 0) {
    console.info('No migrations to run!')
    return
  }

  // run migrations in a transaction
  db.transaction(() => {
    migrationsToRun.forEach((migration) => {
      console.info('Migrating to %s', migration.timestamp)
      migration.up(db)
      saveMigration(db, migration.timestamp)
    })
  })()

  console.info('Migrations complete!')
}

function createMigrationsTable(db: Database) {
  const query = `
    CREATE TABLE IF NOT EXISTS ${MIGRATIONS_TABLE} (
      timestamp NUMERIC UNIQUE NOT NULL
    )
  `

  db.exec(query)
}

function getMigratedTimestamps(db: Database) {
  const query = `
    SELECT timestamp FROM ${MIGRATIONS_TABLE}
  `

  const migrationsExecuted = db.prepare(query).all() as MigrationRecord[]

  return migrationsExecuted.map(({ timestamp }) => timestamp)
}

function saveMigration(db: Database, timestamp: Date) {
  const query = `
    INSERT INTO ${MIGRATIONS_TABLE} (timestamp)
    VALUES (?)
  `

  db.prepare(query).run(timestamp.toISOString())
}

// run all migrations that have not been run yet
migrateToLatest(database)
