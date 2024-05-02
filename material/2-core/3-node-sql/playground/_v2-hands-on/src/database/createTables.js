import { join } from 'node:path'
import { readFile } from 'node:fs/promises'
import { database } from './database.js'
import { fileURLToPath } from 'node:url'

/**
 * Create tables in the database from the tables.sql file.
 */
export async function createTables() {
  const filePath = join(fileURLToPath(import.meta.url), '../tables.sql')
  const sqlFile = await readFile(filePath, 'utf-8')

  database.exec(sqlFile)
}
