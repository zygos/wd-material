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
const createCaller = createCallerFactory(projectRouter)
const db = await wrapInRollbacks(createTestDatabase())
const { create } = createCaller({ db })

it('should create a persisted project', async () => {
  // ARRANGE
  // nothing to arrange

  // ACT
  const projectCreated = await create({
    name: 'My Special Project',
  })

  // ASSERT
  expect(projectCreated).toMatchObject({
    id: expect.any(Number),
    name: 'My Special Project',
  })
})
```

This is a very similar test setup to our signup/login tests.

Apart from the fact that this test would fail, we have one major issue - how can we pass in the user ID? After all, it is provided by the token. Should we pass it as an additional field in the procedure? Or should we set it as an Express header?

We do not need to pollute our project tests with request-level details, especially since we have tested our authentication middleware separately.

We can use the fact that our authentication middleware function does not run anything auth-related if we provide the `authUser` upfront. Then, we can pass in the `authUser` to the `create` caller:

```ts
const { create } = createCaller({
  // pretend to be logged in as user with ID 1
  authUser: {
    id: 1,
  },

  // pass in the database connection
  db,
})
```

That should get us through the authentication middleware and the main procedure function. If we start implementing the procedure function by using the provided `ctx.authUser.id` to set `userId` before we insert the project, we will stumble upon one issue:

```
insert or update on table "project" violates foreign key constraint "project_user_id_fkey"
```

Our project provides a user ID, but that user does not exist in the database.

This raises a question - should we create a user in the test? This is one of the drawbacks of testing with a database that enforces foreign key constraints. We could either:

A. Disable foreign key constraints in the test database. It simplifies the test setup, but we lose some of the safety guarantees we would expect from running tests with a database.
B. Create a user in the test. This is more work, but it is safer. We then simulate this endpoint much closer to how it would work in production.
C. Mock the project repository with some fake JavaScript object. This is quite easy, but it exposes various implementation details of the repository. Also, if we do not have a good idea of what we would need out of the repository up front, we might have issues writing a test before writing the actual code.

A is a hack that is well-suited for seeding the database with some initial fake data. However, we would like to preserve foreign key constraints if we test the API endpoints.

B requires more work since setting up additional fake data is quite a hassle. At the same time, since we are dealing with real database-level constraints, we can be quite confident that our tests are quite close to how the application would work in production.

C is a good approach if we want to test the API endpoints in isolation from anything database-related.

For now, we will demonstrate the B approach for this endpoint - we will create a user in the test.

```ts
const [authUser] = await insertAll(db, 'user', { email: 'test@mail.com', password: 'Password.123!' })
```

This should be sufficient to get us through the first test. However, if we need to create a user in every test, we might want to extract this into a helper function that can be used to create multiple users with random emails.

```ts
import { random } from '@tests/utils/random'

export const fakeUser = <T extends Partial<Insertable<User>>>(overrides: T = {} as T) => ({
  email: random.email(),
  password: 'Password.123!',
  ...overrides,
})
```

While we could build a function for generating random emails ourselves, this is a common problem someone else might have already solved. And indeed, quite a few packages do this for us. If we wanted an extensive library that does this and much more, we could use `faker.js`. However, it is heavyweight, and it slows down the tests by a decent 10 - 20% overhead (depending on other factors). For this reason, we will use a much smaller package called `chance` ([docs](https://chancejs.com/)). It is a tiny package with fewer features than `faker.js`, but it is also much faster to import.

We have added `fakeUser` as a helper function in `entities/tests/fakes.ts`. You could choose a different location for this function. Still, we wanted to be relatively close to the modules that will change hand-in-hand with these fake entity-generating functions. Also, to separate it from the actual entities, we added it to a `tests` folder.

Now, having this sort of setup is quite helpful because we can create a user in our test like this:

```ts
const authUser = await insertAll(db, 'user', fakeUser())

