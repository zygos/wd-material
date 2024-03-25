import { readFile } from 'fs/promises'
import { join } from 'path'
import { createSqliteDatabaseWithTables } from '../database'
import importCsv from './importCsv'

export default async function importSpreadsheet(
  databasePath: string,
  csvPath: string,
) {
  const database = await createSqliteDatabaseWithTables(databasePath)
  const csv = await readFile(csvPath, 'utf-8')

  await importCsv(database, csv)
}

// if module was called directly
if (require.main === module) {
  const [, , databasePath, csvPath] = process.argv
  const pathRoot = join(__dirname, '../..')

  if (!databasePath || !csvPath) {
    throw new Error('Usage: importSpreadsheet <databasePath> <csvPath>')
  }

  importSpreadsheet(
    join(pathRoot, databasePath),
    join(pathRoot, csvPath),
  )
}
