MUST: update the exercise
Part 4: Hands-on: Monorepo

# Part Introduction

This part of the course is designed to not only synthesize your previous lessons but also to stretch your capabilities by working on a full-stack application situated in a monorepo setup. By the end of this section, you will have built a minimal full-stack blogging platform. As a preparatory step for your capstone project, this exercise will help you gain confidence in handling both the client-side and server-side aspects of web development.

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

The project has progressed a bit since the last part.

1. It has the endpoints we have worked on in the previous parts.
2. It has a work-in-progress auth system to allow users to sign up and log in.
3. The front-end developer has added a minimal front-end design to the project.

Here are the **requirements for the project**:

1. Any visitor can public see a list of articles on the homepage.
2. A visitor can sign up and log in as a signed up user.
3. A user can post a new article.
4. A user can post a comment on any article.
5. Any visitor can see the comments on the article.
6. Each comment shows the first name and last name of the user who posted it.

**Optional requirement**:

7. An article author can mark a comment as spam, which will hide the comment from the article for everyone.

You will start with a monorepo that contains a frontend and a back end. The front-end client already has most of the visual-centric code implemented. The frontend has some static placeholder data that you will replace with real data from the back end.

Your tasks are to:

- finish implementing a few more endpoints on the back end;
- instead of using placeholder data, connect the frontend to the back end.

## Technical requirements

- The application should hash the password and not return it to the client under any circumstances.
- The application can return comment author's id, first name and last name, but not the email or password.
- The application performs some reasonable validation on user input.
- The key user flows are tested with E2E tests.
- The application should return article's comments and their authors' public information in a single request.

Implementing anything beyond the requirements, such as pagination, is entirely optional.

## Project starter

