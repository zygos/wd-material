Part 4: Hands-on: Full-stack monorepo application (Solution)

### Step 1. Setup

Install dependencies, set up a database, and add `.env` variables based on `.env.example` files.

Open up at least two terminals. Start the front-end client and the back-end server in development mode:

```bash
# terminal 1
cd client
npm run dev

# terminal 2
cd server
npm run dev
```

Browse through the web app and see what it does.

### Step 2. Think through required API endpoints

What endpoints do we need to implement to make the app work?

We should review the user flow and consider what data we need to send and receive.

```md
As a visitor:

- I can sign up with an email and a password.
- I can sign in with an email and a password.

As a user:

- I can create a new project.
- I can see a list of my projects.
- I can see a list of bugs for a given project.
- I can mark a bug as resolved.
- I can sign out.

As an external service:

- I can report a new project bug by calling an API endpoint.
```

While we could start from any endpoint, we recommend working in the same order as the most common user flow.

In our case, our main flow is:

1. Visitor signs up and logs in.
2. A user sees a list of their projects.
3. A user creates a new project. A project contains a list of bugs.
4. A user can call a public endpoint on our API to report a bug.
5. A user can see all reported bugs for their project.

We could map these steps to endpoints:

- Signup = creating a new user.
- Login = creating a login token.
- Listing projects = fetching all projects for a given user.
- Creating a project.
- Reporting a bug = creating a new bug.
- Seeing a list of bugs = fetching all bugs for a given project.

Since the primary user flow starts with signup and login, we will begin with these endpoints.

### Step 3. Start with the signup and login endpoints

Given that you have already followed the previous exercises, you should be able to reuse a good chunk of your existing code.

We will skip the signup and login endpoints, as already implemented in the previous exercises.

### Step 4. Add an endpoint for creating a project

We need at least two endpoints to work with projects:

- creating a new project
- fetching user's projects

Let's start with the `project.create`.

Creating a project requires two things:

- project data, which is sent in the request body
- user ID, which we get from the request token

Also, we need to make sure that only logged-in users can create projects. We can do that in two ways:

- inside our main procedure function, we can check if the user ID is present in the provided token in the request headers
- we can create a separate middleware function that does the same for us

If you have followed the previous exercise, you should already have a middleware function that does this for us. It is called authenticatedProcedure. Here is how it roughly works:

```ts
export const authenticatedProcedure = publicProcedure.use(async ({ ctx, next }) => {
  // We can skip this middleware if we already have an authenticated user.
  // This also allows us to bypass this middleware in tests.
  if (authUser) return next(/* ... */)

  const token = getTokenFromHeader(ctx.req.header('Authorization'))
  const authUser = getUserFromToken(token)

  // Add authUser to the context, which is passed to the main procedure function.
  return next({
    ctx: { authUser },
  })
})
```

The complete fleshed-out example is provided in the solution. Also, it is slightly upgraded and slightly detached from `jsonwebtoken` package.

For project endpoints, we followed a very two-step approach:

- add a test that calls an endpoint and checks for its response
- add the procedure function that handles the request

For the first `project.create` endpoint, we could have the following test:

```ts
it('should create a persisted project', async () => {
  // ARRANGE
  const db = await createTestDatabase()
  const { create } = projectRouter.createCaller({ db })

  // ACT
  const projectCreated = await create({
    name: 'My Special Project',
  })

  // ASSERT
  expect(projectCreated).toMatchObject({
    id: 1,
    name: 'My Special Project',
  })
})
```

This is a very similar test setup to our signup/login tests.

Apart from the fact that this test would fail, we have one major issue - how can we pass in the user ID? After all, it is provided by the token, and we don't have a way to pass in the token. Should we pass it as an Express header?

We do not need to pollute our project tests with request-level details, especially since (presumably) we have tested our authentication middleware separately.

We can use the fact that our authentication middleware function does not run anything auth-related if we provide the `authUser` upfront. Then, we can pass in the `authUser` to the `create` caller:

```ts
const { create } = projectRouter.createCaller({
  authUser: {
    id: 1,
  },
  db,
})
```

That should get us through the authentication middleware and the main procedure function. If we start implementing the procedure function by using the provided `ctx.authUser.id` to set `userId` before we insert the project, we will stumble upon one issue:

