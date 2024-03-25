import sqlite from 'better-sqlite3'
import { type Database, type Table } from '.'
import createTables from './createTables'

export const createDatabase = (
  path = ':memory:',
  options: sqlite.Options = {},
): Database => {
  const db = sqlite(path, options)

  // this could also be done with classes
  return {
    parametersType: 'questionMark',

    async queryAll<T>(sql: string, bindings = []): Promise<T[]> {
      return db.prepare(sql).all(bindings) as T[]
    },
    async run(sql: string, bindings = []) {
      return db.prepare(sql).run(bindings)
    },
    async release() {
      db.close()
    },
    async getTables() {
      return db
        .prepare(
          `SELECT name FROM sqlite_schema WHERE type='table' ORDER BY name;`,
        )
        .all() as Table[]
    },
  }
}

export const createDatabaseWithTables = async (
  path = ':memory:',
  options: sqlite.Options = {},
) => {
  const database = createDatabase(path, options)
  return createTables(database)
}
