import { type Spreadsheet } from '../../schemas/spreadsheet'
import uniqById from './uniqById'

export default (parsed: Spreadsheet[]) => {
  const addresses = parsed.flatMap(record => [
    {
      id: record.pickup_address_id,
      name: record.pickup_address_name,
      address_full: record.pickup_address_full,
      customer_id: record.customer_id,
    },
    {
      id: record.delivery_address_id,
      name: record.delivery_address_name,
      address_full: record.delivery_address_full,
      customer_id: record.customer_id,
    },
  ])

  const customers = parsed.map(record => ({
    id: record.customer_id,
    name: record.customer_name,
  }))

  const drivers = parsed.map(record => ({
    id: record.driver_id,
    name: record.driver_name,
    license_number: record.license_number,
  }))

  const packages = parsed.map(record => {
    const [length, width, height] = record.size.split('x').map(Number)

    return {
      id: record.package_id || null,
      customer_id: record.customer_id || null,
      driver_id: record.driver_id || null,
      description: record.package_description,
      invoice_id: record.invoice_id || null,
      pickup_address_id: record.pickup_address_id || null,
      delivery_address_id: record.delivery_address_id || null,
      weight: record.weight,
      height,
      width,
      length,
      size_unit: record.size_unit,
      pickup_at: record.pickup_at,
      delivered_at: record.delivered_at,
    }
  })

  const invoices = parsed.map(record => ({
    id: record.invoice_id,
    amount: record.invoice_amount,
    currency: record.currency,
    serial_number: record.invoice_serial_number,
    invoiced_at: record.invoiced_at,
    paid_at: record.paid_at,
  }))

  return {
    address: uniqById(addresses),
    customer: uniqById(customers),
    driver: uniqById(drivers),
    invoice: uniqById(invoices),
    package: uniqById(packages),
  }
}
