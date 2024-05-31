import http from 'node:http'
import { createTables } from './database/createTables.js'
import { getAllTodos, createTodo, setTodoAsDone, deleteTodo } from './todos.js'
import { getJsonBody, isTerminatedCrossOriginRequest } from './requests.js'

// ensure that database has all the necessary tables
await createTables()

const server = http.createServer(async (req, res) => {
  if (isTerminatedCrossOriginRequest(req, res)) return

  // Start the response by specifying that the content is JSON.
  res.setHeader('Content-Type', 'application/json')

  const { method, url } = req

  if (method === 'GET' && url === '/todos') {
    const todos = getAllTodos()
    const jsonString = JSON.stringify(todos)

    // status code 200 ("OK") is the default status code, so we don't need to set it,
    // but we will do it anyway to make it clear that we are returning a successful response.
    res.statusCode = 200
    res.end(jsonString)
    return
  }

  if (method === 'POST' && url === '/todos') {
    const todoBody = await getJsonBody(req)

    if (typeof todoBody.title !== 'string' || !todoBody.title.trim().length) {
      res.statusCode = 400 // Bad request
      res.end(JSON.stringify({ error: 'Title is required' }))
      return
    }

    const todo = createTodo(todoBody.title)
    const jsonString = JSON.stringify(todo)

    res.statusCode = 201 // Created
    res.end(jsonString)
    return
  }

  const todoDonePattern = /^\/todos\/([1-9]\d*)\/done$/
  if (method === 'PATCH' && doesMatch(todoDonePattern, url)) {
    const id = getMatchedId(todoDonePattern, url)
    const todoUpdated = setTodoAsDone(id)

    if (!todoUpdated) {
      res.statusCode = 404 // not found
      res.end(JSON.stringify({ error: 'Todo not found' }))
      return
    }

    const jsonString = JSON.stringify(todoUpdated)

    res.statusCode = 200
    res.end(jsonString)
    return
  }

  const todoDeletePattern = /^\/todos\/([1-9]\d*)$/
  if (method === 'DELETE' && doesMatch(todoDeletePattern, url)) {
    const id = getMatchedId(todoDeletePattern, url)
    const todoDeleted = deleteTodo(id)

    if (!todoDeleted) {
      res.statusCode = 404 // not found
      res.end(JSON.stringify({ error: 'Todo not found' }))
      return
    }

    const jsonString = JSON.stringify(todoDeleted)
    res.statusCode = 200
    res.end(jsonString)
    return
  }

  // if no URL matched, return a 404 (Not found) status code
  // and an error message in JSON format
  res.statusCode = 404
  res.end(JSON.stringify({ error: 'Not found' }))
})

server.listen(3000, () => {
  console.log('Server is running at http://localhost:3000/')
})

/**
 * Checks if the url matches a pattern.
 * @param {string} url
 * @returns {boolean}
 */
function doesMatch(pattern, url) {
  return pattern.test(url)
}

/**
 * Extracts the id from the ur using pattern with a single capturing group.
 * @param {RegExp} pattern
 * @param {string} url
 * @returns {number}
 */
function getMatchedId(pattern, url) {
  const match = url.match(pattern)

  if (!match) return null

  return Number(match[1])
}
