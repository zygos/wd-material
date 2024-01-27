import { Database as SqliteDatabase } from 'better-sqlite3'

export type Table = {
  name: string
}

// if you would want to abstract the database, you would need to adapt this type
export type Database = SqliteDatabase

export {
  createDatabase as createTestDatabase,
  createDatabase as createSqliteDatabase,
  createDatabaseWithTables as createTestDatabaseWithTables,
  createDatabaseWithTables as createSqliteDatabaseWithTables,
} from './sqlite'
