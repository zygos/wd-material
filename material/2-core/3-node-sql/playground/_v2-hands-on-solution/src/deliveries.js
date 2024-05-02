import { database } from './database/database.js'

export function getDeliveries() {
  // join with customer and address tables
  const statement = database.prepare(`
    SELECT
      delivery.id,
      customer.name as customer_name,
      pickup_address.name as pickup_address_name,
      pickup_address.address_full as pickup_address_full,
      destination_address.name as destination_address_name,
      destination_address.address_full as destination_address_full,
      delivery.weight,
      delivery.pickup_at,
      delivery.delivered_at
    FROM delivery
    JOIN customer ON delivery.customer_id = customer.id
    JOIN address as pickup_address ON delivery.pickup_address_id = pickup_address.id
    JOIN address as destination_address ON delivery.destination_address_id = destination_address.id
  `)
  const deliveries = statement.all()

  return deliveries
}

export function setAsDelivered(id) {
  const statement = database.prepare(
    'UPDATE delivery SET delivered_at = ? WHERE id = ?',
  )
  const info = statement.run(new Date().toISOString(), id)

  return info.changes === 1
}
