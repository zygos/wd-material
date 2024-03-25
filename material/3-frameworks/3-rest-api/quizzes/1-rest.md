1. What is the purpose of REST APIs in web development?
- a) To handle requests and send responses
- b) To parse JSON request bodies
- c) To create a server with Node.js
- d) To interact with a database
- Correct: a) To handle requests and send responses
- Topic: Part 1: REST APIs and Express.js
- Difficulty: Basic
- Resource:

2. Which of the following API calls seems to be the most RESTful for creating a new comment?
- a) POST /comments?command=create `{"text": "Delicious pierogi!"}`
- b) POST /comments `{"command": "create", "text": "Delicious pierogi!"}`
- c) POST /comments/create/Delicious-pierogi!
- d) POST /comments `{"text": "Delicious pierogi!"}`
- Correct: d) POST /comments `{"text": "Delicious pierogi!"}`
- Topic: REST APIs
- Difficulty: Basic
- Resource:

3. Conventionally, how does a database know which migrations it needs to run in a change-based migration system?
- a) The migration tool is responsible for keeping track of applied migrations in a separate file that is not committed to Git
- b) It has a table that stores information on all previously run migrations
- c) It stores a timestamp of the last applied migration as a metaproperty
- d) It compares the current database schema to the schema defined in the migration files
- Correct: b) It has a table that stores information on all previously run migrations
- Topic: Basic
- Difficulty: Advanced
- Resource:

4. What is the most common use case for a database migration?
- a) To create a backup of the database
- b) To change the database schema
- c) To optimize the performance of the database
- d) To import data into the database
- Correct: b) To change the database schema
- Topic: Migrations
- Difficulty: Basic
- Resource: [What are database migrations?](https://www.prisma.io/dataguide/types/relational/what-are-database-migrations)

5. What is the conventional prefix of migration files?
- a) A timestamp of a date when a migration should to run
- b) A description of what the migration will do
- c) A table name it will affect
- d) A timestamp of a date when the migration was created
- Correct: d) A timestamp of when the migration was created
- Topic: Migrations
- Difficulty: Basic
- Resource:

6. When should you use a PATCH request instead of a PUT request?
- a) When you want to replace the entire resource
- b) When you want to create a new resource
- c) When you want to partially update an existing resource
- d) When you want to patch corrupted data
- Correct: c) When you want to partially update an existing resource
- Topic: REST APIs
- Difficulty: Basic
- Resource:

7. By convention, how is the function upgrading the database schema called in a migration file?
- a) apply
- b) latest
- c) migrate
- d) up
- Correct: d) up
- Topic: Migrations
- Difficulty: Basic
- Resource:

8. What happens if your middleware does not return a response and does not call the `next` function?
- a) The request will hang until it times out
- b) The request will be rejected with an error
- c) The request will be passed to the next middleware
- d) The request will be passed to the error handler middleware
- Correct: a) The request will hang until it times out
- Topic: Express.js
- Difficulty: Basic
- Resource:

9. What is the default status code of a handled Express.js route that sends a response?
- a) 200
- b) 400
- c) 404
- d) 500
- Correct: a) 200
- Topic: Express.js
- Difficulty: Basic
- Resource:

10. In Express, how is an error-handling middleware different from a regular middleware?
- a) It has 4 parameters instead of 3
- b) It must have its first parameter named `err` or `error`
- c) By definition, any last registered middleware is an error-handling middleware
- d) It must be registered with `app.use` instead of `app.route`
- Correct: a) It has 4 parameters instead of 3
- Topic: Express.js
- Difficulty: Advanced
- Resource:

11. Which SQL keyword will most likely be used in a POST request handler when dealing with a resource in a database?
- a) CREATE
- b) DELETE
- c) INSERT
- d) UPDATE
- Correct: c) INSERT
- Topic: REST APIs
- Difficulty: Basic
- Resource:

12. What is the conventional name for an application layer that is responsible for forming a response to a request?
- a) Controller
- b) Model
- c) Repository
- d) Service
- Correct: a) Controller
- Topic: REST APIs
- Difficulty: Basic
- Resource:

13. What is an idempotent request?
- a) A request that reads data but does not modify it
- b) A request that accepts a unique resource identifier
- c) A request that would have the same effect if called multiple times
- d) A request that does not store any state about the previous request from the same client
- Correct: c) A request that would have the same effect if called multiple times
- Topic: REST APIs
- Difficulty: Basic
- Resource:

14. Which of the following headers is automatically added to an HTTP response by the Node HTTP module?
- a) Accept
- b) Authorization
- c) Content-Length
- d) Server
- Correct: c) Content-Length
- Topic: REST APIs
- Difficulty: Advanced
- Resource: Part 1: REST APIs and Express.js

15. Which of the following ports is a non-privileged port that a non-root user can use?
- a) 80
- b) 443
- c) 1023
- d) 3002
- Correct: d) 3002
- Topic: REST APIs
- Difficulty: Advanced
- Resource:
