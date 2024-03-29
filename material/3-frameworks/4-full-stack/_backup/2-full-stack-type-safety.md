Part 2: Full-stack type safety

# Part introduction

Throughout this part of the module, we will focus on strategies that ensure consistency and reliability in the types of data that flow between the client and server sides of an application. As modern web applications become increasingly complex, type safety across the entire stack is essential in reducing bugs, easing maintenance, and improving the developer experience.

To bridge the gap between client and server, we'll introduce you to the concept of "design by contract". For a TypeScript-first experience, we'll go hands-on with tRPC. This library simplifies building RPC APIs, which offer an alternative to REST APIs and bring type safety to the forefront.

# Key learning topics & resources for this part

## Full-stack type safety (1.5 hours)

In the back end, we specify our types via explicit types, ORM models, or validation schema. If you remember how we developed our **front end**, we manually added types to our API calls. For example:

```ts
export async function fetchPhotoByDate(dateIso: string) {
  const response = await fetch(
    `https://api.our-api.com/planetary/apod?api_key=${apiKey}&date=${dateIso}`
  )

  //How would our front end know what the shape of the response is?
  return await response.json()
}
```

We would need to add these types manually:

```ts
// a type for our API response
type Photo = {
  copyright: string;
  date: string;
  explanation: string;
  hdurl: string;
  media_type: string;
  service_version: string;
  title: string;
  url: string;
}

// ...
return await response.json() as Photo
```

Calling our internal API with a regular REST API would look very similar.

This presents an issue of **missing type safety**.

If we changed an API endpoint, our front end would not know about it. It receives a plain JSON string from an API endpoint, and it can not understand what the shape of the response is. We declare it is of a particular type, such as `Photo`. There is no way for our front end to know that the API endpoint has changed and that it now returns a differently shaped object. That means if we use `photo.copyright` in the front end as a string and our API has changed to allow ' photo.copyright` to be `null`, our front-end app would break.

Of course, having tests should cover many of these issues; however, no matter how much we encourage adding tests, there are better options than testing the same thing from multiple points. We should be able to focus our testing on more severe issues, such as business logic, instead of having to validate data types.

What about validating the response on the front end? That would help, as our front end would throw an error earlier. However, what if our test data does not create a situation where the API endpoint returns `null`? We would need to catch the issue in our tests. We need to create a new front-end test for various combinations of API responses.

The issue arises due to our types living in two different places - in our back-end and front-end. They should be in sync, but we cannot guarantee they are in sync because we have to cross the network boundary.

One popular method to address this issue is **design by contract** - we specify a "contract" between the front-end and back-end. The contract is defined via a schema. Two popular ways to do that are GraphQL schemas or OpenAPI schemas. It is not particularly important how one or the other works. The main idea is that there is a formal specification of the API that the front-end and back-end can work together with. If a request is made to endpoint X, it should return an object in the shape of Y.

Then, some TypeScript packages use these schemas to generate the necessary front and back types. Both sides of our application need to follow the given "contract". For example, the back end must always return a response that matches the schema. If the back-end changes the response, it needs to update the schema. Then, the front end can automatically update the types based on the schema. If there is a mismatch between the schema and the front-end types, the front-end will flare up with type errors. That means we would catch any issues in our front-end code before running it.

Large companies, such as Facebook, use this approach. It is great if you are dealing with a large codebase where there are multiple front-end clients (web, mobile apps, desktop apps) and when the back-end is developed by different teams using different programming languages.

Unfortunately, these setups are not beginner-friendly, introducing additional complexity and code generation steps that would slow us down. Luckily, we are using TypeScript back-to-front, so we have a few alternative options that allow us to reap the benefits of type safety without the additional complexity of technologies such as GraphQL.

One of these options is **tRPC**.

**First of all, what is RPC?**

We have already explored REST APIs, the most popular way to build APIs that third-party developers use. If you are making an application that exposes some endpoints for third parties, you will likely use REST APIs.

However, REST APIs are not the only way to build APIs. Another viable approach is RPC. RPC stands for **Remote Procedure Call**. While there might be better approaches if we use many front-end clients and different programming languages, it is an excellent way to build a full-stack TypeScript application.

It brings the front-end and back-end closer together and allows us to interact with our back-end as if it were a set of functions. In other words, we define a set of functions in the back-end that deal with the database, business logic, etc. Then, the front-end client can seemingly call these functions. Of course, we are not calling these functions directly. Instead, we call a front-end function to send a request to the back-end and wait for a response.

We call this function a **remote procedure**. Then, we can interact with our back-end as if it were a part of our front-end code, even though our front-end code is running in the browser and the back-end code is running on a different machine.

