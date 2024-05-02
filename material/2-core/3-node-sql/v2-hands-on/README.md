## Launch project

This project consists of 2 parts:

- Front end (`public` folder) - visually displaying TODOs
- Back end (`server` folder) - storing and serving TODOs in a SQL database

**Starting the front end**

To start the front-end, we recommend using the Live Server extension in Visual Studio Code.

Make sure that you have opened this project folder in Visual Studio Code as a root folder, so you can see `.vscode` folder at the top of the sidebar in the file Explorer.

We have included the `.vscode/settings.json` file that informs the Live Server extension to start the front-end server in the `public` folder, so that if you start the Live Server, it will not need the `/public` path in the URL.

If you launch the project with the Live Server extension, you should see the front end in the browser by visiting `http://127.0.0.1:3001` (or `localhost`).

If you open the Developer Tools Console in the browser, you should see the following error (or something similar, depending on your browser):

```
TypeError: Failed to fetch
```

The front end tries to get a list of TODOs from the back end, but the back end is not running yet.

**Starting the back end**

```bash
# Install dependencies (run this once)
npm install

# Start the server (or `npm run start`)
node server/index.js
```

If you start the back end, you should see the following message in the console:

```
Server is running at http://localhost:3000
```

Now, if you refresh the front end homepage in the browser, you should no longer see the error in the console.

## Files

- `data/database.db` - SQLite database file created once you start the server
- `public/*` - front-end files sent directly to the browser
- `server/index.js` - back-end server file that starts the server and responds to requests to manage TODOs
- `server/requests.js` - some utility functions covering some tricky areas that go beyond what is necessary at this point
- `server/todos.js` - the file containing functions to manage TODOs in the database
- `database` - folder containing the database setup and table schema (`tables.sql`)

## Task

The application needs to have four features:

- It shows all todos on the home page.
- It allows creating a new todo.
- It allows marking a todo as done.
- It allows deleting a todo.

It uses a SQL database to store todos.

Another developer on your team hoped to finish the application but had to leave for more urgent matters. They have already set up the project structure, the entire front end, and some of the back end. You have been asked to finish the backend part of the application, given that you are familiar with Node.js and SQL.

The application is designed around four endpoints:

- GET `/todos` - responds with all todos
- POST `/todos` - creates a new todo, responds with the created todo
- PATCH `/todos/:id/done` (e.g., `/todos/1/done`) - marks a todo as done, responds with the updated todo
- DELETE `/todos/:id` (e.g., `/todos/2`) - deletes a todo, responds with the deleted todo

An endpoint is a URL to which the server responds. The server will perform different actions based on the HTTP method (GET, POST, PATCH, DELETE) and the URL path.

You aim to finish implementing these endpoints and connect them to the SQLite database. You will know that you have completed the task when you can interact with the front-end application by creating, marking as done, and deleting todos. Refreshing the page should show the same todos in the same state (done or not done).
