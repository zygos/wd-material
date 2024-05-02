import http from 'node:http'
import { getDeliveries, setAsDelivered } from './deliveries.js'
import { createTables } from './database/createTables.js'
import { seedData } from './database/seedData.js'

// ensure that database has all the necessary tables
await createTables()

// add some initial data to the database
await seedData()

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' })

  const { method, url } = req

  if (method === 'GET' && url === '/deliveries') {
    const deliveries = getDeliveries()
    const jsonString = JSON.stringify(deliveries)

    res.statusCode = 200 // OK
    res.end(jsonString)
    return
  }

  // setting a delivery as delivered
  if (method === 'GET' && isDeliveredUrl(url)) {
    const deliveryId = getFirstInteger(url)
    const didSuccessfullyUpdate = setAsDelivered(deliveryId)
    const jsonString = JSON.stringify({
      success: didSuccessfullyUpdate,
    })

    res.statusCode = 200 // OK
    res.end(jsonString)
    return
  }

  // if no route matched
  res.statusCode = 404 // Not found
  res.end('{"error":"Not found"}')
})

server.listen(3000, () => {
  console.log('Server is running at http://localhost:3000/')
  console.log('View deliveries by visiting http://localhost:3000/deliveries')
  console.log('Set as delivered by visiting http://localhost:3000/deliveries/1/delivered')
})

/**
 * Checks if the url is for setting a delivery as delivered.
 * @param {string} url
 * @returns {boolean}
 */
function isDeliveredUrl(url) {
  const deliveriesPattern = /^\/deliveries\/\d+\/delivered$/

  // matches pattern AND has a valid integer for the delivery ID
  return deliveriesPattern.test(url) && getFirstInteger(url) !== null
}

/**
 * Extracts the first integer in the URL.
 * @param {string} url
 * @returns {number}
 */
function getFirstInteger(url) {
  const parts = url.split('/')

  // find the first URL part that is an integer
  // /deliveries/1/delivered -> 1
  const firstInteger = parts.find(
    part => part && Number.isInteger(Number(part)),
  )

  if (!firstInteger) {
    return null
  }

  const integer = Number(firstInteger)

  // ignore non-positive integers
  if (integer <= 0) {
    return null
  }

  return integer
}
