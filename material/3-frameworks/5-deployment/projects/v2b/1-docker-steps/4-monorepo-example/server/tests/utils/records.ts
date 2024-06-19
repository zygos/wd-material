import {
  sql,
  type ExpressionOrFactory,
  type Insertable,
  type Kysely,
  type SqlBool,
  SqliteAdapter,
} from 'kysely'
import type { DB } from '@server/database'

type DatabaseTypes<N extends keyof DB> = { [P in N]: DB[P] }

/**
 * Clears the records from the specified tables in the database.
 * If the database is SQLite, it deletes all records from the tables.
 * If the database is PostgreSQL, it truncates all tables.
 */
export const clearTables = async <
  N extends keyof DB,
  T extends DatabaseTypes<N>,
>(
  db: Kysely<T>,
  tableNames: N[]
): Promise<void> => {
  // if SQLite, just delete all records
  if (db.getExecutor().adapter instanceof SqliteAdapter) {
    await Promise.all(
      tableNames.map((tableName) =>
        sql`DELETE FROM ${sql.table(tableName)};`.execute(db)
      )
    )

    return
  }

  // assume PostgreSQL, truncate all tables
  const tableNamesSql = sql.join(tableNames.map(sql.table), sql.raw(', '))

  await sql`TRUNCATE TABLE ${tableNamesSql} CASCADE;`.execute(db)
}

/**
 * Given a database instance and a table name, inserts records into that table.
 * @param db Kysely database instance
 * @param tableName Name of the table
 */
export const insertAll = <N extends keyof DB, T extends DatabaseTypes<N>>(
  db: Kysely<T>,
  tableName: N,
  records: Insertable<DB[N]> | Insertable<DB[N]>[]
) =>
  db
    .insertInto(tableName)
    .values(records as any)
    .returningAll()
    .execute()

/**
 * Given a database instance and a table name, selects all records from that table.
 * @param db Kysely database instance
 * @param tableName Name of the table
 */
export const selectAll = <N extends keyof DB, T extends DatabaseTypes<N>>(
  db: Kysely<T>,
  tableName: N,
  expression?: ExpressionOrFactory<DB, N, SqlBool>
) => {
  const query = db.selectFrom(tableName).selectAll()

  return expression
    ? // shortcut which works as long as there are no table aliases
      query.where(expression as any).execute()
    : query.execute()
}
