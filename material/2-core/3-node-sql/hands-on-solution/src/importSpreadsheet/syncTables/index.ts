import { type Database } from '../../database'
import formParameters from './formParameters'

type Row = Record<string, unknown>
type RowsByTable = Record<string, Row[]>

export default (database: Database, rowsByTable: RowsByTable) => {
  Object.entries(rowsByTable).forEach(([table, rows]) => {
    insertAll(database, table, rows)
  })
}

function insertAll(database: Database, table: string, rows: Row[]) {
  if (!rows.length) return

  const columns = Object.keys(rows[0])
  const values = formValues(columns, rows)
  const parameters = formParameters(values)
  const columnsJoined = columns.join(', ')
  const onConflict = columns
    .filter(column => column !== 'id')
    .map(column => `${column} = excluded.${column}`)
    .join(', ')

  database
    .prepare(
      `INSERT INTO ${table} (${columnsJoined})
      VALUES ${parameters}
      ON CONFLICT (id) DO UPDATE SET ${onConflict}`,
    )
    .run(values.flat())
}

function formValues(columns: string[], rows: Record<string, unknown>[]) {
  return rows.map(record =>
    columns.map(key => {
      const value = record[key]

      if (value instanceof Date) {
        return value.toISOString()
      }

      if (!isPrimitive(value)) {
        return String(value)
      }

      return value
    }),
  )
}

function isPrimitive(
  value: unknown,
): value is string | number | boolean | null {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    typeof value === 'boolean' ||
    value === null
  )
}
