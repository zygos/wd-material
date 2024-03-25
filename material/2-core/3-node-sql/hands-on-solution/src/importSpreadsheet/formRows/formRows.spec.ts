import { expect, it } from 'vitest'
import formRows from '.'

const rowExported = {
  package_id: 1,
  package_description: 'Electronics',
  weight: 6,
  size: '20x20x8',
  size_unit: 'inch' as const,
  customer_id: 10,
  customer_name: 'Thomas Edison',
  driver_id: 1,
  driver_name: 'Ayrton Senna',
  license_number: '123456',
  pickup_address_id: 1,
  pickup_address_name: 'Thomas Edison',
  pickup_address_full: '123 Main St, Springfield, IL',
  delivery_address_id: 2,
  delivery_address_name: 'Nikola Tesla',
  delivery_address_full: '456 Oak St, Springfield, IL',
  pickup_at: new Date('2022-01-01T08:00:00Z'),
  delivered_at: new Date('2022-01-03T15:00:00Z'),
  invoice_id: 1,
  invoice_serial_number: '0001',
  invoice_amount: 10,
  currency: 'USD',
  invoiced_at: new Date('2022-01-01 08:00:00'),
  paid_at: new Date('2022-01-04 08:00:00'),
}

it('should form records out of a parsed object', () => {
  const records = formRows([rowExported])

  expect(records).toEqual({
    // we do not particularly care about the order of the records,
    // so we use a matcher to check if the array contains the expected records.
    address: expect.arrayContaining([
      {
        id: 1,
        name: 'Thomas Edison',
        address_full: '123 Main St, Springfield, IL',
        customer_id: 10,
      },
      {
        id: 2,
        name: 'Nikola Tesla',
        address_full: '456 Oak St, Springfield, IL',
        customer_id: 10,
      },
    ]),

    customer: [
      {
        id: 10,
        name: 'Thomas Edison',
      },
    ],

    driver: [
      {
        id: 1,
        name: 'Ayrton Senna',
        license_number: '123456',
      },
    ],

    invoice: [
      {
        id: 1,
        serial_number: '0001',
        amount: 10,
        currency: 'USD',
        invoiced_at: new Date('2022-01-01 08:00:00'),
        paid_at: new Date('2022-01-04 08:00:00'),
      },
    ],

    package: [
      {
        id: 1,
        customer_id: 10,
        driver_id: 1,
        invoice_id: 1,
        pickup_address_id: 1,
        delivery_address_id: 2,
        description: 'Electronics',
        weight: 6,
        height: 8,
        length: 20,
        width: 20,
        size_unit: 'inch',
        pickup_at: new Date('2022-01-01T08:00:00Z'),
        delivered_at: new Date('2022-01-03T15:00:00Z'),
      },
    ],
  })
})

it('should ignore duplicate records', () => {
  const rowsExported = [rowExported, rowExported, rowExported]
  const tablesRows = formRows(rowsExported)

  expect(tablesRows.address).toHaveLength(2)
  expect(tablesRows.customer).toHaveLength(1)
  expect(tablesRows.driver).toHaveLength(1)
  expect(tablesRows.package).toHaveLength(1)
  expect(tablesRows.invoice).toHaveLength(1)
})

it('should ignore records with null ids', () => {
  const rowsExported = [
    {
      ...rowExported,
      driver_id: null,
      pickup_address_id: null,
      delivery_address_id: null,
      invoice_id: null,
    },
  ]
  const tablesRows = formRows(rowsExported)

  expect(tablesRows.address).toHaveLength(0)
  expect(tablesRows.customer).toHaveLength(1)
  expect(tablesRows.driver).toHaveLength(0)
  expect(tablesRows.package).toHaveLength(1)
  expect(tablesRows.invoice).toHaveLength(0)
})

it('preserves the last record when there are duplicates', () => {
  const rowsExported = [
    rowExported,
    {
      ...rowExported,
      // same driver_id, different driver_name
      driver_name: 'Michael Schumacher',
    },
  ]
  const tablesRows = formRows(rowsExported)
  const driver = tablesRows.driver[0]

  expect(driver).toHaveProperty('name')
  expect(driver.name).toBe('Michael Schumacher')
})
