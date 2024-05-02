import http from 'node:http'
import { getDeliveries, setAsDelivered } from './deliveries.js'
import { createTables } from './database/createTables.js'
import { seedData } from './database/seedData.js'

// ensure that database has all the necessary tables
await createTables()

// TODO: add some initial data to the database
await seedData()

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' })

  const { method, url } = req

  // if user makes request to /deliveries
  if (method === 'GET' && url === '/deliveries') {
    // TODO: get all deliveries with their joined customer and address data

    // some dummy response for now
    const deliveries = getDeliveries()
    const json = JSON.stringify(deliveries)

    res.end(json)
    return
  }

  // if user makes a request to /deliveries/:id/delivered
  // TODO: make it work with all possible integer IDs, not just number 1!
  if (method === 'GET' && url === '/deliveries/1/delivered') {
    // TODO: set delivered_at to current date and time for the delivery with the given number ID
    // TODO: return { success: true } if delivery was found and updated
    // TODO: return { success: false } if delivery was not found
    const hasUpdated = setAsDelivered()

    // some dummy response for now
    const result = { success: hasUpdated }
    const json = JSON.stringify(result)

    res.end(json)
    return
  }

  // if no route matched
  res.statusCode = 404 // HTTP status code - "Not found"
  res.end('{"error":"Not found"}')
})

server.listen(3000, () => {
  console.log('Server is running at http://localhost:3000/')
  console.log('View deliveries by visiting http://localhost:3000/deliveries')
  console.log('Set as delivered by visiting http://localhost:3000/deliveries/1/delivered')
})
