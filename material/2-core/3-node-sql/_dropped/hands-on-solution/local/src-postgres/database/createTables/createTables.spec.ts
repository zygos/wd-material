import { expect, it } from 'vitest'
import { createTestDatabaseWithTables } from '..'

const database = await createTestDatabaseWithTables()

it('should create multiple tables', async () => {
  const tableNames = (await database.getTables()).map(({ name }) => name)

  expect(tableNames).toEqual([
    'address',
    'customer',
    'driver',
    'invoice',
    'package',
  ])
})
