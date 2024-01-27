import { type Database } from '../database'
import formRows from './formRows'
import parseCsv from './parseCsv'
import syncTables from './syncTables'
import { spreadsheetSchema } from '../schemas/spreadsheet'

export default async (database: Database, csvContent: string) => {
  // form rows from CSV content
  const parsed = await parseCsv(spreadsheetSchema, csvContent)
  const wanted = formRows(parsed)

  // insert new data
  syncTables(database, wanted)
}
