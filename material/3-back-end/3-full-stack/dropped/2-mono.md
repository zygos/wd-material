**Pro tip for Windows/Linux:** You can pin VS Code to a particular position in your taskbar, let's say as a 2nd icon from the left. Then, you can press `windows key + 2` to jump to your VS Code instance. Then, it is recommended to always open up your VS Code instances in specific order. For example, your first VS Code instance is always your front-end, your second VS Code instance is always your back-end, etc. This way, `win + 2` = front-end, `win + 2 + 2` (2 twice) = back-end, etc. This is superior to using `alt + tab` as this is deterministic and it does not care if you have switched to another application in the meantime. You could blindly press the same key combination and you would always get the same result. For Linux users, this works slightly differently based on your desktop environment.

**Pro tip for macOS:** You can press cmd + \` (Command–Grave accent above `Tab` key). This is less deterministic than the Windows approach, but it is more convenient if you only have a two VS Code instances open.

---

We have an **acceptance E2E test** in our project. It is inside the `client/e2e` folder. You can view it as a high-level test that would resemble your stakeholders (product owner, users, etc.) going through your application trying to get something done.

Acceptance tests are a great way to drive your development as they draw a boundary of what you should be working on next. They are not great for covering edge cases, sad paths, driving our application design or pinpointing the exact location of a bug. For that, we will add more isolated tests to drive the development of individual modules.

**Step 4.1.** Run the test with `npm run test:e2e` in the `client` folder or use Playwright VS Code extension. It should fail.

**Attention.** If you get a Playwright message stating that you do not have the browsers installed, you can either:
  - run "Test: Install Playwright Browsers" in VS Code command palette if you have Microsoft's Playwright plugin
  - run `npx playwright install`

**Note.** For simplicity, we have disabled testing on multiple browsers. Our focus right now is not on cross-browser testing. By default, we are testing against Chromium (Chrome) as it tends to run the fastest in Playwright. You can edit `playwright.config.ts` to use Firefox or WebKit (Safari) instead.

**Step 4.2.** Let's say we want this fix applied on the back-end. Go back to the `HomeView.vue`. Alt-click on the `greet` method (or press `F12`, or "Go to Definition" in command palette) in your `trpc.user.greet...` call to jump to its definition in the back-end. This is some proper TypeScript magic.

Now we will introduce a **double loop TDD flow**. Our end-goal is to get our acceptance test to pass. However, we will drill down to isolate the cause of our issue and fix it in isolation. In our case, that is the `user.greet` procedure. We will make sure we are fixing it there first and then we will come back up to our E2E test to make sure it passes.

This is a great way to work with TDD in full-stack applications. However, it is quite difficult to get used to it. We do not expect you to be able to build all or even most features exclusively through this flow. However, we expect you to be able to use it for some isolated parts of your application. For example, you might use it to drive the development of some key user flow, such as signup.

In most cases, our E2E test will not test the same thing as our isolated test. Usually, for our E2E acceptance test to pass, we would need to break it down into multiple smaller steps and some of these steps would require functionality in the back-end, which we would test in isolation.

**Step 4.3.** In a new terminal instance, run `npm test user` in the `server` folder or `npm test user -w @mono/server` in any folder. This will run the `user.spec.ts` file living inside the `modules/user` folder. It should pass. However, that seems like a conflict with our acceptance test. Our high-level acceptance test requires to greet the user with an exclamation mark, but our isolated test does not. We should resolve this conflict. In our case, we can assume that the E2E is correct and our isolated test is wrong. We will fix it by adding an exclamation mark to the `user.greet` procedure test.

**Step 4.4.** Update the `user.spec.ts` to match our updated requirement of greeting the user with an exclamation mark. Then it should fail, which now is in alignment with our acceptance test.

**Step 4.5.** Update the implementation of the `user.greet` procedure to pass the back-end `user.spec.ts` test.

**Step 4.6.** Rerun the E2E test. It should pass.

---

**Step 1.** Add your first acceptance test.

Now, we will present what was done to arrive to the current starting template. Check each step against the provided template. You will need to carry out similar steps to complete some remaining requirements.

Let's start with the first requirement:

```
As a visitor, I can sign up with an email and a password.
```

How would we know that we have implemented this requirement? Well, we might not be sure what we will need to do to implement this requirement. But we can imagine what the end result should be. If we, as a page visitor can sign up with an email and a password, then it is a good sign that we have implemented this requirement or at least some essential part of it.

You might need a slight refresher on E2E tests, so we have already included this first test for you. You can find it in `client/e2e/user.spec.ts`.

1. Make sure you have started your front-end and back-end development servers.
2. Run the E2E test either by using VS Code Playwright extension or by running `npm run test:e2e` in the `client` folder.
3. The test should fail as we have not implemented the necessary functionality yet.

What do we need to do to make this test pass? Since our acceptance test is an E2E test, it is a bit easier to start working from the front-end.

**Attention.** If you get a Playwright message stating that you do not have the browsers installed, you can either:
  - run "Test: Install Playwright Browsers" in VS Code command palette if you have Microsoft's Playwright plugin
  - run `npx playwright install`

**Note.** For simplicity, we have disabled testing on multiple browsers. Our focus right now is not on cross-browser testing. By default, we are testing against Chromium (Chrome) as it tends to run the fastest in Playwright. You can edit `playwright.config.ts` to use Firefox or WebKit (Safari) instead.

**Step 2.** Add the necessary front-end components.

1. A page visitor would navigate to the `/signup` page. At the start, we had no route for that, so we added a `/signup` route to our front-end router (`client/router/index.ts`). We did not have any page to point it to, so we pretended that we had a `views/SignupView.vue` page component and added an import for it.
2. Then, we added `SignupView.vue` page component to `client/src/views` folder. Now our test browser can at least find the page component.
3. Then, to satisfy the E2E test, we added a form with email and password fields to `SignupView.vue`.
4. Finally, we need to display a success message to the user once they have signed up. We would need som logic for that. We added a `signup` function, which gets triggered once the user submits the form. What our `signup` function should do?

A. We could display a success message in the same `SignupView.vue` page component.
B. We could redirect the user to a different page, such as `/signup/success`.

All approaches are valid and it is up to you to decide which one to use. We went with option A. However, we could have went with other options, which is a benefit of flexible tests that are not tied to a specific implementation. Of course, if there was an explicit requirement that user should (not) be redirected to a different page, then we would add it to our test from the start.

We added `data-testid="successMessage"` to an element with a congratulatory message. This allows us to find the element in our E2E test.

At that point our E2E test passed. However, you probably noticed that we did not actually signed up the user. The whole point of signing up is to create a user in our database that can be used to sign in and manage personal projects, bugs, etc.

So, we need to call the back-end to create a user. Let's jump to the back-end.

**Step 3.** Add a test for necessary back-end functionality.

If we had a REST API, we would need to add a new endpoint, such as `POST /v1/users`.

For a tRPC API, network requests are abstracted away. What is happening here? Our `server/src/app.ts` has `app.use('/v1/trpc')` which creates express middleware function. So we are running tRPC on top of Express. Neat.

To build the middleware function, it uses:

- context - a set of shared data and modules that are passed to each procedure. In our case, we see that `createContext` provides the database via the `db` variable.
- router - a list of functions that are exposed to the front-end.

tRRPC router works similarly how our Express router used to:

```ts
// Express
import { Router } from 'express'