const { create } = createCaller({
  authUser,
  db,
})
```

We have added one more thing to our `projectCreate` test:

```ts
// authContext function that forms the authUser object for us
// so if we change the authUser shape, it does not require us
// to change lots of tests to reflect that change
const { create } = createCaller(authContext({ db }, user))
```

That was a good amount of setup, but we will not need to do it again for the next test.

You can review the server `project/create/index` procedure in the solution. It includes a few things that are best covered in code comments.

### Step 5. Add an endpoint for finding user's projects

Finding user projects is very similar to creating a project. You can review the `project/find/index` procedure and its test. We have kept it close to the previous endpoint, so it should be easy to follow.

### Step 6. Add an endpoint for reporting bugs

We can use the same approach as we did for projects to report (create) bugs. The one difference is that now we are seeing how adding a bug requires us to have a project, which requires having a user. There are three methods to address this:

A. Set up some user and project database rows in the test. We will demonstrate this in the `bugResolve.spec.ts`.
B. Do not test with a database; test with a mock. We will demonstrate this in the `bugFind.spec.ts` and `bugReport.spec.ts`.

If we are testing with real database rows, we will need to create all the surrounding database rows in the test. In our case, dealing with a bug requires having a project and to have a project, we need a user to own it.

In that case, we are creating all the rows by hand:

```ts
const [userOwner, userOther] = await insertAll(db, 'user', [
  fakeUser(),
  fakeUser(),
])
const [project] = await insertAll(db, 'project', {
  name: 'My Project',
  userId: userOwner.id,
})
```

Then, we are performing some checks:

```ts
it('allows reporting a bug', async () => {
  // ARRANGE (Given)
  const { report } = createCaller(authContext({ db }, userOwner))
  const bug = fakeBug({ projectId: project.id })

  // ACT (When)
  const bugReturned = await report(bug)
  const [bugSaved] = await selectAll(db, 'bug', (eb) =>
    eb('id', '=', bugReturned.id)
  )

  expect(bugReturned).toEqual(bugSaved)
})

it('allows other users to report a bug', async () => {
  // ARRANGE (Given)
  const { report } = createCaller(authContext({ db }, userOther))

  // ACT (When)
  await expect(report(bug)).resolves.toMatchObject(bug)
})

// a few more conditions - non-logged-in user, what happens if incorrect projectId
// is passed, etc.
```

This is a fine approach. However, it can be a bit verbose, especially if each test requires a long chain of database rows to be created.

### Step 7. Add endpoints for getting and marking bugs as resolved

Getting a list of bugs is simple enough. We can follow the same approach as we did for the previous endpoints. One slightly tricky case is that seeing the list of bugs can be done only by the project owner. We can demonstrate this in the `bugFind.spec.ts` test.

```ts
it.todo('should return a list of bugs for the project owner')
it.todo('should throw an error if the user is not the project owner')
```

We could use the same general flow we used for the previous endpoint - create a few rows in the database and check who can get them.

However, we will use this as an opportunity to showcase a different approach - mocking repositories.

In our case, a very simple mock (a stub) might work the best. Here, we are providing a pair of fake repos that we will pass into our context. These will be used instead of the real repositories due to `provideRepos` middleware.

```ts
// For example, our test would end up needing the following fake repositories:
const repos = {
  projectRepository: {
    hasUserId: vi.fn(async () => true),
  },
  bugRepository: {
    update: vi.fn(async (id, bug) => ({ id, ...bug })),
  },
}
```

Wrapping the methods in `vi.fn` allows us to override the return value of these functions:

```ts
// if we add the following line in our test, it will override the return value
repos.projectRepository.hasUserId.mockResolvedValueOnce(false)
```

Then, we could use these repositories in our test:

```ts
const { resolve } = createCaller({
  authUser: { id: 1 },
  repos,
} as any)

// these ids are not important, just required by schema validation to be numbers
const bug = { id: 14, projectId: 24 }

// Example with a mocked database
it('should set a bug as resolved', async () => {
  // ACT (When)
  const bugResolved = await resolve(bug)

  // ASSERT (Then)
  expect(bugResolved).toMatchObject({
    id: bug.id,
    resolvedAt: expect.any(Date),
  })
})

it('should throw an error if user does not own the bug project', async () => {
  // we override the hasUserId method to return false in this case
  repos.projectRepository.hasUserId.mockResolvedValueOnce(false)

  // ACT (When) & ASSERT (Then)
  await expect(resolve(bug)).rejects.toThrow(/does not belong/i)
})
```

This approach works well enough if we have a small number of methods to mock. However, this can be tricky to write in TDD style as we would need to anticipate the methods we would need to mock.

Both approaches have their own pros and cons. Using a database connection (integration-style) requires more data setup, while the mock approach requires more setup in the test itself and some coupling with the implementation. The first one is closer to how the application would work in production and is great if we do not have a good idea of what we would need to mock. Meanwhile, the second one is great if we know what we need to mock, we want to test the controllers in isolation, or we want to test some edge cases that are hard to reproduce with a real database (database timeouts, network errors, etc.).

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
