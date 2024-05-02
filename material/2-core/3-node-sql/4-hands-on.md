Part 4: Node.js Server with a SQL Database

# Task Description

In this hands-on exercise, we will practice building a straightforward server that interacts with an SQL database for a Todo application. This application will call the Node server to save its data on the SQLite database.

## Node.js servers (0.5 hours)

We will explore using Node.js to create a server that handles requests and sends responses. This would be called the back-end server - an application (or an entire computer) running to respond to user requests. While there are many reasons to have a back-end server, the most common reasons to have a back-end server are:

- **Data storage**: The server can store data in a database, such as user information, posts, comments, etc. The server then acts as a gatekeeper to this data, allowing users to read, write, and delete data.
- **Private APIs**: Any API keys we add to the front-end code are exposed to the public. Anyone can inspect the code and find everything we added to the front end. We can use a back-end server as a middleman between the front-end and private APIs.
- **Business logic**: The server can perform complex or private calculations, such as determining the price of an item based on the user's location, the time of day, and the user's purchase history.

The front-end application (the user interface) will make requests to the back-end server, which will then respond with the requested data. The front-end application can be a website, a mobile app, or any other application that interacts with the user. We use HTTP requests on the web to communicate between the front end and back end.

**What is an HTTP request?**

When you make a request to the server (by requesting a page, an image, some JSON data from an API, etc.), your machine is sending out a text message, which would look something like this:

```
GET / HTTP/1.1
Host: www.turingcollege.com
Accept: text/html,text/plain
```

Here, we state what we want to GET from the server and what we are willing to accept.

**Note.** We simplify the process by ignoring DNS queries, additional headers, etc. You will not be dealing with these complications in this exercise.

Given that your machine has looked up the IP address of `www.turingcollege.com`, it will send this message to the machine at that IP address. This machine will have a piece of software that listens to these requests. This software is called a **server**.

**Let's create a Node.js server.**

Create a new file called `server.mjs`. Note that we are using `mjs` file extension for this example. This tells Node that this is an ES Module so that we can use the `import`/`export` syntax. For projects with multiple files, we would create `packages.json` with `"type": "module"`, which informs Node that the entire folder uses ES Modules. But for a one-off file, having a `.mjs` file extension is easier than adding a `package.json` file.

We will not perform any project setup; we will only use Node.js built-in modules.

Let's add the following code:

```js
// Built-in Node.js module for handling HTTP requests
import http from 'node:http'

// We create a server and tell it what it should do for each request.
const server = http.createServer((request, response) => {
  // we print out the request URL to the Node console
  console.log('Request:', request.method, request.url)

  // setting to HTTP status code 200, which means "OK"
  response.statusCode = 200

  // Indicating the type of content we're sending back.
  // We could indicate other types, such as JSON or HTML.
  response.setHeader('Content-Type', 'text/plain')

  // We are ending our response with a message.
  response.end('Hello, world!')
})

// Just a random port number for development purposes. Ports
// under 0 - 1023 are privileged and reserved for certain
// applications, so we pick a port number above 1023.
const PORT = 3000

server.listen(PORT, 'localhost', () => {
  console.log(`Server running at http://localhost:${PORT}/`)
})
```

Run this file with `node server.mjs`. You should see the following message:

```
Server running at http://localhost:3000/
```

Unlike applications that only perform some calculations and close themselves when done, **this application will keep running and listening for requests**. This is because we have created an active handle by calling `server.listen()`. A handle refers to a long-lived resource that can perform actions outside of the Node.js process. In this case, the handle is listening for requests on port 3000.

Now, the Node.js process will not exit unless it crashes due to an uncaught error or we send a signal through the terminal to interrupt it (`SIGINT`) by pressing `Ctrl+C` (or `Cmd+C` on macOS).

Now, your server will respond to all requests with the following message:

```
HTTP/1.1 200 OK
Content-Type: text/plain
Content-Length: 13

Hello, world!
```

**Note:** The `Content-Length` header is automatically added by Node.js, so you don't need to worry about it. Also, we left out some headers intentionally for brevity.

Visit `http://localhost:3000` in your browser to see the response body (content) - `Hello, world!`. Due to our `console.log` statement, this should also print out a message in your Node.js console. Depending on your browser, you might see multiple requests as some browsers eagerly request additional resources, such as `favicon.ico` (the tiny icon displayed in the browser tab).

Whenever you visit a website, your browser makes the `GET` request to the URL in the address bar. If you need to perform a request with a different HTTP method, such as `POST`, `PUT`, `PATCH`, `DELETE`, etc., you can use a REST client, such as Insomnia, Postman, or VS Code extensions (REST Client or Thunder Client).

Most of the server code can be boiled down to this general pattern. You receive a request, do something about it, and send a response back.

## Requirements

The application needs to have four features:

- It shows all todos on the home page.
- It allows creating a new todo.
- It allows marking a todo as done.
- It allows deleting a todo.

It uses a SQL database to store todos.

Another developer on your team hoped to finish the application but had to leave for more urgent matters. They have already set up the project structure, the entire front end, and some of the back end. You have been asked to finish the backend part of the application, given that you are familiar with Node.js and SQL.

The application is designed around four endpoints:

- GET `/todos` - returns all todos
- POST `/todos` - creates a new todo
- PATCH `/todos/:id/done` (e.g., `/todos/1/done`) - marks a todo as done
- DELETE `/todos/:id` (e.g., `/todos/2`) - deletes a todo

An endpoint is a URL to which the server responds. The server will perform different actions based on the HTTP method (GET, POST, PATCH, DELETE) and the URL path.

You aim to finish implementing these endpoints and connect them to the SQLite database. You will know that you have completed the task when you can interact with the front-end application by creating, marking as done, and deleting todos. Refreshing the page should show the same todos in the same state (done or not done).

Read the `README.md` file in the starter project for more information on how to start the project.

To reach a sufficient solution, you will need to edit only the `server/index.js` and `server/todos.js` files. You do not have to touch the front-end code.

## Recommended Step-by-Step Approach

1. Read the `README.md` and start the front-end and back-end servers.
2. Open the front-end application in your browser and try to interact with it. It should only work partially.
3. Familiarize yourself with the existing back-end code and the provided database schema.
4. Write the SQL required for the `GET /todos` endpoint. It should return all todos from the database.
5. Write the `POST /todos` endpoint. It should insert a new todo into the database.
6. Write the `PATCH /todos/:id/done` endpoint. It should set a todo's `is_done` field to `true` (or `1` in SQLite).
7. Write the `DELETE /todos/:id` endpoint. It should delete a todo with a given ID.
8. Look for areas that could be improved or refactored.

## Approach to Solving the Task

Follow this approach to tackle the hands-on exercise:

- Download the provided unfinished solution and use it as your starting point.
- Spend up to 10 hours attempting to solve the task independently.
- If you struggle during the first hours and find it too difficult, try seeking help from your peers or JTLs for an additional 10 hours. Spend half of this time working with someone else, whether a study buddy, a peer who has completed the exercise, or a JTL in an open session.
- When you are no longer progressing, look at the suggested solution and walk through it step-by-step. Spend up to 10 more hours on the walkthrough while experimenting and learning from the provided solution.
- Try to return to your solution once the suggested solution clears up any obstacles you encountered.
- We recommend checking the final suggested solution, even if you have completed the task on your own, to compare approaches and learn new techniques.