const router = Router()

router.post('/v1/users', async (req, res) => {
  const user = parseUser(req.body)
  // ...
})
```

```ts
// tRPC router (not the same as Express router)
import { publicProcedure, router } from '@server/trpc'

export default router({
  signup: publicProcedure
    .input(z.object({ /* ... */ }))
    .mutation(({ input, ctx }) => {
      // ...
    })
})
```

To keep our app organized into behaviour-specific modules, we are using separate modules for each controller/service. Then, our tRPC appRouter is just a combination of all of these modules.

```ts
// modules/index.ts - responsible for combining all modules
import { router } from '../trpc'
import user from './user'

// our app router is just a collection of all routers inside of our modules
export const appRouter = router({
  user,
})
```

Alright, so we have a `user` module that is responsible for all user-related functionality. What does it need to do? Let's remember what we are working on - user signup. OK, let's add a test for that to lock-in what we need to do.

Hmm, we do not know what we should do at this point. Since we are no longer working with REST API, doing an integration test with `supertest` is not an easy option. Our endpoints will be abstracted away by tRPC. So, how can we test it?

We could to call it and check its result. If we would dig a little bit into [tRPC documentation](https://trpc.io/docs/server/server-side-calls), we would find out a bit more about how to call our back-end procedures. We can use the examples in the documentation to come up with a plausible test:

```ts
import userRouter from '..'

