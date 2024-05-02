import { join } from 'node:path'
import { readFile } from 'node:fs/promises'
import { database } from './database.js'
import { fileURLToPath } from 'node:url'

/**
 * Seed data into the database from the seed.sql file.
 */
export async function seedData() {
  // You can uncomment the lines below to clear the database
  // database.exec('DELETE FROM delivery')
  // database.exec('DELETE FROM address')
  // database.exec('DELETE FROM customer')

  // We generally do not want to seed data again if it already exists.
  // Here we will make an assumption that if we have already some data in the database,
  // we will not seed it again.
  const hasData =
    database.prepare('SELECT COUNT(*) as count FROM delivery').get().count > 0

  if (hasData) return

  const filePath = join(fileURLToPath(import.meta.url), '../seed.sql')
  const sqlFile = await readFile(
    filePath,
    'utf-8',
  )

  database.exec(sqlFile)
}
