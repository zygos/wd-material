Part 1: REST APIs and Express.js

# Part introduction

At this point, our front-end applications are quite sophisticated, but we have yet to learn how to build a back-end server on our own. In this part, we will learn how to write API servers with Express.js, a popular Node.js framework. This will be a stepping stone to building full-stack applications.

# Part introduction

During this sprint, we'll work on three projects:
- Parts 1 - 2: Guided hands-on exercises on creating a minimal REST CRUD API with Express.js.
- Parts 3: A guided hands-on exercise on writing testable code and using TDD
- Part 4: A peer programming exercise to create a movie ticket booking Express.js API in a test-driven manner.
- Part 5: A Discord bot with a REST API for congratulating Turing College students on their progress.

Part 3 will feature some additional exercises for refactoring and testing your code.

Parts 1 - 3 will have many code snippets, and we will provide most solutions to check against at the end of each part. We will ramp up the difficulty of some exercises to ensure that you are still challenged since you can step through the provided solutions if you get stuck.

By the end of this sprint, expect to be able to:

- create a small REST API with Express.js with controllers and models
- use TypeScript with Express.js
- use a query builder to query the database
- write a simple validation schema using `zod`
- use Test-Driven Development (TDD) and Dependency Injection (DI) to test small modules in isolation
- write integration tests for testing Express.js controllers
- use a TDD development cycle live in a pair programming session and during a correction session

You will NOT be expected to be able to:

- to be able to write integration and unit tests with DI without seeing examples
- come up with a solution matching the provided solutions in every regard
- setup a project with migrations and DI on your own
- use DI for testing every layer of a back-end application

In the first part, we will create a few endpoints for a REST API with Express.js.

We will work on creating a simple CRUD API that will allow us to save and read articles and comments. It will have the following table structure:

```sql
Table article {
  id integer [primary key]
  title text [not null]
  content text [not null]
}

Table comment {
  id integer [primary key]
  content text [not null]
  article_id integer [not null]
  user_id integer [not null]
  created_at timestamp [not null]
}

Table user {
  id integer [primary key]
  first_name text [not null]
  last_name text [not null]
}
```

Articles have zero-to-many comments; each comment has an author (user), and users can have many comments. In reality, the schema would involve more moving parts and relations, but we will keep it simple for your first back-end project.

We will slowly reveal the requirements for this API and some initial steps on how to implement them. You will be expected to figure out the rest on your own.

# Key learning topics & resources for this part

Creating a production server in this manner would require us to make many technical decisions, such as routing, handling errors, parsing the data the client sends to the server, and many others. Instead of reinventing the wheel, **we will use Express.js**, an unopinionated and minimalist web framework for Node.js. It is the most popular Node.js framework, and many companies use it.

**Pro tip:** In software development, the words "opinionated" and "unopinionated" describe how much a framework or library dictates the structure of your code. **An opinionated framework** will have a lot of structure and rules that you need to follow, but that allows you to have a "batteries included" experience, where you can get started quickly and have a lot of things already set up for you as long as you work within the confines of the framework. This is sometimes called "convention over configuration". In contrast, **an unopinionated framework** will have less structure and rules. It will allow you to structure your code however you want, but you will need to make more technical and architectural decisions yourself.

## REST APIs (1 hour)

Our web server could respond with raw HTML and let the web browser display it. This is how most of the web works. However, suppose our server always responds with HTML. In that case, it can be more difficult to build interactive applications or to reuse the same data for different purposes - integrations with other services, mobile applications, desktop applications, etc.

As the demand for interactive front-end applications increased and companies wanted to reuse business logic for their various apps, a different pattern emerged - **back-end servers primarily as APIs**. So, instead of dealing with HTML, the server would respond with raw data in a structured format, such as JSON. Then, the client (web app, mobile app, desktop app, etc.) would use this data to render the UI. Front-end frameworks, such as React, Vue, or Angular, handle this part of web apps.

There are many ways of building an API, but nowadays, most web applications have consolidated around the principles of **REST APIs**. REST stands for **RE**presentational **S**tate **T**ransfer. It is a set of principles that describe how to build a particular web API.

