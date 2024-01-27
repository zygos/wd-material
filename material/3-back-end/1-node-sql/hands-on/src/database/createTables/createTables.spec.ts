import { expect, it } from 'vitest'
import { Table, createTestDatabaseWithTables } from '..'

const database = await createTestDatabaseWithTables()

it('should create multiple tables', async () => {
  const tables = database
    .prepare(`SELECT name FROM sqlite_schema WHERE type='table' ORDER BY name;`)
    .all() as Table[]

  const tableNames = tables.map(table => table.name)

  expect(tableNames).toEqual([
    'address',
    'customer',
    'driver',
    'invoice',
    'package',
  ])
})
