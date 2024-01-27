import { expect, it } from 'vitest'
import { createTestDatabaseWithTables } from '../../database'
import syncTables from '.'
import { Address } from '../../schemas/address'

const addressJohn = {
  id: 1,
  name: 'John Doe',
  address_full: '123 Main St',
  customer_id: 15,
}

const addressJane = {
  id: 2,
  name: 'Jane Doe',
  address_full: '456 Main St',
  customer_id: 15,
}

const driverMichael = {
  id: 1,
  name: 'Michael',
  license_number: '123',
}

it('should save a given list of addresses to a database', async () => {
  const db = await createTestDatabaseWithTables()
  const rowsByTable = {
    address: [addressJohn, addressJane],
  }

  syncTables(db, rowsByTable)

  const addresses = db
    .prepare('SELECT * FROM address ORDER BY id ASC')
    .all() as Address[]
  expect(addresses).toHaveLength(2)
  expect(addresses[0].address_full).toBe('123 Main St')
  expect(addresses[1].address_full).toBe('456 Main St')
})

it('should overwrite existing addresses', async () => {
  const db = await createTestDatabaseWithTables()
  const rowsByTable = {
    address: [addressJohn, addressJane],
  }

  syncTables(db, rowsByTable)

  const rowsByTable2 = {
    address: [
      {
        ...addressJane,
        address_full: '321 Main St',
      },
    ],
  }

  syncTables(db, rowsByTable2)

  const addresses = db
    .prepare('SELECT * FROM address ORDER BY id ASC')
    .all() as Address[]

  expect(addresses).toHaveLength(2)
  expect(addresses[0].address_full).toBe('123 Main St')
  expect(addresses[1].address_full).toBe('321 Main St')
})

it('should sync multiple tables', async () => {
  const db = await createTestDatabaseWithTables()
  const rowsByTable = {
    address: [addressJohn, addressJane],
    driver: [driverMichael],
  }

  syncTables(db, rowsByTable)

  const addresses = db.prepare('SELECT * FROM address').all()
  expect(addresses).toHaveLength(2)

  const drivers = db.prepare('SELECT * FROM driver').all()
  expect(drivers).toHaveLength(1)
})

it('should handle mixed object key order', async () => {
  const db = await createTestDatabaseWithTables()
  const addressJaneMixed = Object.freeze({
    name: 'Jane Doe',
    id: 3,
    customer_id: 14,
    address_full: '987 Main St',
  })

  const rowsByTable = {
    address: [addressJohn, addressJaneMixed],
  }

  syncTables(db, rowsByTable)

  const addresses = db.prepare('SELECT * FROM address').all() as Address[]
  expect(addresses[0]).toMatchObject(addressJohn)
  expect(addresses[1]).toMatchObject(addressJaneMixed)
})
