import Database from 'better-sqlite3'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const databaseUrl = join(fileURLToPath(import.meta.url), '../../../data/database.db')

export default new Database(databaseUrl)