Here is a basic RPC example (pseudo-code):

```ts
// Our back-end Node.js server
export function createUser(user: UserInsertable) {
  // ...
}

// Our front-end code, which would call /createUser in the back-end
const user = await client.createUser({
  name: 'John',
  email: 'john@doe.com',
})
```

In contrast to REST APIs, RPC APIs do not impose many constraints on the API design. That does not mean we will not use any design constraints - in fact, we recommend using the same general design principles (with a few exceptions) as we did with REST APIs.

The main difference between a REST API and an RPC API stems from more granular control over a list of exposed methods. Instead of exposing a single `PATCH user/:id` that would decide what to do based on the provided data, we would provide various methods, such as `user.verify`, `user.ban`, `user.resetPassword`, etc.

As with everything, there are pros and cons to RPC APIs. The main advantage is that it is easier to build RPC APIs when you have complete control over the front and back end. The main disadvantage is that our client (web app front-end) will now be **tightly coupled** with our server (back-end). This is a problem if you want to build a back-end API that web apps, mobile apps, third parties, etc, can use. In that case, REST APIs might be a better choice.

Most of the time, choosing between multiple tools is a trade-off. In this case, we are trading API generalizability for simplicity and ease of use, which is a good trade-off if we are looking to build a full-stack application for the module capstone project.

**What is tRPC?**

tRPC is a TypeScript-first library for building RPC APIs. We will use it together with Express.js to build a type-safe full-stack application.

