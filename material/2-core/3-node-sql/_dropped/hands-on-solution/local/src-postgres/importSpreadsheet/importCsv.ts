import { type Database } from '../database'
import formRows from './formRows'
import parseFile from './parseFile'
import syncTables from './syncTables'

export default async (database: Database, csvContent: string) => {
  // form rows from CSV content
  const parsed = await parseFile(csvContent)
  const wanted = formRows(parsed)

  // insert new data
  await syncTables(database, wanted)
}
