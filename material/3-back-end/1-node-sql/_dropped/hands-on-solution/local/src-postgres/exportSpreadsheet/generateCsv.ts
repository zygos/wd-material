import { json2csv } from 'json-2-csv'
import { type Database } from '../database'
import { exportColumnOrder } from '../schemas/spreadsheet'
import queryDatabase from './queryDatabase'

export default async (database: Database): Promise<string> => {
  const rows = await queryDatabase(database)
  const rowsOrdered = rows.map(row =>
    Object.fromEntries(
      exportColumnOrder.map(column => [
        column,
        formatValue(column, row[column]),
      ]),
    ),
  )

  return json2csv(rowsOrdered, { emptyFieldValue: '' })
}

function formatValue(key: string, value: unknown) {
  if (value === null) {
    return ''
  }

  // to preserve non-ISO 8601 date formats in the spreadsheet
  // that are provided by applications such as Excel.
  // 2022-01-09T16:00:00.000Z -> 2022-01-09 16:00
  if (
    typeof value === 'string' &&
    value.length === 24 &&
    value.endsWith('Z') &&
    key.endsWith('_at')
  ) {
    return value.slice(0, 16).replace('T', ' ')
  }

  return value
}
