## Recommended Step-by-Step Approach

1. Read the `README.md` and start the front-end and back-end servers.
2. Open the front-end application in your browser and try to interact with it. It should only work partially.
3. Familiarize yourself with the existing back-end code and the provided database schema.
4. Write the SQL required for the `GET /todos` endpoint. It should return all todos from the database.
5. Write the `POST /todos` endpoint. It should insert a new todo into the database.
6. Write the `PATCH /todos/:id/done` endpoint. It should set a todo's `is_done` field to `true` (or `1` in SQLite).
7. Write the `DELETE /todos/:id` endpoint. It should delete a todo with a given ID.
8. Look for areas that could be improved or refactored.

## Step 1 & 2. Setup

**Front-end server serving HTML, JS, and CSS files**

1. Start the front-end server with the VS Code Live Server extension (recommended) or another method.

**Back-end server serving as the interface to the database**

1. Run `npm install` to install the required dependencies for the back end.
2. Start the back-end server with `node server/index.js`.

## Step 3. Familiarize Yourself with the Existing Code

### Files

- `data/database.db` - SQLite database file created once you start the server
- `public` - front-end files sent directly to the browser
- `server/index.js` - back-end server file that starts the server and responds to requests to manage TODOs
- `server/requests.js` - some utility functions covering some tricky areas that go beyond what is necessary at this point
- `server/todos.js` - the file containing functions to manage TODOs in the database
- `server/database` - folder containing the database setup and table schema (`tables.sql`)

### Flow