- Scroll through [tRPC homepage](https://trpc.io/)
- Read: [tRPC concepts](https://trpc.io/docs/concepts) (5 mins)
- Watch: [Quick tRPC introduction](https://www.youtube.com/watch?v=S6rcrkbsDI0) (6 mins)
- Watch: [Lear tRPC](https://www.youtube.com/watch?v=UfUbBWIFdJs) up to 35:00, we will not deal with web sockets
- Examine: [Front-end + Back-end tRPC Example](https://stackblitz.com/github/trpc/trpc/tree/main/examples/minimal?file=client%2Findex.ts&file=server%2Fdb.ts,server%2Findex.ts&view=editor) (10 mins)

**Mutation vs. Query.** tRPC uses the same mutation and query terminology as GraphQL. A mutation is a procedure that changes the state of the server. A query is a procedure that does not change the server's state. For example, `user.signup` would be a mutation as it creates a new user in the database. `user.get` would be a query as it does not change the server's state. There are two reasons for this distinction:

- It is easier to reason about procedures when we know it will or will not change the server's state.
- We can perform all queries as `GET` requests, which the browser or our server can cache. Mutations are usually `POST` requests, which are not cached.

**Note.** There are a few more alternatives to tRPC, such as [ts-rest](https://ts-rest.com/) that allow type-safe full-stack REST API development, but we will use tRPC as it is a simpler and a more popular library for codegen-free TypeScript type safety.

**Note.** We will not use tRPC subscriptions in this module.

## Exercise: Setting up tRPC (1 hour)

**Task.** Follow [tRPC Getting started guide](https://trpc.io/docs/quickstart) to set up a minimal tRPC project with a server and a client. In our applications, `client` will refer to the front-end app with Vue, React, etc., and `server` will refer to the back-end app with Node.js. Our front-end will deal with the user interface, and our back-end will deal with the database, business logic, etc. tRPC will be the layer that connects the two.

With tRPC, you will be able to do some neat things that would be impossible with a regular REST API or even a GraphQL API without additional code generation:

- if you are on your client, you can see all available endpoints, what you need to pass in, and what you will get back
- once you have changed something in your server that would break your client, your client will pinpoint the issue for you
- if you are in your client, you can run "Go to definition" (`F12` or `alt + click`) on any endpoint and it will take you to the server code
- if you are on the server, you can run "References: Find all references", and it would show all the places where this endpoint is used in the client
- you can refactor your endpoints, and the client will automatically update ("Rename symbol")

Try out these actions in your mini tRPC project.

## Exercise: Writing and testing tRPC endpoints (6 hours)

This exercise will focus on the tRPC server part and how it differs from a regular Express.js server. We will use tRPC inside of Express, which means that we are not losing any of the flexibility of Express.js. We are only adding some type-safe functionality on top of it. It is even possible to have some endpoints in an application using regular Express.js `res` and `req` objects and some endpoints using tRPC. We could also use `req` and `res` in tRPC endpoints.

// MUST: add a link to `2-trpc-server`
**Step 0.** Download and setup `2-trpc-server` project:

1. Run `npm install` in the root directory to install dependencies.
2. If you still need to create a database for our bug-tracking project in the TypeORM exercise part, create a new PostgreSQL database now.
3. Add the connection details to a new `.env` file, which you can base on the `.env.example`
4. You might need to reload your VS Code if it does not pick up the new TypeScript types.

**Note.** In the next sprint part, we will discuss password handling, authentication, and authorization. For this part, we will not use any proper authentication or authorization. We will assume that every request is authorized to perform any action.

**Step 1.** Investigate the server.

While we are introducing a lot of new files, you should be already familiar with most of them. We are bringing the following parts together:

- Express.js server
- tRPC wrapper for type-safe API calls
- TypeORM entities

Here is a quick overview of the folders:

```
/database - connects to the database
/entities - TypeORM entities
/modules - our endpoints
/shared - a folder that we will expose to our front-end
/trpc - tRPC wrapper
/utils - a single function for validation
app.ts - our Express.js server definition
config.ts - zod-validated server configuration
index.ts - binds our Express server to a port
```

Everything from a few test utilities should be understandable under a few minutes of investigation.

**Step 2.** Fix the greeting message.

Let's say our requirements have changed, and now we must use an exclamation mark at the end of the greeting message.

1. Start the server by running `npm run dev`.
2. Run `npm test greet` to test our `user.greet` procedure (`modules/user/greet`).
3. Update the test to check for an exclamation mark!
4. Update the greeting procedure to return a greeting with an exclamation mark.
5. Your test should pass 🎉.

**Step 3.** Add a signup procedure.

Let's add the most naive signup procedure possible. It should:

- accept an email and a password
- create a new user in the database (`User` entity). No password hashing, no nothing. We will work on this later.
- return an object containing just the `{ email }`.

**Start with a test**. We have already added a `signup.spec.ts` to show how to test a signup procedure. You will generally need to lean more on automated tests than on manual tests through a REST GUI client because RPC is slightly more tricky to test manually. However, you can still use a REST GUI client to [call the endpoints by hand](https://trpc.io/docs/rpc).

Then, add the `signup` procedure to the `user/signup/index.ts` file.

Besides our validated input, every procedure receives the context - `ctx`:

- if we run our entire application through `app.ts`, it would pass in our real database connection
- if we run our procedures in isolation in tests, we can pass in context ourselves. We can create a temporary in-memory SQLite test database and then pass it to our procedures through the `createCaller(ctx)` method. Then, this ctx will be available in our procedures.

**Step 3.** Use an already existing user schema for signup.

In the final TypeORM exercises, we have created Zod schemas for our entity validation. Right now, we are using a custom schema for our signup function. That is not a problem in itself, and we do not need to rush to reuse existing validation functions to minimize code repetition. However, there is a more pesky problem - we will need to add a login procedure in the future, and if it has its schema, it might get out of sync with the signup schema. One possible issue is that the user signs up with `Myemail@domain.com` and then tries to log in with `myemail@domain.com`. This would fail as the email is case-sensitive. We would then need to update the user's email in the database to lowercase, ensure that the signup procedure saves all emails in lowercase and that the login procedure converts the email to lowercase. We could have avoided this issue if we had a single thought-out schema that would be used for both signup and login.

Use an already existing `userSchema` (or `userInsertSchema`). Consider what would happen if you added more properties to the user entity in the future, such as `firstName`, `lastName`. Would your signup schema still work correctly? How could you derive a signup schema from the user schema that performs correctly, no matter what additional properties are added to the user entity?

**Hint.** Look into Zod's `pick` method.

**Step 4.** Add a schema validation that the password is between 8 and 64 characters long.

Also, add an easy-to-understand error message if the password is too short or too long. How could you add them to the existing schema? How could you add a friendly error message to each of these errors?

**Step 5.** Add the following procedures to your project:

- User can create a project (`project.create`).
- User can see a list of projects (`project.find`).
- User can see a list of bugs in a project (`bugs.find`).

You can also call these procedures more descriptively, such as `project.findProjectBugs({ ... })`.

Implement these 3 requirements as tRPC procedures. Try to start with a test for each procedure. Then, implement the procedure and make sure that the test passes. Use the already existing TypeORM entities.

Right now, you can assume that every endpoint is reached by an authenticated user with appropriate permissions. We will build upon these procedures in upcoming sprint parts.

**Hint.** You might need to create a new user in your tests. An alternative method would be to test with a mocked database that pretends to have a user.

# Directions for further research (1 hour+)

- How would you call a tRPC endpoint from a GUI REST client?
- What are the trade-offs between REST APIs and RPC APIs?
- How could you have a Express.js endpoints and tRPC endpoints in the same application?
- How could you deliver readable errors to the front end from your tRPC endpoints?

=> 10 hours
