import { type Database } from '../database'
import formRows from './formRows'
import parseCsv from './parseCsv'
import syncTables from './syncTables'
import { spreadsheetSchema } from '../schemas/spreadsheet'

export default async (database: Database, csvContent: string) => {
  // form rows using CSV
  const parsed = await parseCsv(spreadsheetSchema, csvContent)
  const wanted = formRows(parsed)

  // insert new data
  syncTables(database, wanted)
}