**Step 0.** Setup the project.
{{ MUST: Update the link }}
1. [Download the project starter](https://drive.google.com/file/d/1o3KWOKqs6ul1FETnRRZRlu_itpDCwAEs/view?usp=drive_link).
2. Run `npm i` in the top-level folder to install all dependencies.
3. Create a new PostgreSQL database, or use your existing one from previous exercises.
4. Setup `.env` files in the `client` and `server` folders based on `.env.example` files.
5. Run the database migrations by running `npm run migrate:latest` in the `server` folder.
6. Start the front-end and back-end development servers by running `npm run dev` in the `client` and `server` folders.
7. Explore the app's UI. It is a minimal Vue 3 app built with [Flowbite components](https://flowbite-vue.com/) and [Tailwind CSS](https://tailwindcss.com/). Knowing how these packages work is not required for this exercise as we will focus on the back end.

There are a few minor gotchas with cross-package type safety.

- Sometimes, TypeScript might not immediately pick up the type changes. You might need to jump to the file exporting a type for TypeScript to pick up the changes. If that does not help, you might need to run "Developer: Reload Window" in the VS Code command palette. Your mileage may vary.
- It relies on the back end to provide the correct types. If the back end is not type-safe, the front end will also not be type-safe.

A few notes on the starter project:

- You can navigate through the existing front-end code without any authentication. It does not make any calls to the back end yet. You could provide random credentials, and it would pretend to log you in.
- You might it best to reuse and adapt some code from the previous exercises.
- It includes various helper functions that you might find helpful - `entities/tests/fakes.ts`, `tests/utils/**`. However, you are not required to use them.

## Recommended approach

1. Setup
2. Think through required API endpoints
3. Start with the signup and login endpoints
4. Add an endpoint for creating an article
5. Add a repository method for getting a list of comments with their authors
6. Add an endpoint for getting a list of comments with their authors
7. Add an endpoint for creating a comment
8. Add real login and authentication to the client
9. Add route guards to protect routes that require authentication
10. Run E2E tests and replace fake front-end data with real data from our API server
11. Handle errors

## How to work with a monorepo

First, you must **decide on the approach** you will take to build this application. There are two main approaches:

A. Think of the front end and back end as mainly independent. Implement all your endpoints in the back-end and then jump to the front-end. This is great if you can easily plan out which fields you will need in the database.
B. Think of the application as a single unit and simultaneously work feature-by-feature on the front-end and back-end. This is a better approach if you can easily visualize what should happen on the page but you are not sure what endpoints you will need.

Here is an example of the A approach:

1. Start with a **unit test** for a module necessary to implement some feature. For example, "As a visitor, I can sign up with an email and a password." would require a procedure that would create a user in the database. So, we would start with a test for that procedure - there should be a `user.signup` procedure that would accept an email and a password and create a user in the database.
2. Implement the procedure. We would implement a `user.signup` procedure in this example.
3. Repeat this for every other back-end module necessary to implement the feature.
4. Once a particular set of back-end functionality is implemented, possibly all of it, we will start working on the front-end. We would start with an E2E test that would map to the user story. For example, "As a visitor, I can sign up with an email and a password." would require an acceptance test that would simulate a user going through the application and signing up. We would use an E2E test as we are familiar with them.
5. We would make sure our E2E tests pass.

Here is an example of the B approach:

1. Start with an **acceptance E2E test** - a test that maps directly to a user story. For example, "As a visitor, I can sign up with an email and a password.". This test would be an E2E test that would run in a browser and would simulate a user going through the application.
2. Go line-by-line through the test (pseudo-code):
  - `page.visit('/signup')` --> create a `/signup` route in the front-end
  - `emailInput.fill('user@domain.com')` -> add an email input to a form in the page
  - ...
  - `expect(successMessage).toBeVisible()` -> make sure that a success message is displayed
3. Once you bump up against a missing functionality, such as a missing route, a missing form input, a missing success message, etc., you would implement it.
4. Sometimes, you must add a procedure in the back end. Then, you jump to your server code and specify a test to drive your server-side development. Then, you implement the procedure and make sure that the test passes.
5. Jump back to the front end and ensure your E2E test passes.

The result is the same. However, the process is different.

We recommend working with the first (A) approach when working on this application, as it allows focusing on the same set of tools for a longer time. Then, you can get into the groove of writing back-end tests, writing procedures, etc. Then, you only need to "wire up" the client to the back-end API server.

Using the latter (B) approach would require us to switch between front-end and back-end more often, and it is more suited when you are very familiar with the tools you are using and have just 1 - 2 features to implement. Alternatively, it is useful in the exploration phase when you are OK with mixing some fake static data and real data in the front end.

## Additional comments

Sometimes, you will need to refer to some entity types in your front end, such as `User`, `Article`, etc. Without any setup, you would need to copy-paste these types to the front end. However, this would require you to maintain two copies of the same type, which is not ideal. Every time you would need to change a type, you would need to update it in two places. That's quite inconvenient and error-prone.

We could do better. Instead of copying the types, we can import them from the back end, which is closer to the source of truth. This way, we only need to maintain the types in one place.

So, **can we would not want to import everything to the front-end**? Well, there are a few reasons why we would not want to do that:

- our back-end handles private data, such as database connection details, API keys, etc. We do not want to expose that to the front end. That would be a security breach.
- our back-end might contain secret methods around the business logic.
- our back-end server might load in megabytes of code in size, while our front-end should be as small as possible.

**What should you import from the back end?** You can import the necessary types, but avoid importing business logic. Remember that if something is imported to the front end, it immediately becomes public. Someone could open the browser console, snoop around your code, and find your private business logic or secret keys if you import them to the front end. That could lead to a security breach.

**We have added a `shared` folder in the back end**, which should be used to import types to the front end. Sharing some pure functions that do not rely on configuration or back-end dependencies is also possible.

If you ever need to import something from the back end, use **import from `@server/shared/...`** statements. Also, we have added an ESLint rule to disallow other cross-package imports to make it easier to spot when you are importing something you should not.

## Bonus challenges

Since we will be working on a very minimal application, we can only cover some topics you would encounter in a real-world application. Here are some bonus challenges that you can try to tackle:

- Add pagination for projects and bugs.
- Handle expired access tokens.
- Add OAuth authentication with GitHub.
- Use cookies for authentication instead of local storage.

## Approach to Solving the Task

Follow this approach to tackle the hands-on exercise:

- Spend up to 10 hours attempting to solve the task on your own.
- If you struggle during the first hours and find it too difficult, try seeking help from your peers or JTLs for an additional 10 hours. Spend half of this time working with someone else, whether a study buddy, a peer who has completed the exercise, or a JTL in an open session.
// MUST: update the guide to reflect the new approach
- If you still need help, look at [the provided solution](https://drive.google.com/file/d/1VMKySTmrxedH9K5vQdKb5jQgPl_7Npkl/view?usp=drive_link) and [its walkthrough guide](https://drive.google.com/file/d/1NSyue4W5W0jtadZQ6AmWU5A_8T-s3dZ1/view?usp=drive_link). Spend up to 10 hours on the walkthrough.
- Try to go back to your solution once the provided solution clears up any obstacles you encountered.
- We recommend checking the final provided solution, even if you have completed the task on your own, to compare approaches and potentially learn new techniques.