```
INSERT INTO "project"("user_id", "name") VALUES ($1, $2) RETURNING "id"
...
Error: insert or update ... violates the foreign key constraint.
```

Our project provides a user ID, but that user does not exist in the database.

This raises a question - should we create a user in the test? This is one of the drawbacks of testing with a database that enforces foreign key constraints. We could either:

A. Disable foreign key constraints in the test database. It simplifies the test setup, but we lose some of the safety guarantees we would expect from running tests against a database.
B. Create a user in the test. This is more work, but it is safer. We then simulate this endpoint much closer to how it would work in production.
C. Mock the database with some fake JavaScript object. This is quite easy, but it exposes various implementation details of the repository. Also, if we do not have a good idea of what we would need out of the repository up front, we might have issues writing a test before writing the actual code.

A is a hack that is well-suited for seeding the database with some initial fake data. However, we would like to preserve foreign key constraints if we test the API endpoints.

B requires more work, but setting up additional fake data is quite a hassle. This is an excellent approach to maximize confidence in our tests. However, these tests tend to be slower and can require more work to maintain.

C is a good approach if we want to test the API endpoints in isolation; however, if we are learning a new library, such as TypeORM, and we rely on its repositories, we will start leaking implementation details into our tests where our tests will start reflecting the methods used in the repository. This can be alleviated with more specific repository methods or an intermediate service layer. We will stick with the provided TypeORM repository for a small project like this.

We will go with the B approach for this endpoint - we will create a user in the test.

```ts
const user = await db.getRepository(User).save({
  id: 1,
  email: 'a@b.com',
  password: '123', // not a hash, but project tests do not touch this
})
```

This should be sufficient to get us through the first test. However, if we need to create a user in every test, we might want to extract this into a helper function:

```ts
export const fakeUser = <T extends Partial<User>>(overrides: T = {} as T) => ({
  email: 'some@email.com',
  password: 'Password.123!',
  ...overrides,
})
```

It is not only for convenience but also to minimize the number of places we would need to change if we decide to change the user entity. If we added a new mandatory field, `firstName`, our previous implementation would break, and it would require us to change all these breaking tests one by one:

```ts
// Every test that manually sets up user data would break
const user = await db.getRepository(User).save({
  id: 1,
  email: 'a@b.com',
  password: '123',
})
```

However, we might think about the straightforward case of creating multiple users in the same test. It does not seem so far-fetched, right? We should check if one user can see another user's projects. In that case, we must create two users in the same test. Now our hard-coded `email` of `some@email.com` would fail. How could we address this?

