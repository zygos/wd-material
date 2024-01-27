import { join } from 'node:path'
import { readFile } from 'fs/promises'
import { type Database } from '..'

export default async (database: Database): Promise<Database> => {
  const sqlFile = await readFile(
    join(__dirname, './create-tables.sql'),
    'utf-8',
  )

  const statements = sqlFile
    .replace(/--.*\n/g, '') // remove comments
    .split(';\n') // split statements
    .map(statement => statement.trim())
    .filter(Boolean) // remove empty statements

  // run statements one by one
  await statements
    .map(statement => () => database.run(statement))
    .reduce(async (previous, task) => {
      await previous
      await task()
    }, Promise.resolve())

  return database
}