- Watch: [RESTful APIs and CRUD](https://www.youtube.com/watch?v=lsMQRaeKNDk) (10 min)

**How are REST APIs different from other types of APIs?**

```
REST components perform actions on a resource by using a representation to capture
that resource's current or intended state and transferring that representation
between components.

-- Roy Thomas Fielding (REST author)
```

In REST, you either ask for a resource or declare what you want your resource to look like, and the server will try to fulfill your request.

**REST APIs vs non-REST APIs**

We will use an example with a `PATCH` HTTP method. This method indicates that you want to update a resource partially. For example, if you have a user profile, you could send a `PATCH` request to update the user's name. Meanwhile, a `PUT` method usually indicates that you want to replace the entire resource. In practice, a `PATCH` changing all fields is equivalent to a `PUT` request so you can implement only `PATCH` requests.

Let's say we have a user:

```json
{
  "id": 41,
  "name": "Jane",
  "age": 30,
  "isVerified": false
}
```

In our system, users are verified manually by an administrator.

Let's assume an administrator wants to verify a user account with an `id` `41`. By making reasonable assumptions, try to spot which of the following APIs is the most RESTful:

```bash
# 1.
GET /users?action=verify&id=41

# 2.
POST /users/41/verify {}

# 3.
POST /users/41 { "action": "Verify" }

# 4.
PATCH /users/41/verify { "isVerified": true }

# 5.
PATCH /users/41 { "isVerified": true }

# 6.
POST /verify-user { "userId": 41 }
```

<details>
<summary>Click here for the answer</summary>

```md
While making a case for a few of these is possible, the most RESTful API is #5.

That is because we are not calling a remote function but simply declaring how we would like our resources to look. We are not saying "verify the user"; we are passing a representation of what we want the user to be - the `isVerified` property set to `true`. The server will then decide what to do to make that happen.

If verifications were a resource, example 2 could be RESTful, though we might want to call it `users/1/verifications` or `users/1/verfication` instead of `users/1/verify`.

Do you have to design all your APIs in this manner? No. There are technical and practical reasons why you might choose a different design. However, we recommend sticking to most REST principles in this module, as it will make your APIs more straightforward to understand and use.

Simply naming an endpoint by a resource and slapping an appropriate HTTP method does not make it RESTful. RESTful APIs assume that you can nearly always express your desired effects with some data (state representation). State representation is a fancy way of saying that you are describing the outcomes, not the steps to get there.
```
</details>

Your API can only do something beyond fetching or updating data. For example, updating `isVerified` could trigger a chain of events that would send an email to the user, create a notification in the database, add some data to a log file, etc. However, given that the user has proper permissions, the server should ensure that the final user state (as presented to the user) ends up with `isVerified: true` or some derivative of that.

**Path structure**

We can structure our API endpoints in a flat or nested manner.

```
// nested
article/:id/comments

// flat
comments?articleId=:id
```

Both request comments belonging to an article. However, the first communicates a hierarchy, while the second does not. While the nested structure is elegant for highly hierarchical data, the second approach is more practical for most relationships as it is much more flexible given changing application requirements. Most relationships are not strictly hierarchical but associative. Comments can belong to a user, an article, etc. Also, it is hard to predict how we will interact with our data in the future. That's why we will provide mainly a flat structure in our examples.

**Not all RESTs are alike**

Are all self-proclaimed REST APIs fully RESTful? No. Quite a few, if not the majority, of REST APIs only partially adhere to all REST constraints. For example, most APIs do not use [HATEOAS](https://en.wikipedia.org/wiki/HATEOAS), which requires the server to provide links to related resources. However, they are still called REST APIs because they were designed with REST principles in mind, and we can interact with them similarly.

So, even though REST APIs have a rather strict definition, the term "RESTful API" is used loosely in the real world. That does not make these sorts of APIs bad; it means they might not have all the benefits of a fully RESTful API.

**Additional REST Principles**

REST APIs also adhere to the following principles:

- **Idempotency**: REST APIs are designed to be idempotent, which means that making the same REST API call any number of times will produce the same result. This applies to GET, PUT, and DELETE methods. In practice, `DELETE` might not be strictly idempotent, as you might want to return a deleted resource on the first call for pragmatic reasons, and on subsequent calls, you could no longer return the resource, as it has been deleted. However, the result is the same - the resource is deleted, and the client can assume that one or more calls to `DELETE` will result in the same outcome.
- **Statelessness**: REST APIs are stateless, meaning that each request from client to server must contain all the information needed to understand and process the request. The server should not store anything about the client's latest HTTP request.
- **Cacheable**: In a REST API, clients can cache responses. Responses must, therefore, implicitly or explicitly define themselves as cacheable or not to prevent clients from reusing stale or inappropriate data in response to further requests. This is usually done by setting the appropriate HTTP headers.
- **Layered System**: REST allows for a layered system where the client cannot ordinarily tell whether it is connected directly to the end server or an intermediary.
- **Uniform Interface**: REST APIs have a uniform interface, which helps to decouple the client from the server. This simplifies the architecture and improves the visibility of interactions. Example of a possible interface:

```bash
# Retrieve a list of all blog posts
GET /posts

# Retrieve a list of specific blog posts
GET /posts?authorId=5  (opting for flat paths)
or GET /author/5/posts   (opting for nested paths)

# Retrieve a specific blog post
GET /posts/{id}

# Create a new blog post
POST /posts
{
  "authorId": 5
  "title": "My New Blog Post",
  "content": "This is the content of my new blog post."
}

# Update a specific blog post
PATCH /posts/{id}
{
  "content": "This is the updated content of my blog post."
}

# Delete a specific blog post
DELETE /posts/{id}

# All requests use:
# - HTTP method to indicate the action
# - URL path to indicate the resource
# - URL query to indicate the filters (technically, id is an exception here)
# - JSON body to indicate the desired state representation
```

It can seem overwhelming at first, but you do not have to worry about all these constraints when you are building every endpoint in your API. Once you have built endpoints for a single resource, you can reuse the same patterns for other resources. At first, that will involve some copy-pasting, but eventually, you can abstract away the common patterns into reusable modules.

## REST APIs with Express.js (0.5 hours)

Watch: [RESTful APIs in Node](https://www.youtube.com/watch?v=-MTSQjw5DrM) (12 min)

- Follow along the video with your code editor. It will show you how to use Express to accomplish the same thing we did in the previous exercise.
- The video uses Insomnia. You can use any GUI REST client, such as Insomnia, Postman, or VS Code extensions, such as REST Client or Thunder Client. You probably have one installed, as you had some exercises using a REST client in the front-end module. There is no need to have more than a single GUI REST client. You can try out a few, but stick with one you like.

**Note.** Generally, you will find yourself using the following HTTP methods and SQL commands in your REST API:

- app.get - SELECT
- app.post - INSERT
- app.patch - UPDATE
- app.delete - DELETE

## Setup: Express.js with TypeScript (0.5 hours)

There are many ways of setting up a Node.js project with TypeScript. There can be some pains of setting up a new project with TypeScript, especially when you want to add Prettier and ESLint. We have provided a minimal setup to get you started with TypeScript using `tsx` - a package for running TypeScript in development. It is a more modern alternative to `ts-node` and `ts-node-dev`, which are more popular but are a bit slower and have their own quirks.

**Step 0: Download the starting template.**

It is provided to you as a starting template for this part. You can [download it](https://drive.google.com/file/d/1Nc4Hd992DmK0en3ZuuE2Q3zuYN8f6zKd/view?usp=drive_link), run `npm i` to install and `npm run dev` to run it.

It has 2 files that we care about in the `src` folder: `app.ts` and `index.ts`.

  - `app.ts` - your Express application:

```ts
import express from 'express'

const app = express()

app.get('/', (req, res) => res.send('Hello World!'))

export default app
```

  - `index.ts` - a file that will run the application as a server:

```ts
// we no longer need to specify the file extension in TypeScript
import app from './app'

const PORT = 3000

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})
```

In some starter tutorials, you will see both files combined into a single file, but we recommend separating your application definition (`app.ts`) and its execution (`index.ts`) into separate files. This general pattern helps make our code more modular and easier to test - detach the module definition from its usage. We could launch multiple Express applications with different configurations, databases, and ports using the same `app.ts` file. But let's not get ahead of ourselves.

We have added `"dev": "tsx watch src"` and `"start": "tsx src"` to the `package.json` scripts, you can start your application in 2 ways:

- run `npm run dev` to start a server in development mode, which will automatically restart the server when you make changes to your code. We will use this command most of the time.
- run `npm run start` to start a server without restarting it when you make changes to your code. This could be used in a deployed application.

## Express.js: Middleware (0.5 hours)

- Watch: [Express.js: Middleware](https://www.youtube.com/watch?v=lY6icfhap2o) (15 min)

Express.js is a minimal back-end framework. It does not have a lot of features out of the box, but it does provide a mighty middleware system to extend its functionality.

Middleware is a function that has access to the request and response objects and the next function in the application’s request-response cycle. The next function is a function in the Express router, which, when invoked, executes the middleware, succeeding the current middleware. All middleware functions need to either call `next()` or send a response to the client; otherwise, the request will hang. Technically, all Express.js routes can be called middleware, but generally, "middleware" refers to functions that are not directly responsible for handling responses.

For now, we will use built-in `express.json()` middleware to parse the request body, allowing us to interact with JSON data passed to our server.

**Note:** Error handling middleware needs to be registered last. Otherwise, it will not catch errors in other middleware. Also, it needs to have 4 parameters instead of 3 for Express.js to recognize it as an error handler.

## Exercise: Add routes to an Express application (2 hours)

**Step 1: Add the first 3 routes to your application:**

- `GET /articles`. It returns the array of all articles.
- `GET /articles/:id`. It returns a single article by ID. The server should respond with a 404 status code and an error message if there is no article with the specified ID.
- `POST /articles`. Given a JSON request body containing a `title` and `content`, it creates a new article. The server is responsible for allocating new IDs. All IDs are in numerical order (`1`, `2`, `3`...). Once created, the server should respond with the created article and a 201 status code. If there are any missing fields or they are of the wrong type, the server should respond with a 400 status code and an error message.

For now, we can store articles in a plain in-memory array, which will disappear every time the server is restarted. This is fine for now.

You can use the following data structure inside `app.ts`:

```ts
// parsing JSON request body for POST, PUT, and PATCH requests
app.use(express.json())

type Article {
  id: number
  title: string
  content: string
}

const articles: Article[] = []

app.get('/articles', (req, res) => {
  res.json(articles)
  // you can try out this route in the browser,
  // as browser makes GET requests by default
})

app.post('/articles', (req, res) => {
  // your POST /articles route handler
  // you can try it out with a GUI REST client, such as
  // Insomnia, Postman, or VS Code extensions (REST Client, Thunder Client)
})

// add the remaining GET /articles/:id route handler
```

**Note:** Express.js sets `status` to `200` by default and sets the appropriate header `Content-Type: application/json` header when we send back JSON data, so we do not need to do that manually. We can always specify them or specify only exceptions to the default behavior, such as `res.status(404).json({ error: 'Not found' })`.

It should be possible to create a new article by sending a POST request to `/articles` with the following JSON body:

```json
{
  "title": "Canine Kaleidoscope: Advanced Symphony in the Art of Barking",
  "content": "Dogs are often seen as simple creatures with their relentless pursuit of tails and tennis balls. Yet, their barking may hold a sophisticated layer of complexity."
}
```

The server should respond with the following JSON body:

```json
{
  "id": 1,
  "title": "Canine Kaleidoscope: Advanced Symphony in the Art of Barking",
  "content": "Dogs are often seen as simple creatures with their relentless pursuit of tails and tennis balls. Yet, their barking may hold a sophisticated layer of complexity."
}
```

## Using Express.js with TypeScript (1 hour)

- Watch: [Express JS with TypeScript](https://www.youtube.com/watch?v=KgnJNJk9-to) (40 min)

You can watch it from the start to familiarize yourself with an alternative setup, or **you can skip to 6:20** since we have already set up our project with `tsx`.

This video will guide you through the basics of using Express.js with TypeScript.

**Note:** You should be familiar with the Express routing syntax, as Vue Router uses a similar syntax for matching routes as Express.js.

## Controllers vs Services vs Models (0.5 hours)

You were presented with the concept of controllers, services, and models. Let's spend some time to understand what they are and how they relate to each other.

- Read: [Controllers and Services](https://www.coreycleary.me/what-is-the-difference-between-controllers-and-services-in-node-rest-apis) (20 min)

For now, you can think of them as:

- **controllers** - modules that handle requests and send responses
- **services** - modules that handle business logic
- **models** - modules that directly define some structure and methods that model your data, typically in the database. However, we will refer to models broadly as anything that deals with manipulating your data in the database. Sometimes, that involves encapsulating all the database access logic in a separate module called a repository, but we will cross that bridge when we get there.

These names are not inherently special; they are just labels we use to describe some layers of an application.

Some small applications could be easily maintained only with controllers. When an application grows, just through sheer refactoring by trying to separate concerns, you would eventually arrive at a solution that separates the business logic and data access from the handling requests. Eventually, you may have additional in-between layers with more specific concerns.

Here is a minimal example of a controller and a model/repository:

```ts
// articles/controller.ts
router.get('/articles', (req, res) => {
  const articles = articles.findAll()
  res.json(articles)
})
// ... other routes

// articles/model.ts
export function findAll() {
  return db.prepare('SELECT id, title, content FROM article').all()
}
// ... other model functions
```

Technically, our `model.ts` is **a repository** as it is a central point for accessing the database, and our model would be a module that defines the structure and methods of our data. However, this distinction is not important for now.

**Application structure**

The TypeScript Express.js video presents two ways of structuring your application:

- Slicing by layer (technical concern):

```bash
controllers/  # 1. user-facing layer
  articles.controller.ts
  users.controller.ts
services/ # 2. logic layer
  articles.service.ts
  users.service.ts
models/ # 3. data layer
  articles.model.ts
  users.model.ts
```

- Slicing by resource (business concern):

```bash
articles/
  articles.controller.ts
  articles.model.ts
  articles.service.ts
users/
  users.controller.ts
  users.model.ts
  users.service.ts
```

We could make it more granular:
```bash
users/
  controller.ts # takes in req/res and uses the service to fulfill requests
  service.ts # uses the model to handle the business logic
  repository.ts # responsible for dealing with the database
  schema.ts # responsible for validating/parsing data
```

We could make it even more granular with lots of separate modules:

```bash
users/
  repository/ # deals with the database
    addUser.ts
    patchUser.ts
    ...
    index.ts # exports a repository module for convenience

  schema.ts # responsible for validating/parsing data

  service/ # uses the model to handle the business logic
    signUp.ts # hashes the password, creates a user, sends a verification
    verifyEmail.ts # verifies the user and sends a greeting email
    query.ts # uses the model to query the database and list users
    ...
    index.ts # exports a service module for convenience

  controller/ # uses the service to fulfill requests
    delete.ts # DELETE /articles/:id
    find.ts   # GET /articles
    get.ts    # GET /articles/:id
    patch.ts  # PATCH /articles/:id
    post.ts   # POST /articles
    index.ts  # routes all requests to the appropriate req. handler
```

Of course, there are other ways to structure your application. You will see various structures in the wild. One pattern is not inherently better; it is just a different way to slice your project. Sometimes these might be referred to as "horizontal" slicing (by technical layer) and "vertical" slicing (by service/feature/request/user concern). Also, applications do not have to adhere to the same structure for all concerns — some [concerns are cross-cutting](https://en.wikipedia.org/wiki/Cross-cutting_concern) and are hard to isolate.

**Common data flow pattern**

Quite often, you would observe the following data flow:

1. Front-end (FE) component HTML template is bound to component logic.
2. Component logic interacts with a FE store.
3. A FE store interacts with the server.
4. The server uses a controller to handle a request.
5. Controller uses a service to handle business logic.
6. The service uses a model (through a repository) to handle data access.

Then, the data flows back up in the opposite direction to reach the component template, which is then updated with the necessary data and displayed to the user.

We will start with a straightforward structure of a single controller and a single model. We will not introduce a service layer yet, as our business logic is nearly non-existent. We will not force an additional layer just for the sake of it before we need it.

## Exercise: Using a controller and a model (1 hour)

**Step 2: Refactor your app to use a controller**

We only have a single file, `app.js`, that contains all application logic. Let's refactor it to use controllers and models. Our application is not complex enough to require additional layers; therefore, we will not add them now.

Create a `src/modules/articles` folder and add a `controller.ts` file.

Then, move all the code related to articles from `app.ts` to this new file. Ensure that your `app.ts` file delegates all the `articles` routes to the `articles/controller.ts` file. You can check out the `express.Router` section at the end of the [Express routing guide](https://expressjs.com/en/guide/routing.html).

**Step 3: Move out the data layer to a separate module**

Right now, our controller is directly accessing the `articles` array. This is not ideal, as we would like to have the ability to swap out the data layer easily. For example, we might use a database instead of an in-memory array.

Apart from simply becoming messy over time, our controller is also doing too much and needs to be focused on its primary concern - handling user requests. It does not need to be concerned with how the data is stored. Let's move the data access to a separate layer.

Create `src/modules/articles/model.ts` file and move the `articles` array and all logic concerning what an article is and how to modify an article to this file. Your model file should be the only one that deals with the `articles` array directly. It should export the necessary functions to create, read, update, and delete articles. This list of functions is sometimes referred to as a repository. It would grow over time as you need more intricate ways of interacting with your data.

Then, update your `controller.ts` file to use the `model.ts` file.

The idea is to allow 2 technical layers to communicate through a shared interface. Your controller is unaware of how the data is stored, and your model is unaware of how the data is used. This separation will allow us to perform isolated changes to a single layer and test it.

**Step 4: Add a `PATCH /articles/:id` endpoint, which partially updates an existing article.**

- it should throw an error if the article with a given ID does not exist
- it should not allow updating the `id` property. It can be implicitly disallowed by ignoring a passed `id` in the request body or explicitly disallowed by returning an error. Consider why you might choose one approach over the other.
- it should return the updated article
- it should return an error and a 404 status code if the article does not exist

## Migrations (0.5 hour)

Of course, we do not want to lose our data every time we restart the server, so we will move away from an in-memory array and use a database instead.

While updating our model module to use a database is a relatively straightforward task, there is one additional step - creating the necessary tables in a database.

We could create tables manually through `sqlite3` command line tool. But what if another developer needs to set up the project? They would need to run the same commands. What if we need to deploy our application to a production environment? What if we need to perform some changes to the database schema once it is already deployed?

We would want a script to create the tables for us. After all, our database will change over time, so we can not just commit a static database file to our git repository.

You might have already guessed that we will use **migrations**. Migrations are a way to describe how to get from one database state to another.

**Insight:** Whenever you have a particular path your application needs to go through to reach a working state, you should automate it. The reasoning goes well beyond the superficial "automation = good" mantra. The real reason is that you want a replicable process that any person or machine can run.

- To understand what migrations are and what are the two general types of migrations, **read this article on ["What are database migrations?"](https://www.prisma.io/dataguide/types/relational/what-are-database-migrations) (30 min)**

## Automating migrations (1 hour)

While many packages can help us with migrations, we will show a simple change-based migration system to understand better how it works.

We want to run a command that would run all migrations that have not been run yet. We need to track which migrations have been run and which have not. The simplest way to do that is to have a table in our database to track the migrations. We can use a timestamp as a migration ID.

**Step 5: To make sure we can use SQLite, install `better-sqlite3` (dep.) and `@types/better-sqlite3` (dev. dep.).**

Now, we will create a simple file structure for a change-based migration system:

```js
data/ // some folder to keep our SQLite database
src/
  database/
    migrations // folder for our migrations files
      20231007T071828Z-createArticleTable.ts // our first migration
    index.ts // our database instance
    migrate.ts // our migration system
```

**Spend a few minutes on reviewing each file** in the `src/database` folder. These files have comments explaining what they do.

Inside of the `database/migrations/migrate.ts`, you will find a variable called “migrations” (const). Inside of our migrations folder we have a single file, which contains SQL to create a table for articles.

Since this part's setup is quite manual, we manually import our SQL migration to our migration system.

Make sure that the **createArticleTable file is imported in the migrate.ts and it is included in the migrations array**. In a more advanced setup, we would have a way to import all migration files from a folder automatically.

We can run `npm run migrate:latest` to execute all migrations that have not been run yet. If you have set up everything correctly, you will see the “Migrations complete!” message. Otherwise, you will see “No migrations to run!” or even an error message.

If a database does not exist, it will be created, and all migrations will be applied. If we run `npm run migrate:latest` again, nothing will happen, as the database remembers which migrations it has run before. For this particular implementation to work, we must ensure that our migration file exports a `timestamp` and an `up` function.

We could even delete our SQLite database file and run `migrate:latest` to recreate it from scratch.

Running this script would then become part of our development process:

1. We notice that we need to update the database schema to something different than what we have now.
2. We create a new migration file inside `src/database/migrations` folder.
3. We run `npm run migrate:latest` to run it.

If someone else in our team wants to change the database schema, they would also need to create a new migration file, which will perform this change for them instead of applying it by manually connecting to a database.

In deployment, we would also run `migrate:latest` to ensure that our database is up to date before we start up the new version of our application.

Production-ready migration systems are more complex, but this is the general idea. Provide a list of migrations, track which migrations have been run, and run all migrations that still need to be run.

Spend some time to understand how this simplified migration system works. You can also add a new migration and run it.

**Adding new migrations**

If we run our migrations now, we will end up with a database with an `article` table.

Oops, we still need to add a new column `content` (`TEXT NOT NULL`)!

Let's assume we have already pushed our first migration to git, so other developers might have already run it (or it is already deployed), so **we can not change our existing migration**!

We need to build on top of our existing migration.

**Step 6:** Create a new migration file that adds the `content` column to the `article` table.

Once it is ready, run `npm run migrate:latest` to run it. If it fails, you can fix it and run `migrate:latest` again. Once it succeeds, you should not change it again. If you need more changes, create new migration files.

## Exercise: Use SQLite database in article model (1 hour)

Now that we have set up our `article` table let's update our model file to use the database instead of an in-memory array.

**Step 7: Update your article model file to use the database instead of an in-memory array. This should not break any of your existing functionality.**

## Examining a provided solution (1 hour)

**Step 8: Investigate the provided solution to see how various issues were addressed.**

[Download the solution](https://drive.google.com/file/d/13fiy5fCYq2a3QVviCKXGLHboe1YZ2NYI/view?usp=drive_link).

The provided solution is far from perfect, often deliberately so, to capture a similar work-in-progress state you might have at this point. You might have come up with a different solution, which is fine. Try to understand the provided solution and look for any parts you want to replicate in your solution. Read the comments in the code as they provide additional context.

# Directions for further research (1 hour+)

- What makes a request idempotent? Why would we want to make a request idempotent?
- What is Command Query Segregation? How does it apply to CRUD operations?
- How would you deal with requests for non-existing resources?

**Optional advanced directions for further research:**
  - What are the key differences between REST, GraphQL, and gRPC APIs?
  - HTTP is not the only protocol for APIs. If we wanted to build a real-time application, we could use WebSockets. What are the key differences between HTTP and WebSockets?

## Optional: Common use cases for Express middleware (0.5 hours)

There are some everyday use cases for Express middleware. **Spend ~30 minutes to explore the packages that pique your interest:**

- logging ([pino](https://www.npmjs.com/package/pino), [winston](https://www.npmjs.com/package/winston), [morgan](https://www.npmjs.com/package/morgan))
- authentication ([passport](https://www.npmjs.com/package/passport))
- error monitoring ([sentry](https://www.npmjs.com/package/@sentry/node))
- parsing the request body ([body-parser](https://www.npmjs.com/package/body-parser) - built-in through `express.json`, [multer](https://www.npmjs.com/package/multer))
- security practices ([helmet](https://www.npmjs.com/package/helmet), [cors](https://www.npmjs.com/package/cors))
- compression ([compression](https://www.npmjs.com/package/compression))
- serving static files (`express.static`)

You do not need to use these packages for your project right now. However, we wanted to introduce you to some of the most common use cases for middleware for learners interested in Express ecosystem.
