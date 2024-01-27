import { writeFile } from 'fs/promises'
import { join } from 'path'
import {
  createPostgresDatabase,
  createSqliteDatabase,
  formPostgresOptions,
} from '../database'
import generateCsv from './generateCsv'

export default async function exportSpreadsheet(
  databaseOptions: string | object,
  csvPath: string,
) {
  const database =
    typeof databaseOptions === 'string'
      ? createSqliteDatabase(databaseOptions, { readonly: true })
      : createPostgresDatabase(
          formPostgresOptions(databaseOptions, process.env),
        )

  const csv = await generateCsv(database)

  await writeFile(csvPath, csv)
}

// if module was called directly
if (require.main === module) {
  const [, , databasePath, csvPath] = process.argv
  const pathRoot = join(__dirname, '../..')

  exportSpreadsheet(
    databasePath ? join(pathRoot, databasePath) : {},
    join(pathRoot, csvPath),
  ).catch(error => {
    // eslint-disable-next-line no-console
    console.error(error)
    process.exit(1)
  })
}