We should have a random email for each user. While we could build a function for that ourselves, this is a common problem someone else might have already solved. And indeed, quite a few packages do this for us. If we wanted an extensive library that does this and much more, we could use `faker.js`. However, it is heavyweight, and from personal experience, it slows down the tests by a decent 10 - 20% overhead (depending on other factors). For this reason, we will use a much smaller package called `chance` ([docs](https://chancejs.com/)). It is a tiny package with fewer features than `faker.js`, but it is also much faster to import.

We can then use it like this:

```ts
```

We have added `fakeUser` as a helper function in `entities/tests/fakes.ts`. You could choose a different location for this function. Still, we wanted to be relatively close to the modules that will change hand-in-hand with these fake entity-generating functions. Also, to separate it from the actual entities, we added it to a `tests` folder. Separating modules from the actual source code just for tests is strongly encouraged. Most of the time, having these modules in `tests`, `__tests__` folders, or `.spec` and `.test` files is enough.

Now, we can create a user in our test like this:

```ts
const random = new Chance()

// ...
{
  email: random.email(),
  password: 'Password.123!',
  ...overrides,
}
```

**Pro tip.** Once in a blue moon, you might encounter a situation where your tests fail due to some conditions arising from the random nature of the test. To mitigate it, share a single Chance/Faker instance across all your tests and provide an initial seed for your tests. This way, your tests would be deterministic, and you could reproduce the same test failures locally and on CI.


```ts
// random.ts
export const random = config.isCi ? Chance(1) : Chance()

// config.isCi is a parsed process.env.CI variable that we import from config.ts
```

Why would we not run all of our tests with the same seed? If we generate random fake data that is different run-to-run, we can test on top of an existing database. Then, without changing our tests, we could even run our tests on an in-memory fake database and a real PostgreSQL database!

That is precisely what we did - we have adapted `createTestDatabase` from our previous exercises to allow us to do just that:

```ts
// a simplified version of the createTestDatabase function in the solution
export async function createTestDatabase() {
  const db = process.env.TESTS_USE_IN_MEMORY_DB === 'false'

    // real PostgreSQL that we configured in .env
    ? createDatabase(config.database)

    // in-memory db version of PostgreSQL
    : createMemoryDatabase()

  await db.initialize()

  return db
}
```

Then, with a few config options, we can run our tests in both modes:

```json
// package.json
"scripts": {
  "test": "vitest",
  "test:db": "TESTS_USE_IN_MEMORY_DB=false vitest",
}
```

**Note.** If you are running Windows, you might need to install [cross-env](https://www.npmjs.com/package/cross-env) and add it to the script command to run it successfully.

Finally, we recommend adding `id` to the `fakeUser` function so that we can create a fake user for other purposes, such as creating a fake token, which needs an ID but it does not need to make any database calls so that it can be a fake id number. The database will not care about the actual value of the ID.

Now, having this sort of setup is quite helpful because we can create a user in our test like this:

```ts
const user = await db.getRepository(User).save(fakeUser())

const { create } = projectRouter.createCaller({
  db,
  authUser: { id: user.id },
})
```

We have added one more thing to our `projectCreate.spec` test:

```ts
// authContext function that forms the authUser object for us
// so if we change the authUser shape, it does not require us
// to change lots of tests to reflect that change
const { create } = projectRouter.createCaller(authContext({
  db,
}, user))
```

That was a good amount of setup, but we will not need to do it again for the next test.

You can review the server `project/create/index` procedure in the solution. It includes a few things that are best covered in code comments.

### Step 5. Add endpoint for finding user's projects

Finding user projects is very similar to creating a project. You can review the `project/find/index` procedure and its test. We have kept it close to the previous endpoint, so it should be easy to follow.

### Step 6. Add endpoints for reporting and finding bugs

We can use the same approach as we did for projects to report and find bugs. The one difference is that now we are seeing how adding a bug requires us to have a project, which requires having a user. There are three methods to address this:

A. Share the same seed data across multiple tests.
B. Do not test with a database; test with a mock.

For reporting and finding bugs, we will use the first approach. We will create a function `setupBugTest` to create the necessary database rows to reuse across multiple tests. You can find it in `modules/bug/tests/setup.ts`.

Then, we can use it in our tests like this:

```ts
// ARRANGE (Given)
const { db, project, user } = await setupBugTest()
const { report } = bugRouter.createCaller(authContext({ db }, user))

// ACT (When)
// create bug

// ASSERT (Then)
// check if a bug is created and how we expect it to be
```

One significant difference between bug and project procedures is that we no longer can directly know all the necessary details about permissions from the request. If a person is creating a bug for projectId = 5, we do not know if they can do that. We will need to check if they have access to that project, which, in our case, means that they are the project's owner (`project.userId === authUser.id`). We could check that in every procedure or create a middleware function that does that for us. We will go with the latter approach. This middleware demands `projectId`, which is then used to fetch the `project` and check if the `authUser` is the project's owner. If they are, we can proceed with the request. Otherwise, we can throw an error.

You can find it in the server's `trpc/projectIdOwnerProcedure` folder. It will have an additional `provideRepos` statement that we will touch on in the next step.

### Step 7. Add an endpoint for marking a bug as resolved

We will provide a few testing methods without a database for this endpoint. One of them is to provide a database mock. If we know what methods we will use on the repository, we can create a mock that will return the needed data. Unfortunately, this introduces a decent bit of implementation details into our tests:

```ts
// For example, our test would end up needing the following mock:
const db = {
  getRepository(entity: string) {
    if (entity.name === 'Project') {
      findOne: () => ({ id: 1, userId: user.id }),
    }

    if (entity.name === 'Bug') {
      update: () => ({ affected: 1 }),
      findOneByOrFail: () => ({
        ...bug,
        // Instead of saving a boolean, such as isResolved
        // we save the resolvedAt date as it captures more
        // information that we realistically could need in
        // this type of application. In your own solution,
        // you are free to use a boolean if you want.
        resolvedAt: new Date(),
      }),
    },
  },
}
```

This is not a very good approach for two reasons:

1. It is pretty verbose.
2. It requires us to hunt down all the repositories and methods we use in the procedure function.
3. It exposes the implementation details of the repository.

We could shift our procedure from depending on the database to the repositories it explicitly asks for to address the first two issues. This way, we can see what repositories we need and mock them in our tests. For mapping `db` to asked dependencies, we have added a helper function `provideRepos` that you can find in `trpc/provideRepos`. It essentially does the following:

```ts
// pseudo-code with rough logic, not type accurate
const provideRepos = (entitiesWanted) => middleware(({ ctx, next }) => {
  if (hasAllRepositories(/* ... */)) {
    return next(/* ... */)
  }

  const repos = entitiesWanted.map(key => ctx.db.getRepository(key))

  return next({
    // add repos to the context
    ctx: {
      repos,
    },
  })
})
```

Then, in our procedure, we no longer touch the TypeORM DataSource directly, but we ask for repositories instead:

```ts
export default projectIdOwnerProcedure
  // what repositories do we depend on
  .use(provideRepos({ Bug }))

  // what user input do we need
  .input(bugSchema.pick({ id: true })) // id of the bug we want to mark as resolved

  // what we do and return
  .mutation(async ({ input: { id }, ctx: { repos } }) => {
    await repos.Bug.update({ id }, { resolvedAt: new Date() })

    const bugUpdated = /* ... */

    return bugUpdated
  })
```

For this to work, we had to extend the context in `trpc/index.ts`. Then, in tests, we provide fake repositories through a small helper function:

```ts
const { resolve } = bugRouter.createCaller(
  authRepoContext(
    {
      Project: {
        findOne: () => ({ id: 1, userId: user.id }),
      },
      Bug: {
        update: () => ({ affected: 1 }),
        findOneByOrFail: () => ({
          ...bug,
          resolvedAt: new Date(),
        }),
      },
    },
    user
  )
)
```

However, we still expose ourselves to implementation details that would be hard to anticipate. Also, if we find out that there are some more optimal ways to accomplish the same result, our test would need to follow the implementation details. That is not a very good approach if we want to have robust tests. A better approach would involve either extending the default repository with custom methods that are more specific to our use case or creating a service layer that would hide the implementation details of the repository. However, this goes beyond the scope of this exercise.

### Step 8. Using the signup E2E test, replace fake client signup with signup through the server

Now that we have implemented most of the necessary endpoints, we can connect the client to the server.

There is an E2E test `signup` that we can run with `npm run test:e2e`.

The most straightforward approach to call the back-end in the front-end is to import the `trpc` client where we need it:

```ts
// SignupView.vue
import { trpc } from '@/trpc'

const userForm = ref({
  email: '',
  password: '',
})

async function submitSignup() {
  await trpc.user.signup.mutate(userForm.value)

  // ... redirect to a successful signup page
}
```

### Step 9. Add real login and authentication to the client

This is a slightly tricky part. Instead of just calling the tRPC login, we would like to do something with its response, which includes `accessToken`. Given that we will need to pass this token to every request and might have a few places interested in the current user, we should keep this logic in a separate file.

We will create a `user.ts` file in the `stores` folder. It will contain the following:

```ts
import { trpc } from '@/trpc'

export async function login(userLogin: { email: string; password: string }) {
  // login might not be considered a mutation, but we are considering it as such
  // given that it creates a new "thing" - an access token.
  const { accessToken } = await trpc.user.login.mutate(userLogin)

  storage.setItem('token', token)
}
```

We would then pass this auth token to all procedures in the `Authorization` header.

```ts
// trpc/index.ts
export const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      // ...
      headers: () => {
        const token = localStorage.getItem('token')

        if (!token) return {}

        return {
          Authorization: `Bearer ${token}`,
        }
      },
    }),
  ],
})
```

We are dealing with tokens in multiple places in our application. If we wanted to change the token's name, we would need to change it in multiple places. We should consider colocating all auth-token functions in a single module. We used `utils/auth.ts` for that.

### Step 10. Add route guards to protect routes that require authentication

We want to keep dashboard routes protected from unauthenticated users. If a user tries to go to the `/dashboard` route, we would like to redirect them to the login page.

We can do that by using a route guard.

While we could use a global route guard, we will use a local one as it is easier to reason. You can find more details on per-route guards in the [Vue Router docs](https://router.vuejs.org/guide/advanced/navigation-guards.html#Per-Route-Guard).

We can add a simple guard function that checks if the user is logged in, and if not, it redirects them to the login page:

```ts
// router/guards.ts
export const authenticate = () => {
  // isLoggedIn would be a function that checks if the user is logged in
  // if the user is not logged in, we redirect them to the login page
  if (!isLoggedIn()) return { name: 'Login' }

  // if the user is logged in, we can continue
  return true
}

// router/index.ts
const router = createRouter({
  routes: [
    /* ... */
    {
      path: '/dashboard',
      component: DashboardLayout,
      beforeEnter: [authenticate], // guard
      children: [
        // all routes here will be protected by the authenticate guard
      ],
    }
  ],
})
```

How would we implement `isLoggedIn`? While we could check `localStorage` for the token, moving away from low-level APIs and using a more high-level abstraction is recommended. We could use a variable for tracking if a user is logged in.

```ts
// stores/user.ts

// This does not have to be a ref, but it would allow us to use it in
// components as a reactive variable, which is sometimes useful
// if loggedIn state can change without navigation to a different route.
export const isLoggedIn = ref(!!getStoredAccessToken(localStorage)) // true if token is present

function login(/* ... */) {
  // ...
  isLoggedIn.value = true
}
```

Then we could import it in our route guard:

```ts
if (!isLoggedIn.value) return { name: 'Login' }
```

This is acceptable, but a more versatile approach would be to use a pipe `authToken` => `authUser` => `isLoggedIn`. Then, we would worry only about managing the `authToken` correctly, and everything else would be set automatically for us by `computed` properties. This is the approach we took in the solution. Then, our `login` (or `logout`) does not need to worry about setting the `isLoggedIn` variable; it just needs to deal with the token. You can find the implementation in `stores/user.ts`.

### Step 11. Replace fake front-end data with real data from API calls

At this point, we need to replace all remaining hard-coded client data with data from the server. One way to do it is to wrap existing functionality in E2E tests and then replace the hard-coded data with API calls.

We have added `e2e/project.test.ts` for that purpose. It goes through the entire flow with a new user and project. It is more verbose than the previous tests but is quite similar overall.

It uses a new `loginNewUser` helper function that creates a new user and logs them in if they do not exist. It allows us to bypass checking the same login UI flow in every test, which is relatively slow, and we have already tested it in `user.test.ts`, so we do not need to test it again and again.

Then, we replaced all the hard-coded data with API calls. You might notice the `useErrorMessage` composable in the solution, which seems to be used in a few places. It is a generic error handling composable that we will cover in the next step.

### Step 12. Add any missing endpoints and handle errors

We have added a procedure for getting a single project, which is useful on the project details page. We could try getting all user projects and filtering them on the front end, but that might not be the best idea if we want to add pagination in the future.

What about handling errors on the client?

We would handle them in a simple `try`/`catch` block:

```ts
const errorMessage = ref('')
async function submitSignup() {
  try {
    await signup(userForm.value)

    // display a success message
    hasSucceeded.value = true

    // clear error
    errorMessage.value = ''
  } catch (error) {
    // set error, which will be automatically displayed
    errorMessage.value = error instanceof Error ? error.message : DEFAULT_SERVER_ERROR
  }
}
```

We could also use a more generic approach and create a Vue composable that does the generic error handling for us. We could use it like this:

```ts
const [submitSignup, errorMessage] = useErrorMessage(async () => {
  await signup(userForm.value)

  hasSucceeded.value = true
})
```

It takes in a function and returns a function that sets the error message if the function throws an error:

```ts
// simplified version
const errorMessage = ref('')

const fnWrapped = (fn: Function) => {
  try {
    const result = await fn()
    // fn is the function that we pass in:
    // await signup(userForm.value)
    // hasSucceeded.value = true

    // clear error message
    errorMessage.value = ''

    return result
  } catch (error) {
    errorMessage.value = getErrorMessage(error)

    if (doRethrow) throw error
  }
}

return [fnWrapped, errorMessage]
```

**Note.** We did not flesh out all error handling, and various auth flow cases. For example:

- What happens if a request fails due to a network error? Is the user notified?
- What happens if a request fails due to an expired token? We want to catch these errors, possibly at the tRPC client level, and redirect the user to the login page.

We could cover many more cases, such as rate limiting, pagination, caching, and managing front-end loading states and state management, but this is beyond the scope of this small exercise. We already did quite a bit of work to get to this point.
