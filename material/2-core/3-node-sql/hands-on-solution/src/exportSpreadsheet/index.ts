import { writeFile } from 'fs/promises'
import { join } from 'path'
import { createSqliteDatabase } from '../database'
import generateCsv from './generateCsv'

export default async function exportSpreadsheet(
  databasePath: string,
  csvPath: string,
) {
  const database = createSqliteDatabase(databasePath, { readonly: true })
  const csv = await generateCsv(database)

  await writeFile(csvPath, csv)
}

// if module was called directly
if (require.main === module) {
  const [, , databasePath, csvPath] = process.argv
  const pathRoot = join(__dirname, '../..')

  if (!databasePath || !csvPath) {
    throw new Error('Usage: exportSpreadsheet <databasePath> <csvPath>')
  }

  exportSpreadsheet(
    join(pathRoot, databasePath),
    join(pathRoot, csvPath),
  )
}
