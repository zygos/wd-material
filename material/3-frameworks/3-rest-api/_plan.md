# Part 1: Hands-on: Express.js and REST APIs

We will build a REST API server using Node.js and Express.js that will allow us to interact with a blog.

- [0.5] Node.js server
- [0.5] REST APIs
  - Resource: [RESTful APIs and CRUD](https://www.youtube.com/watch?v=lsMQRaeKNDk)
  - Introduction to Express.js
    - Resource: [RESTful APIs in Node](https://www.youtube.com/watch?v=-MTSQjw5DrM)
      - In nearly all regards, Express.js is a low-level framework with a limited number of out-of-the-box abstractions
      - Explains everything through using JavaScript and CommonJS modules, so there is no need to add any configuration or compiling TypeScript
      - For the second part of the video, which discusses how to use Express in Node, follow along the video with your code editor
      - Video uses Insomnia. You can use any GUI REST client, such as Insomnia, Postman, or VS Code extensions such as REST Client or Thunder Client. You probably have one installed, as you had some exercises using a REST client in the front-end module. Please do not try to download the exact same REST client for every guide you find online. Some tutorials will use Insomnia, some will use Postman, some will use a client inside your editor, such as Thunder Client.
- [0.5] Setup: Express.js with TypeScript
  - {{ setup instructions with tsx }}
- [1.5] Express.js basics
  - Resource: [Express JS with TypeScript](https://www.youtube.com/watch?v=KgnJNJk9-to)
    - video uses a slightly different setup for running TypeScript
  - Video presents 2 ways of structuring:
    - Slicing by layer (technical concern):
      ```
        models/
        services/
        controllers/
      ```
    - Slicing by resource (business concern):
      ```
        deliveries/
        cars/
        users/
      ```
- [1.0] Controllers vs Services vs Models
  - Resource: [Controllers and Services](https://www.coreycleary.me/what-is-the-difference-between-controllers-and-services-in-node-rest-apis)
  - Resource: [Controllers and Services example in Express](https://www.youtube.com/watch?v=ZWQlUXV74w0)
- [0.5] Exercises: Respond with static data
- [1] [Express.js: Middleware](https://www.youtube.com/watch?v=lY6icfhap2o)
  - Common middleware packages
    - JSON
    - Helmet
    - cors
    - urlencoded
    - logging (winston, morgan, pino)
    - compression
    - serving static files
<!-- - [0.5] (https://expressjs.com/en/guide/routing.html) -->
- [1.5] Exercises: Respond with data
  - [0.5] Exercise: Respond with static data
  - [0.5] Exercise: Respond with data
  - [0.5] Micro Exercise: Inserting
  - [0.5] Micro Exercise: Updating
  - [0.5] Micro Exercise: Removing
- [0.5] Configuration
- [0.5] API design
  - Database -> | Services -> Controllers --|-> Store -> Views
  - Internal services
  - Command Query Responsibility Segregation (0.5 hours)
    - Resources: [CQS and CQRS](https://www.youtube.com/watch?v=cqNGAo-9pUE)
    - Idempotent requests
- **Exercise:** Building a simple API endpoint with Express that creates a record in a database (article)
- Further research: JSON:API, GraphQL
- Further research (advanced): gRPC, WebSockets, protobuf

# Part 2: Hands-on: Query builders, Configuration and Validation [11.5]

- [0.5] [Comparing SQL, query builders, and ORMs](https://www.prisma.io/dataguide/types/relational/comparing-sql-query-builders-and-orms)
- [1.5] Query builders: Kysely
  - Pure SQL is rarely used. Why? Typing, Security, auto-migrations, IDE tooling...
  - [Examples](https://kysely.dev/docs/category/examples)
- [1.0] Exercises: SQL -> using Kysely
- [1.0] [Migrations](https://www.prisma.io/dataguide/types/relational/what-are-database-migrations)
- [1.0] Exercises: Create migration files in Kyseley
- [1.0] Validation: Introduction to zod
- [1.0] Exercises: Validating requests with zod
- [1.5] Exercise: Inserting and querying data in your e-commerce database using Node.js
- [1.5] Exercise: Updating and deleting data in your e-commerce database using Node.js
- [1.5] Further research: Planetscale, Neon, RabbitMQ, Redis

# Part 3: Test-Driven Development (TDD)

- Introduction to TDD
- Writing tests before code
- Testing Express applications with Supertest
- Testing individual functions
- Differences between Vitest and Jest
- Test doubles: mocks, fixtures, fakes, stubs and spies
- To mock or not to mock?
- Exercise: Mocking a database call
- How to write testable code?
- Exercises: Refactor
- Side-effects and pure functions
- Exercise: Isolate side-effects
- Encapsulation
- Functions vs. Classes
- Red-Green-Refactor cycle in TDD
- Mocking in Vitest
- Exercise: Refactoring an Express application endpoint
- Exercise: Fixing a bug in an Express application
- Further research: Single Responsibility, Encapsulation, Interface segregation and Design by Contract

# Part 4: Peer programming exercise: REST API server using TDD

Continue working on the `movies.db` from CS50, but now we will be working on using TDD to build a REST API server that allows users to book tickets for movies.

{{ Booking API: ~20 - 30 hours }}

# Part 5: Practical Project (1 Peer + 1 STL correction) - social platform back-end

Stack:
- Express.js
- SQLite
- Kysely
- zod
- Vitest
- ESLint + Prettier
- TypeScript

Data:
- Users
- Tweets
- Likes
- Retweets
- Follows
- Messages

Bonus challenges:
- Lists
- Notifications
- Search endpoint

Use of conventional commits.

{{ 25 - 35 hours }}

Design a database schema for a blog and build a full CRUD API with Node.js, Express.js and SQLite.

article
comment
user

```
id (unique, incrementing id)
author (string)
url (string that cannot be empty)
title (string that cannot be empty)
likes (integer with default value zero)
```
