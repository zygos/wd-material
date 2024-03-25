import { type Database } from '../../database'
import formParameters from './formParameters'

type Row = Record<string, unknown>
type TablesRows = Record<string, Row[]>

export default async (database: Database, tablesRows: TablesRows) => {
  await Promise.all(
    Object.entries(tablesRows).map(([table, rows]) =>
      insertAll(database, table, rows),
    ),
  )
}

async function insertAll(database: Database, table: string, rows: Row[]) {
  if (!rows.length) return

  const columns = Object.keys(rows[0])
  const values = formValues(columns, rows)
  const parameters = formParameters(database.parametersType, values)
  const columnsJoined = columns.join(', ')
  const onConflict = columns
    .filter(column => column !== 'id')
    .map(column => `${column} = excluded.${column}`)
    .join(', ')

  await database.run(
    `INSERT INTO ${table} (${columnsJoined})
      VALUES ${parameters}
      ON CONFLICT (id) DO UPDATE SET ${onConflict}`,
    values.flat(),
  )
}

function formValues(columns: string[], rows: Record<string, unknown>[]) {
  return rows.map(record =>
    columns.map(key => {
      const value = record[key]

      if (value instanceof Date) {
        return value.toISOString()
      }

      return value
    }),
  )
}
