import sqlite from 'better-sqlite3'
import createTables from './createTables'

export const createDatabase = (
  path = ':memory:',
  options: sqlite.Options = {},
) => sqlite(path, options)

export const createDatabaseWithTables = (
  path = ':memory:',
  options: sqlite.Options = {},
) => {
  const db = createDatabase(path, options)
  return createTables(db)
}
