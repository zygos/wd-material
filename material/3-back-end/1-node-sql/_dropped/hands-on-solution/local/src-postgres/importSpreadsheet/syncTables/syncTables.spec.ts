import { expect, it } from 'vitest'
import { createTestDatabaseWithTables } from '../../database'
import syncTables from '.'
import { Address } from '../../schemas/address'

const john = {
  id: 1,
  name: 'John Doe',
  address_full: '123 Main St',
  customer_id: 15,
}

const jane = {
  id: 2,
  name: 'Jane Doe',
  address_full: '123 Main St',
  customer_id: 15,
}

const driverMichael = {
  id: 1,
  name: 'Michael',
  license_number: '123',
}

it('should save a given list of addresses to a database', async () => {
  const db = await createTestDatabaseWithTables()
  const tablesRows = {
    address: [john, jane],
  }

  await syncTables(db, tablesRows)

  const addresses = await db.queryAll('SELECT * FROM address')
  expect(addresses).toHaveLength(2)
})

it('should overwrite existing addresses', async () => {
  const db = await createTestDatabaseWithTables()
  const tablesRows = {
    address: [john, jane],
  }

  await syncTables(db, tablesRows)

  const tablesRows2 = {
    address: [
      {
        ...jane,
        address_full: '321 Main St',
      },
    ],
  }

  await syncTables(db, tablesRows2)

  const addresses = await db.queryAll<Address>(
    'SELECT * FROM address ORDER BY id ASC',
  )
  expect(addresses).toHaveLength(2)
  expect(addresses[0].address_full).toBe('123 Main St')
  expect(addresses[1].address_full).toBe('321 Main St')
})

it('should sync multiple tables', async () => {
  const db = await createTestDatabaseWithTables()
  const tablesRows = {
    address: [john, jane],
    driver: [driverMichael],
  }

  await syncTables(db, tablesRows)

  const addresses = await db.queryAll('SELECT * FROM address')
  expect(addresses).toHaveLength(2)

  const drivers = await db.queryAll('SELECT * FROM driver')
  expect(drivers).toHaveLength(1)
})