Our front-end server (VS Code's Live Server) sends the HTML, JS, and CSS files that are run in the browser. The front end is responsible for displaying the TODOs and providing user-friendly ways to interact with them.

The back-end server is responsible for managing the TODOs in the database. It listens for requests from the front end and responds with the appropriate data.

Everything can be modeled as a request-response cycle:

1. The visitor goes to `http://127.0.0.1:3001` in the browser, which tells the browser to send a request to a computer with the address `127.0.0.1` on port `3001`.
2. By specification, `127.0.0.1` is your computer's address. The browser sends a request to port, `3001,` on your computer. A port is like a door to a room in a building. The building has many rooms, and each room has a door (port) that can be opened to accept visitors (requests). If you have started the front-end server with the VS Code Live Server extension, the port `3001` is open and bound to the VS Code Live Server extension. This extension has its Node server that reads the files in the `public` folder (as configured by the `.vscode/settings.json` file) and responds to requests for those files. By convention, `index.html` is the default file served when visiting the homepage.
3. `index.html` reaches the browser. It contains references to `styles.css` and `app.js`, which the browser also fetches in the same way as `index.html`.
4. The browser executes the code in `app.js`. It contains a `fetch` request to `http://localhost:3000/todos`. The `localhost` is also a special address pointing to your computer.
5. If we start our back-end server with `node server/index.js`, it will listen to port `3000` requests. Node allows handling requests and forming responses by running a function when a request comes in.

Let's look at the `server/index.js`:

```js
// req = request, res = response
const server = http.createServer(async (req, res) => {
  // ... what to do when a request comes in
})

server.listen(3000, () => {
  console.log('Server is running at http://localhost:3000/')
})
```

- `req` is the request object that contains information about the incoming request. It has various properties like `req.url` and `req.method`. For example, if the front end sends a `GET` request to `localhost:3000/todos`, `req.url` will be `/todos` and `req.method` will be `GET`.
- `res` is an object that exposes various methods to form a response. For example, `res.end('Hello, world!')` will send the string `Hello, world!` as a response to the client.

Our job here is to distinguish between different requests and respond appropriately with the data that the front end expects.

## Step 4. Write the SQL required for the `GET /todos` endpoint.

Let's look at the `GET /todos` request.

The front end has a function `fetchTodos`, which runs when the page is loaded:

```js
const SERVER_URL = 'http://localhost:3000'

// Fetch existing todos when the page loads
window.addEventListener('DOMContentLoaded', async () => {
  const todos = await fetchTodos()
  // ...
})

async function fetchTodos() {
  const response = await fetch(`${SERVER_URL}/todos`)

  return response.json()
}
```

By default, the `fetch` function sends a `GET` request. This goes through the same request-response cycle as described previously. The request hits our function in the back-end server. We could simply send back an empty array `[]` as a response.

```js
const server = http.createServer(async (req, res) => {
  const todos = getAllTodos() // Array []
  const jsonString = JSON.stringify(todos) // String '[]'

  res.end(jsonString) // respond with String '[]'.
  return
})
```

1. We get all the todos from the database.
2. We convert the array of todos to a JSON string in the format that the front end expects. It does not have to be JSON; it simply needs to match the format that the front end expects. By convention, JSON is used for this purpose in most cases.
3. We call the method that sends the JSON string as a response.
4. We `return` to stop the function execution. Otherwise, we might have some unexpected behavior.

Let's look at the `getAllTodos` function that comes from `server/todos.js`:

```js
export function getAllTodos() {
  // TODO: use a database query to get all todos
  return []
}
```

It's a placeholder function that returns an empty array. Let's replace it with a function that queries the database and returns all the todos. It should run the following SQL query:

```sql
-- In the tables.sql we find that the table is called `todos`
SELECT * FROM todos;
```

We need to figure out how to query the database in this project to run this query. Since we have already inspected the existing files, we know that the database is configured by `database/database.js` file:

```js
// We use a package called `better-sqlite3` to interact with the SQLite database.
import sqlite from 'better-sqlite3'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

// Path to the database file
const databaseUrl = join(fileURLToPath(import.meta.url), '../../../data/database.db')

export const database = new Database(databaseUrl)
```

This file exports a database object. If we look up the documentation for `better-sqlite3` (Google "better-sqlite3 documentation"), we can find a few examples of how to query the database.

```js
// using .run()
const stmt = db.prepare('INSERT INTO cats (name, age) VALUES (?, ?)');
const info = stmt.run('Joey', 2);

console.log(info.changes); // => 1

// using .get()
const stmt = db.prepare('SELECT age FROM cats WHERE name = ?');
const cat = stmt.get('Joey');

console.log(cat.age); // => 2

// using .all()
const stmt = db.prepare('SELECT * FROM cats WHERE name = ?');
const cats = stmt.all('Joey');

console.log(cats.length); // => 1
```

To get a list of all todos, it seems we should use the `.all()` method:

```js
export function getAllTodos() {
  // An even better approach would be to specify the columns we want to get
  // to avoid potential issues with the database schema changes. We will
  // keep it simple for now.
  const statement = database.prepare('SELECT * FROM todos')
  const todos = statement.all()

  return todos
}
```

If we update the `getAllTodos` function in `server/todos.js` and restart the back-end server, we should still see an empty array in the front end. This is because we have not yet inserted any todos into the database.

Let's add a few todos to the database:

```sh
sqlite3 data/database.db
```

```sql
INSERT INTO todos (title, is_done) VALUES ('Finish exercise', FALSE);
```

Refresh the front end, and you should see the todo you inserted!

Now we know the browser can get the todos from the database using the back-end server. Let's move on to the next step.

## Step 5. Write the `POST /todos` endpoint.

We have already written the SQL query for inserting a new todo:

```sql
INSERT INTO todos (title, is_done) VALUES ('Finish exercise', FALSE);
```

Now it's time to make this query dynamic and insert the todo that the front end sends to the back end. In requirements, we see that we need to add a `POST /todos` handler:

- POST `/todos` - creates a new todo

The front end will send a `POST` request to `http://localhost:3000/todos` with a JSON body containing the new todo. The back end should parse this JSON body and insert the new todo into the database. Let's look in the front-end code to see how the new todo is sent (`ctrl+f` for `POST`):

```js
const response = await fetch(`${SERVER_URL}/todos`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ title }),
})
```

This is a bit more complex than the `GET` request. It sends a `body` - a JSON string containing the `title` of the new todo. The `Content-Type` header informs the back end that this is a JSON string. While not including this header would not break the request, it is a good practice to include it. Sometimes, we might want to send other types of data.

Let's look at the back-end code in `server/index.js`:

```js
if (method === 'POST' && url === '/todos') {
  const todoBody = await getJsonBody(req)

  // TODO: finish handling POST /todos
}
```

### Advanced section on getJsonBody function

This is a bit more complex in terms of how to handle the request body. You do not need to understand this to complete the exercise. You can skip to the next section if you want to.

The `getJsonBody` function is a utility function that reads the body of the request and parses it as JSON. It is defined in `server/requests.js`. It is a bit tricky, so we will guide you through it. At this point, it is not necessary to understand how it works, as frameworks usually handle this for you. Given that this exercise deals with HTTP requests at a lower level, we need to handle this ourselves.

When a `POST`, `PATCH`, or `PUT` request is sent, we can add some data to the request. This is called the **request body**. The body can contain any data - even files. This is how file uploads work. In our case, we are sending a JSON string with the title of the new todo. So our request body might be something like this:

```json
{"title":"Finish exercise"}
```

Sometimes, this body can be pretty large. It can be split into smaller parts called **chunks** which are sent one by one. The server is then responsible for reassembling these chunks into the full body. This is what the `getJsonBody` function does. It listens for these chunks and assembles them into a single string. When the last chunk is received, it tries to parse the string as JSON. If it fails, it throws an error. If it succeeds, it returns the parsed JSON object.

```js
// essentially, the browser sends the body in chunks:
chunk1 = '{"title":'
chunk2 = '"Finish e'
chunk3 = 'xercise"}'

// then, the back-end server combines the chunks:
body = chunk1 + chunk2 + chunk3

// and parses JSON to get an object it can work with:
parsed = JSON.parse(body)
// { title: 'Finish exercise' }
```

**Note.** In practice, these chunks are usually much larger, usually around a few kilobytes, so our tiny JSON string would be sent in one chunk. However, the `getJsonBody` function is designed to handle a larger body.

Our request provides a stream of data that emits events, such as `data` on each chunk and `end` when the stream is finished. We can listen for these events and assemble the body. This is what the `getJsonBody` function does:

```js
export function getJsonBody(req) {
  let body = ''

  req.on('data', (chunk) => {
    body += chunk
  })

  req.on('end', () => {
    const parsed = JSON.parse(body)
    // how can we return this value?
  })
}
```

The problem is that we cannot return the `parsed` value from the `getJsonBody` function. We do not know what is being sent when this function runs. We only provide instructions on how to handle the data when it arrives. Instead of returning a value, we can only promise that we will return the value at some point in the future (once all chunks have been transferred). This is done by returning a `Promise`:

```js
export function getJsonBody(req) {
  return new Promise((resolve, reject) => {
    let body = ''

    req.on('data', (chunk) => {
      body += chunk
    })

    req.on('end', () => {
      try {
        const parsed = JSON.parse(body)
        resolve(parsed)
      } catch (error) {
        reject(error)
      }
    })
  })
}
```

OK, **let's return to the `POST /todos` endpoint**.

### Creating a new todo in the database

Since the `getJsonBody` function calls `JSON.parse`, we should have a JS object with the `title` property, just like it was sent from the front end:

```js
//front-end code, which runs in the browser
// const title = todoInput.value.trim()
const title = 'Some task'

const response = await fetch(`${SERVER_URL}/todos`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ title }), // the body we send
})
```

```js
//back-end code, which runs on the Node server
// the body we get in the back end, after JSON.parse in getJsonBody
const todoBody = { title: 'Some task' }
```

Now, we can think about inserting this todo into the database. We can follow the same general structure as we did for the `GET /todos` endpoint:

```js
if (method === 'POST' && url === '/todos') {
  // { title: 'Some task' }
  const todoBody = await getJsonBody(req)

  // Insert the todo into the database
  const todo = createTodo(todoBody.title)

  // We will send back a stringified todo
  const jsonString = JSON.stringify(todo)

  res.end(jsonString)
  return
}
```

Let's add a `createTodo` function to `server/todos.js`, which will insert the todo into the database and return the created todo:

```js
export function createTodo(title) {
  const statement = database.prepare(
    'INSERT INTO todos (title, is_done) VALUES (?, ?)'
  )

  // SQLite does not have a boolean type, so we use 0 for false and 1 for true
  const isDone = 0
  const result = statement.run(title, isDone)
  const id = result.lastInsertRowid

  return {
    id,
    title,
    is_done: isDone,
  }
}
```

This simple function inserts a new todo into the database and returns the created todo. There are other ways to do it. We could also perform a `SELECT` statement after the `INSERT` to get the created todo. Another way to implement this is to use the SQLite's `RETURNING` clause in the `INSERT` statement:

```js
export function createTodo(title) {
  const statement = database.prepare(
    'INSERT INTO todos (title, is_done) VALUES (?, ?) RETURNING *'
  )
  const todo = statement.get(title, 0)

  return todo
}
```

Now, our `POST /todos` endpoint should be working. We can test it by adding a new todo in the front end and checking if it appears in the list of todos.

We will also demonstrate one additional responsibility of the back end - to validate the data it receives. In this case, we should check if the `title` is a non-empty string. If it is empty, we should return an error response. We can do this by adding a simple check in the `POST /todos` handler:

```js
const todoBody = await getJsonBody(req)

// if it is not a string, or it is an empty string
if (typeof todoBody.title !== 'string' || !todoBody.title.trim().length) {
  res.statusCode = 400 // Bad request
  res.end(JSON.stringify({ error: 'Title is required' }))
  return
}
```

This will return a `400 Bad Request` response with a JSON body containing the error message. You might have noticed that the front end already has a check for an empty title:

```js
const title = todoInput.value.trim()

if (!title) {
  alert('Please enter a todo')
  return
}
```

Is it enough to have this check in the front end? No. The front-end check provides immediate feedback to the user. The back-end check ensures that the data is correct and prevents malicious users from sending invalid data. Because anyone on the internet could make any request to our server, we should always validate the data we receive. At some point, you just have to assume that the visitor is not friendly and is trying to break your application.

We will not add more complexity to this example by adding request error handling in the front end. Still, in an actual application, you should check if the response is successful and, if not, display an error message to the user in some HTML element, for example, a red box with the error message.

## Step 6. Write the `PATCH /todos/:id/done` endpoint.

By requirements, we need to add a `PATCH /todos/:id/done` handler:

- PATCH `/todos/:id/done` (e.g., `/todos/1/done`) - marks a todo as done, sends back the updated todo

This means that the front end will send a `PATCH` request to `http://localhost:3000/todos/1/done` to mark the todo with ID `1` as done. The back end should update the `is_done` field in the database for the todo with ID `1` and return the updated todo. Let's look at the front-end code by searching for `PATCH`:

```js
const response = await fetch(`${SERVER_URL}/todos/${todoId}/done`, { method: 'PATCH' })
```

This seems a bit simpler than the `POST` request. We do not need to send any data in the body.

Let's look at the back-end code in `server/index.js`. This time, there is no logic for handling `PATCH` requests.

First, we need to figure out how we can distinguish these requests. We can use a naive approach by checking if the request method is `PATCH`. Let's write some pseudo-code:

```js
if (method === 'PATCH') {
  const id = parseId(url)
  const todoUpdated = setTodoAsDone(id)
  const jsonString = JSON.stringify(todoUpdated)

  res.end(jsonString)
  return
}
```

Trying to get the `id` from the URL is a bit tricky. There are lots of ways to approach this small problem. One is to manually split the URL into multiple parts and get the part with an ID. The most naive approach would be:

```js
if (method === 'PATCH') {
  const id = url.split('/')[2]
  const todoUpdated = setTodoAsDone(id)
  const jsonString = JSON.stringify(todoUpdated)

  res.end(jsonString)
  return
}
```

This is not great for a few reasons:
It assumes that the URL will always have the same structure.
It does not check if the ID is a number.
It does not check if the ID is valid (positive number).

We could write a function that would handle all these cases, but we will not write this function here to keep the example simple.

We will use a different approach for demonstration purposes, which is quite common when matching URL paths - **regular expressions**. We can define a regular expression that matches the URL path `/todos/1/done`:

```js
const todoDonePattern = /^\/todos\/([1-9]\d*)\/done$/
if (method === 'PATCH' && todoDonePattern.test(url)) {
  const id = getMatchedId(todoDonePattern, url)
  const todoUpdated = setTodoAsDone(id)
  const jsonString = JSON.stringify(todoUpdated)

  res.end(jsonString)
  return
}

function getMatchedId(pattern, url) {
  const match = url.match(pattern)

  if (!match) return null

  // match[1] has the first matched group by the ([1-9]\d*) group.
  // This group matches a number that starts with a digit from 1 to 9.
  // It is a string, so we should convert it to a number.
  return Number(match[1])
}
```

Several JS frameworks use path strings, such as '/todos/:id/done', which are then converted into regular expressions. This is a bit easier to read and understand, but it requires an [additional package](https://www.npmjs.com/package/path-to-regexp), so we will not use it here.

Now, let's write the `setTodoAsDone` function in `server/todos.js` using the same `RETURNING` shorthand as before:

```js
export function setTodoAsDone(id) {
  const statement = database.prepare(
    'UPDATE todos SET is_done = TRUE WHERE id = ? RETURNING *'
  )
  const todo = statement.get(id)

  return todo
}
```

If we go back to the front end and mark a todo as done, we should see that the todo is updated and there is no error in the console.

## Step 7. Write the `DELETE /todos/:id` endpoint.

Finally, we need to add a `DELETE /todos/:id` handler, which is quite similar to the `PATCH` handler:

- DELETE `/todos/:id` (e.g., `/todos/2`) - deletes a todo, sends back the deleted todo

```js
const todoDeletePattern = /^\/todos\/([1-9]\d*)$/
if (method === 'DELETE' && todoDeletePattern.test(url)) {
  const id = getMatchedId(todoDeletePattern, url)
  const todoDeleted = deleteTodo(id)
  const jsonString = JSON.stringify(todoDeleted)

  res.end(jsonString)
  return
}
```

```js
export function deleteTodo(id) {
  const statement = database.prepare('DELETE FROM todos WHERE id = ? RETURNING *')
  const todo = statement.get(id)

  return todo
}
```

## Step 8. Look for areas that could be improved or refactored.

There are quite a few areas that we could further improve in this project:

- **Validation.** Add more validation in the back end - throw an error if an invalid ID is provided or the database fails some operation.
- **Error handling.** Add some error handling in the front end.

We could consider restructuring our code in a more modular way and cleaning up the `server/index.js` file, so it is easier to update in the future. We could also think about some possible future features and whether our current approach introduces any hard-to-undo decisions.

We have not added these further improvements as the solution would look a bit too complex for the exercise and quite distant from the original starting point. However, these are good areas to consider when working on a real project.
