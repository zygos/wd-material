import { readFile } from 'fs/promises'
import { join } from 'path'
import {
  createPostgresDatabaseWithTables,
  createSqliteDatabaseWithTables,
  formPostgresOptions,
} from '../database'
import importCsv from './importCsv'

export default async function importSpreadsheet(
  databaseOptions: string | object,
  csvPath: string,
) {
  const database = await (typeof databaseOptions === 'string'
    ? createSqliteDatabaseWithTables(databaseOptions)
    : createPostgresDatabaseWithTables(
        formPostgresOptions(databaseOptions, process.env),
      ))

  const csv = await readFile(csvPath, 'utf-8')
  await importCsv(database, csv)
}

// if module was called directly
if (require.main === module) {
  const [, , databasePath, csvPath] = process.argv
  const pathRoot = join(__dirname, '../..')

  importSpreadsheet(
    databasePath ? join(pathRoot, databasePath) : {},
    join(pathRoot, csvPath),
  ).catch(error => {
    // eslint-disable-next-line no-console
    console.error(error)
    process.exit(1)
  })
}