// TypeScript complains that: Property 'db' is missing in type '{}'
const { signup } = userRouter.createCaller({})

it('should signup a user', async () => {
  const user = await signup({
    // ...
  })

  expect(user).toEqual({
    // ...
  })
})
```

This complains that the `db` is missing. We can fix it by providing a database. We could use:

- A PostgreSQL database which writes everything to the disk. That would introduce various technical challenges that come with a persistant database that can last between multiple test runs. Ideally, in development, we would like to work from a clean slate in every test.
- A database stub which returns some fixed result every time. Unfortunately, this can quickly lead to a lot of boilerplate code just for testing. Also, we would lose some confidence that our tests are actually testing the real code. This might be a fine approach in a different type of application, but in our case, this would introduce more problems than it would solve.
- An in-memory SQLite database (yes, we can use still SQLite!) even if we generally run our application on PostgreSQL. Our ORM (or even a query builder) can abstract away the differences between the two databases as long as we are not using any database-specific features. This is a great option as it is fast, it is easy to set up and does not require thinking about cleaning up and database connections.

Since our table schema is not using any PostgreSQL specific features, we can use swap our database for SQLite in our tests. We will not be using SQLite in production, but it is a great option for testing.

**Note:** It is possible to configure a project to use a hybrid approach - running SQLite in development and using PostgreSQL before deployment on a test-running machine in the cloud. This might be a good approach if there are some differences between SQLite and PostgreSQL that we want to catch in our tests. There are more approaches using virtual machines. However, we will not go into that.

We have added a simple `createInMemoryDatabase` utilty function for our tests that creates a temporary database through `better-sqlite3` and auto-syncs its tables to match our entities. That database is local for that particular file and once the tests are done, it is automatically destroyed.

---

However, we understand that TDD is a hard discipline to follow. In a sense, we are showcasing a highly professional TDD workflow that involves the front end and the back end. That is no easy feat. In your capstone project, we will not expect you to be able to develop your entire application in the same manner. However, we will expect you to be able to work in this manner at least for some isolated parts of your applications. These parts might be tiny or they might involve a long user flow.

---

Review the updated `server/src/modules/user/signup/userSignup.spec.ts`. We have added lots of comments and a few additional tests for email and password validation.

**Step 4.** Add an implementation for the necessary back-end functionality.

We need the following:
- a `userSignup` procedure
- a tiny wrapper that allows calling `userSignup` procedure

Here is very minimal implementation:

```ts
// modules/user/index.ts <- index.ts responsible for combining all user-related routes
import { router } from '@server/trpc'
import signup from './signup'

export default router({
  signup,
})
```

```ts
// modules/user/signup/index.ts
import z from 'zod'
import { publicProcedure } from '@server/trpc'

export default publicProcedure
  .input(
    // we could move this into a shared schema that we could
    // use for login and signup
    z.object({
      email: z.string(),
      password: z.string(),
    })
  )
  .mutation(({ input: { email } }) => {
    // save it to the database
    const user = /* ... */

    // return it to the front-end
    return {
      email: user.email,
    }
  })
