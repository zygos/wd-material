import { join } from 'node:path'
import { readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { database } from './database.js'

/**
 * Create tables in the database from the tables.sql file.
 */
export async function createTables() {
  // import.meta.url is a special Node.js variable available in ES modules
  // that contains the URL of this file.
  // After some processing, we can get the directory of the current file.
  // This allows us to load files relative to this file.
  const directory = join(fileURLToPath(import.meta.url), '..')
  const filePath = join(directory, './tables.sql')
  const sqlFile = await readFile(filePath, 'utf-8')

  database.exec(sqlFile)
}
