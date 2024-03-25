import { expect, it } from 'vitest'
import parseFile from '.'

const head = [
  'package_id',
  'package_description',
  'weight',
  'size',
  'size_unit',
  'customer_id',
  'customer_name',
  'driver_id',
  'driver_name',
  'license_number',
  'pickup_address_id',
  'pickup_address_name',
  'pickup_address_full',
  'delivery_address_id',
  'delivery_address_name',
  'delivery_address_full',
  'pickup_at',
  'delivered_at',
  'invoice_id',
  'invoice_serial_number',
  'invoice_amount',
  'currency',
  'invoiced_at',
  'paid_at',
].join(',')

it('parses a given CSV file into an array of objects', async () => {
  const file = `${head}
1,"Electronics",6,"20x20x8","inch","10","Thomas Edison","1","Ayrton Senna","123456","1","Thomas Edison","123 Main St, Springfield, IL","2","Nikola Tesla","456 Oak St, Springfield, IL","2022-01-01 08:00:00","2022-01-03 15:00:00","1","0001","10","USD","2022-01-01 08:00:00","2022-01-04 08:00:00"`
  const parsed = await parseFile(file)

  expect(parsed).toEqual([
    {
      package_id: 1,
      package_description: 'Electronics',
      weight: 6,
      size: '20x20x8',
      size_unit: 'inch',
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
      invoiced_at: new Date('2022-01-01T08:00:00Z'),
      paid_at: new Date('2022-01-04T08:00:00Z'),
    },
  ])
})

it('parses non-shipped package', async () => {
  const file = `${head}
1,"Electronics",6,"20x20x8","inch","10","Thomas Edison",,,,,,,,,,,,,,,,,`
  const parsed = await parseFile(file)

  expect(parsed).toEqual([
    {
      package_id: 1,
      package_description: 'Electronics',
      weight: 6,
      size: '20x20x8',
      size_unit: 'inch',
      customer_id: 10,
      customer_name: 'Thomas Edison',
      driver_id: null,
      driver_name: null,
      license_number: null,
      pickup_address_id: null,
      pickup_address_name: null,
      pickup_address_full: null,
      delivery_address_id: null,
      delivery_address_name: null,
      delivery_address_full: null,
      pickup_at: null,
      delivered_at: null,
      invoice_id: null,
      invoice_serial_number: null,
      invoice_amount: null,
      currency: null,
      invoiced_at: null,
      paid_at: null,
    },
  ])
})