```

In our REST API, we used to inject the database by providing it as an argument for a controller function. In tRPC, we are using a different approach, which is more flexible, though a bit less explicit. We are passing in a `ctx` (context) object, which we can use to provide any dependencies that we need. In our case, we only care about the database.

We have added the necessary User entity (id, email, password) and used it through a repostory to save it to the database.

Our implementation is very simple. Get the email and password from the input, save it to the database and return some data back to the user. We have added a few comments to the code to explain what is happening.

**Step 5.** Connect to the back-end from the front-end.

We have added a `client/src/trpc.ts` file which is responsible for creating a tRPC client connecting to our back-end. It imports the `AppRouter` from the back-end using npm workspace package name `@mono/server`.

The simplest approach to call the back-end in the front-end is to import the `trpc` client where we need it:

```ts
// SignupView.vue
const userForm = ref({
  email: '',
  password: '',
})

const signup = async () => {
  await trpc.user.signup.mutate(userForm.value)

  // ... redirect to a successful signup page
}
```

We alternatively could move out this logic to a file or even wrap it inside a store. However, for now, we will keep it simple.

Even though our front-end and back-end will be running in different environments - front-end on the user's browser and back-end on our server - we can see ensure that we have type safety between the two. If we change the back-end by changing/removing methods or properties, our front-end will flare up with errors without us needing to go out and hunt for them.

Before proceeding to other features, we could refactor our front-end code to use a store instead of directly accessing the `trpc` client. Dealing with `trpc` client directly is nearly the same as dealing with a `fetch` inside a component. It is not the worst thing you could do, but in larger applications, it is recommended to use the following data flow: components -> store -> API "glue" (tRPC) -> back-end. This allows us to implement some additional app-wide features, such as caching, searching through already fetched records, etc. without needing to change our components. For a small application like ours, it is not necessary, but it is a good practice to follow. You can check out the `client/src/stores/user` folder for various examples, some simply hiding the fact that we are using tRPC while others wrapping tRPC calls inside a Pinia store.

---

## Exercise: Full-stack application (6 hours)

Now that you have seen how to implement a feature from start to finish, it is time to try it out yourself. You will need to implement the following features:

- I can create a project.
- I can see a list of projects.
- When there are no bugs, I can see a message congratulating me.
- When there are bugs, I can see them in the project page.

We are keeping the remaining requirements for the next part. For now, you can assume that all pages are public. We will add them in the next part.

Depending on how comfortable you are with the provided template, you can add a few more sad paths to your tests.

Work on using the following double loop full-stack TDD flow:

1. **Pick a single requirement to work on**.
2. **Write it out as an acceptance test**, usually an E2E test if it is a user-facing feature. It is OK to write your first test in a very rough terms with naive assumptions.
3. **Implement the necessary front-end functionality**. This might involve adding a new page, adding a new component, adding a new store, etc.
4. If you find that you need to perform some operations with the database (querying, inserting, updating, etc.), that means we need our back-end to provide a way to do that. **Add a test for what you want your back-end to do**. This might mean a test for a new procedure.
5. Implement the necessary back-end functionality. You can do that outside in - create a new API procedure and once you bump up to a particular thing that you need, but you do not yet have it (e.g. an entity) - create it.
6. Once your back-end test(s) passes, go back to the front-end and **connect to the back-end**.
7. Finish up your front-end implementation and **make sure that your acceptance test passes**.

**Reminder.** Explore using a single editor for the entire monorepo vs using two editors for each package (client and server). Try to find an approach that works best for you.

---

**Step 2.** Investigate the `client` part.

We have added a simple Vue 3 front-end with a single view - `client/src/views/HomeView.vue`.

There are 2 new files that you should be aware of:

- client/src/config.ts - similar to our back-end config, but a bit simpler
- client/src/trpc.ts - our tRPC client, which will use our back-end types AND our configuration to perform network requests

---
