Part 4: Hands-on: Monorepo

# Part Introduction

This part of the course is designed to not only synthesize your previous lessons but also to stretch your capabilities by working on a full-stack application situated in a monorepo setup. By the end of this section, you will have built a small full-stack bug reporting tool. As a preparatory step for your capstone project, this exercise will help you gain confidence in handling both the client-side and server-side aspects of web development.

You will step into the shoes of a developer who's just received a half-finished minimal viable project: the front-end of a bug-reporting platform is visually alright but it lacks any back-end functionality. The front-end has some placeholder data, and it's your job to breathe life into this static prototype by developing a back-end that can save and serve real data from a database. You'll also need to connect the front-end to the back-end, so that the two can communicate with each other.

# Key learning topics & resources for this part

## Monorepos (0.5 hours)

  - Watch (up to 2:50; everything else is optional): [Monorepos](https://www.youtube.com/watch?v=9iU_IE6vnJ8) (3 mins)
  - Watch [Monorepo vs Polyrepo](https://www.youtube.com/watch?v=avnByO69eI8) (10 mins)
  - Watch: [Monorepo to Multirepo and Back Again](https://www.youtube.com/watch?v=lV8-1S28ycM) (10 mins)

As you might have noticed, there is no single way to structure an application involving multiple packages (front-end, back-end, etc.). As always, there are various trade-offs that we need to consider. In our current situation, we are most suited to use a monorepo:

- we want to empower you to build a full-stack application (front end + back end)
- we are using a single programming language (TypeScript)
- we are using a single package manager (NPM)
- your capstone project will have a team of 1 person (that's you, hi!)

Given these circumstances, a monorepo is an easy choice. We will now start following the following project structure:

```
client/
  ... all our front-end code
server/
  ... all our back-end code
```

## Exercise: Monorepos with NPM Workspaces (1 hour)

  - Watch and follow: [Monorepo with NPM Workspaces](https://www.youtube.com/watch?v=4CpR-_Nyd00)

**Note:** It is also okay to run `npm` commands inside each package folder. For example, you can run `npm run dev` inside the `server` folder and separately inside the `client` folder. Depending on your workflow, you will want 2 - 6 terminal instances open in a monorepo project.

**How should you work with monorepos in your IDE?**

There are two main ways to work with monorepos:

**A. Monorepo as a single project** - you open up the monorepo in your IDE and work with it as if it were a single project. Then, you use split panes to work with multiple packages simultaneously. For example, you are working with the front end on the left and the back end on the right. It is an excellent option when working on a feature requiring many front and back changes.

Pros:

- you can see your entire project in a single place
- you do not need to switch between multiple editors
- you can easily search/replace/refactor across the entire project

Cons:

- front-end/back-end code gets mixed up where multiple file tabs close to each other are entirely from different packages
- more challenging to navigate within each package. Since there can be more files with similar names, it is more difficult to navigate within each package using `ctrl/cmd`+`p` or searching for package-specific files.
- you might need quite a few terminal instances if you want to run commands separately for each package
- some VS Code extensions might not work correctly as not all IDE extensions were designed to work with monorepos

**B. Monorepo as multiple projects** - you work with each package as a separate project with separate VS Code instances for your front-end and back-end. This allows you to focus on a single package at a time.

Pros:

- you can focus on a single package at a time
- you can use separate VS Code configurations for each package
- it is easier to navigate within each package

Cons:

- it takes slightly more time to start up your entire project
- you need to switch between multiple editors, so you should be proficient with your OS/editor's keyboard shortcuts
- it is more challenging to perform search/replace/refactor across the entire project
- sharing types between front-end and back-end is laggier - you sometimes need to jump to the file exporting a type for TypeScript to pick up the changes

Try out using both approaches, especially in the provided monorepo exercises. Find a method that works best for you, but do not forget to revisit your choice and try out alternative workflows.

# Task Description

You will continue working on the tiny bug-reporting application for the remainder of this part. It is designed to allow registered developers to add new projects and report bugs for those projects via a public API endpoint. The application will also allow developers to mark bugs as resolved. In this case, the users are the developers who are using the application to track bugs in their projects.

1. Visitor signs up and logs in.
2. A user sees a list of their projects. The list is empty at first.
3. A user creates a new project by providing its name.
4. A user can see a list of bugs for their project. The list is empty at first.
5. A user can call a public API endpoint to report a bug for their project.
6. A user can see all reported bugs for their project.
7. A user can check a bug as resolved.

You will start with a monorepo that contains a front-end and a back-end. The front-end client already has most of the front-end code implemented. You will need to add the necessary back-end code, connect the front end to the back end, and replace the current dummy data in the front end with data from the back-end server.

## Requirements

As a visitor:

- I can sign up with an email and a password.
- I can sign in with an email and a password.
- I can not visit any `/dashboard` pages if I am not signed in.

As a user:

- I can see a list of my projects on a dashboard page.
- I can create a new project.
- I can see a list of bugs for my projects on a project page.
- I can mark a bug as resolved.
- I can sign out.

As an external service:

- I can report a new project bug by calling a public API endpoint. This endpoint is public as it could be called inside a mobile app, a desktop app, a user's browser, etc. It does not require authentication. In practice, it would require the user to provide a project API key, but we will not implement that for this exercise.

## Technical requirements

- The application should hash the password and not return it to the client.
- The application should use tRPC for full-stack type safety.

## Project starter

**Step 0.** Setup the project.

// MUST: link downloading the `4-monorepo-starter`.
1. Download the project starter.
2. Run `npm i` in the top-level folder to install all dependencies.
3. This project supports 0-setup back-end. Try running the back-end with `npm run dev:mem` in the `server` folder. It should start up a development server with a PostgreSQL-like in-memory database.
4. We recommend to work with your actual PostgreSQL database. Setup `.env` files in the `client` and `server` folders based on `.env.example` files.
5. Start the front-end and back-end development servers by running `npm run dev` in the `client` and `server` folders.
6. Explore the app's UI. It is a minimal Vue 3 app built with [Flowbite components](https://flowbite-vue.com/) and [Tailwind CSS](https://tailwindcss.com/).

It has a minimal front-end design sufficient to communicate the main user flow. This part focuses on the back end and connecting our front end to the back end. We do not expect you to do any design work here.

There are a few minor gotchas with cross-package type safety.

- Sometimes, TypeScript might not immediately pick up the type changes. You might need to jump to the file exporting a type for TypeScript to pick up the changes. If that does not help, you might need to run "Developer: Reload Window" in the VS Code command palette. Your mileage may vary.
- It relies on the back end to provide the correct types. If the back end is not type-safe, the front end will also not be type-safe. Unfortunately, TypeORM has issues with type safety for relations, so we must be careful. To ensure output type safety, we could add [output validators](https://trpc.io/docs/server/validators#output-validators).
- Zod strips out additional properties. We can chain `.strict()` after our Zod schema to explicitly throw an error for passed-in additional properties. This is not reflected in the TypeScript types.

A few notes on the starter project:

- You can navigate through the existing front-end code without any authentication. It does not make any calls to the back end yet. You could provide random credentials, and it would pretend to log you in.
- You should reuse and adapt your existing code from the previous exercises.
- It includes various helper functions that you might find helpful - `entities/tests/fakes.ts`, `tests/utils/**`. However, you are not required to use them.
- The project exposes [pg-mem](https://github.com/oguimbal/pg-mem) instead of SQLite in-memory database for tests and running the project with `npm run dev:mem`. `pg-mem` more closely resembles a proper PostgreSQL database and is more suitable for testing.
- By default, the server `npm run test` sets `DB_TYPE=pg-mem` and runs tests on the fake in-memory PostgreSQL database. However, the project is flexible enough to run tests and the main application in any configuration. You can run `npm run test:db` to run tests against your configured PostgreSQL development database instead. You might need to write your tests slightly differently to make them work with a real database.

## Recommended approach

1. Setup
2. Think through the required API endpoints
3. Start with the signup and login endpoints
4. Add an endpoint for creating a project
5. Add an endpoint for finding user projects
6. Add endpoints for reporting and finding bugs
7. Add an endpoint for marking a bug as resolved
8. Using the signup E2E test, replace fake client signup with signup through the server
9. Add real login and authentication to the client
10. Add route guards to protect routes that require authentication
11. Replace fake front-end data with data from API calls
12. Add any missing endpoints and handle errors

## How to work with a monorepo

First, you must **decide on the approach** you will take to build this application. There are two main approaches:

A. Think of the front end and back end as primarily independent. Implement all your endpoints in the back-end and then jump to the front-end.
B. Think of the application as a whole and simultaneously work feature-by-feature on the front-end and back-end.

Here is an example of the A approach:

1. Start with a **unit test** for a module necessary to implement some feature. For example, "As a visitor, I can sign up with an email and a password." would require a procedure that would create a user in the database. So, we would start with a test for that procedure - there should be a `user.signup` procedure that would accept an email and a password and create a user in the database.
2. Implement the procedure. We would implement a `user.signup` procedure in this example.
3. Repeat this for every other back-end module necessary to implement the feature.
4. Once a particular set of back-end functionality is implemented, possibly all of it, we will start working on the front-end. We would start with an E2E test that would map to the user story. For example, "As a visitor, I can sign up with an email and a password." would require an acceptance test that would simulate a user going through the application and signing up. We would use an E2E test as we are familiar with them.
5. We would make sure our E2E tests pass.

Here is an example of the B approach:

1. Start with an **acceptance test** - a test that maps directly to a user story. For example, "As a visitor, I can sign up with an email and a password.". This test would be an E2E test that would run in a browser and would simulate a user going through the application.
2. Go line-by-line through the test (pseudo-code):
  - `page.visit('/signup')` --> create a `/signup` route in the front-end
  - `emailInput.fill('user@domain.com')` -> add an email input to a form in the page
  - ...
  - `expect(successMessage).toBeVisible()` -> make sure that a success message is displayed
3. Once you bump up against a missing functionality, such as a missing route, a missing form input, a missing success message, etc., you would implement it.
4. Sometimes, you must add a procedure in the back end. Then, you jump to your server code and specify a test to drive your server-side development. Then, you implement the procedure and make sure that the test passes.
5. Jump back to the front end and ensure your E2E test passes.

The result is the same. However, the process is different.

We recommend working with the first (A) approach when working on this application, as it allows focusing on the same set of tools for a longer time. Then, you can get into the groove of writing back-end tests, writing procedures, etc.

Using the latter (B) approach would require us to switch between front-end and back-end more often, and it is more suited when you are very familiar with the tools you are using and have just 1 - 2 features to implement.

## Additional comments

**The role of `server/shared` folder**

To understand the `shared` folder, we must ask ourselves **why we would not want to import everything to the front-end**? Well, there are a few reasons:

- our back-end handles private data, such as database connection details, API keys, etc. We do not want to expose that to the front end. That would be a security breach.
- our back-end might contain secret methods around the business logic.
- our back-end server might load in megabytes of code in size, while our front-end should be as small as possible.

**What should you import from the back end?** You can import the necessary types, but avoid importing business logic. Remember that if something is imported to the front end, it immediately becomes public. Someone could open the browser console, snoop around your code, and find your private business logic or secret keys if you import them to the front end. That could lead to a security breach. In our application, we added a `shared` folder in the back end, which should be used to import types to the front end. Sharing some pure functions that do not rely on configuration or back-end dependencies is also possible.

For back-end-to-front-end imports we will **import from `@mono/server/src/shared/...`**. We will not rely on your memory alone to remember this. We have added an ESLint rule to disallow other cross-package imports, which is a good security measure.

## Bonus challenges

Since we will be working on a very minimal application, we can only cover some topics you would encounter in a real-world application. Here are some bonus challenges that you can try to tackle:

- Experiment with different testing approaches when dealing with the database - an in-memory database, a real PostgreSQL database, a mocked database, etc.
- Use cookies for authentication instead of local storage.
- Handle expired access tokens.
- Add OAuth authentication with GitHub.
- Add E2E tests for user stories ("As a user, I can...").
- Add pagination for projects and bugs.
- Display a bug count on the project page that would be correct even if the front-end client does not get all the bugs from the back-end.

## Approach to Solving the Task

Follow this approach to tackle the hands-on exercise:

- Spend up to 10 hours attempting to solve the task on your own.
- If you struggle during the first hours and find it too difficult, try seeking help from your peers or JTLs for an additional 10 hours. Spend half of this time working with someone else, whether a study buddy, a peer who has completed the exercise, or a JTL in an open session.
- If you still need help, look at the provided solution and walk through it step-by-step. Spend up to 10 hours on the walkthrough.
- Try to go back to your solution once the provided solution clears up any obstacles you encountered.
- We recommend checking the final provided solution, even if you have completed the task on your own, to compare approaches and potentially learn new techniques.

=> 20 hours
