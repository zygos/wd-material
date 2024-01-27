export type ParametersType = 'questionMark' | 'dollarSign'

export type Table = {
  name: string
}

export type Database = {
  parametersType: ParametersType

  queryAll<T extends { id: number }>(
    sql: string,
    bindings?: unknown[],
  ): Promise<T[]>
  run(sql: string, bindings?: unknown[]): Promise<unknown>
  release(): Promise<void>

  getTables(): Promise<Table[]>
}

export {
  createDatabase as createPostgresDatabase,
  createDatabaseWithTables as createPostgresDatabaseWithTables,
  formOptions as formPostgresOptions,
} from './postgres'

export {
  createDatabase as createTestDatabase,
  createDatabase as createSqliteDatabase,
  createDatabaseWithTables as createTestDatabaseWithTables,
  createDatabaseWithTables as createSqliteDatabaseWithTables,
} from './sqlite'
