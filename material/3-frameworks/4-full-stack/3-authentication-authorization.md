Part 3: Passwords, Authentication and Authorization

# Part introduction

The key difference between a front-end-only application and applications with a back-end is that the back-end applications store private logic and data that is not publicly available. Most of the time, that means that different users can access different data. For example, a user can only see their profile but not the profiles of other users. Users can only edit their posts, but not the posts of other users.

In this part, we will explore three key concepts:

- How do we handle passwords so we are not storing them in plain text, yet we can still authenticate users?
- How can we know which request is coming from which user?
- How can we limit access to certain parts of our application to specific users?

# Key learning topics & resources for this part

## Exercise: Handling passwords (4 hours)

We will explore various password, authentication, and authorization flows in an isolated environment. We will work with tRPC procedures and TDD.

**Step 0.** Set up a minimal Node.js project with TypeScript support.

Create a new folder for a project and run:

```
npm init -y && npm i @trpc/server zod && npm i -D tsx vitest @tsconfig/node18 @types/node
```

We will skip ESLint and Prettier setup.

Create the following `tsconfig.json` file:

```json
{
  "extends": "@tsconfig/node18/tsconfig.json",
  "compilerOptions": {
    "baseUrl": ".",
    "strict": true
  }
}
```

**Step 1.** Write a test for the tRPC endpoint adding a user into the database.

We will start with the most naive user creation flow - get an email and a password and store it in the database.

For this step, we will provide a minimal starting test.

```ts
// user.spec.ts
import { expect, it } from 'vitest'
import { userRouter, userRepository } from './user'
// you will need to implement ./user

const { signup } = userRouter.createCaller({})

it('creates in a user in the database', async () => {
  await signup({
    email: 'stephen@wozniak.com',
    password: 'apple.123',
  })

  const user = userRepository.find('stephen@wozniak.com')

  expect(user).toHaveProperty('password', 'apple.123')
})
```

We will do all our tests in `user.spec.ts` and all our code in `user.ts`. This way, we will see how everything works.

**Step 2.** Write a user implementation satisfying the test.

We will not be using a real database. So there is no need to use TypeORM, Kysely, or anything else. We will use a simple JavaScript array to store our users. You should not need additional libraries beyond `@trpc/server` and `zod`.

Write a `user.ts` file that satisfies the test. Write a straightforward implementation that stores users in an array: no databases or hashing.

If you need a hint, click below.

<details>
  <summary>Hint</summary>

```ts
import { initTRPC } from '@trpc/server'
import { z } from 'zod'

const { procedure, router } = initTRPC.create()

export const userRouter = router({
  signup: procedure
    .input(z.object({
      //What should we expect to get?
    }))
    .mutation(({ input: user }) => {
      // create a user
    })
})

export const userRepository: UserRepository = {
  list: [],
  create(user) {
    // ...
    return { id: 1 } // dummy id
  },
  find(email) {
    // ...
  },
}

type User = {
  email: string
  password: string
}

type UserRepository = {
  list: User[]
  create(user: User): { id: number }
  find(email: string): User | undefined
}
```
</details>

You can check out the solution in the `auth-2` folder, which can be [downloaded here](https://drive.google.com/file/d/1GGpsfrykXsFswDfrIeneOOjtfu-LxMPV/view?usp=drive_link) (as well as all the other solutions).

**Note.** In these exercises, we are not using dependency injection as you still might feel uncomfortable with it while we are introducing new concepts. However, if you want a more testable solution, add dependency injection to this exercise. Generally, that would involve passing `userRepository` to the `ctx` and then passing in additional dependencies that we will use later as arguments to the router/procedures.

**Step 3.** Do not store the password in plain text.

- Watch: [Password Storage Tier List](https://www.youtube.com/watch?v=qgpsIBLvrGY).

Unfortunately, data breaches and password [leaks are common](https://www.upguard.com/blog/biggest-data-breaches). If we store the password in plain text, anyone accessing our database can see all the passwords. This is a terrible idea.

How could we adapt our current implementation to store the password more securely?

We could use a hashing function. A hashing function is a function that takes some input and returns a string of characters. The same input will always return the same string of characters. However, going from the string of characters back to the input is impossible. This is called a one-way function.

**Update the current test to check that the password is not stored in the same way as it was provided**. We will use a hash function that returns a 64-character long string. You can add that to the test.

Then, update the implementation to use a hashing function.

We will start with a `pbkdf2Sync` function in Node's built-in `crypto` module. It can be used in the following way:

```ts
// You should store passwordHash as the password. Do not worry about other arguments for now. We will get to them later.
const passwordHash = pbkdf2Sync(user.password, '', 1000, 32, 'sha512').toString('hex')
```

Once you are done, you can check the solution in the `auth-3` folder.

**Step 4.** Add a static salt to the password.

One issue with our hash is that there are some well-known lists of popular passwords. If our database leaks and someone gets access to the list of hashed passwords, they could use a long pre-computed list of popular passwords to check if any of the passwords in our database match the ones in the list. These lists are called **rainbow tables**.

We want our project's passwords to differ from any other project's. We could sprinkle some **salt** to our password. Salt is some random data added to the password before (or during) hashing. In its most basic implementation, we are just making the password longer. However, we are making it longer with our unique string. This way, even if someone gets access to the list of hashed passwords, they cannot use a pre-computed list of popular passwords to crack our passwords.

```
// Regular hashing produces the same password hash
// in our app and other apps. This allows hackers
// to pre-compute a list of hashes for popular
// passwords and then use that list to search for
// them in our database.
password123

// This produces a different password hash in our app.
password123 + our secret string
```

Adding salt is as simple as adding a secret string of characters to the password before hashing. This can be done in one of two ways:

- passing the salt as an argument to the hashing function. Right now, our hash has an empty string as its current salt.
- manually concatenating the salt and the password before hashing. `SECRET_SALT + user.password`.

These approaches are not strictly equivalent, so you would get different hashes — however, both work similarly.

Update the test to ensure the password is not stored in an "unsalted" form. Then, update the implementation to use a salt.

**Note.** If we wanted to log in a user using the approach, we would take in their password, add the same salt, hash it, and then compare the result with the hash in the database. We will focus on the login part later on.

Once you are done, you can check the solution in the `auth-4` folder.

**Step 5.** Use a unique salt for every user.

- **Watch**: [Hashing Passwords in Node and Express using bcrypt](https://www.youtube.com/watch?v=AzA_LTDoFqY) **up until 9:04**.

One unfortunate issue with using a shared salt is that if two users have the same password, they will have the same hash. Also, if someone gets access to our live project configuration, they will know about the salt and be able to use it to generate rainbow tables for our project. Then, they could use that single rainbow table to crack all the common passwords in our database.

To counteract this, we could generate a unique salt for every user. Then, even if two users have the same password, they will have different hashes. Also, if someone gets access to our live project configuration, they cannot generate rainbow tables for our project because every user will have a different salt.

We will move on to using a more secure hashing function - `bcrypt`. It has a more secure slow hashing function and a built-in salt generation.

Bcrypt generates hashes in the following format:

```
$VERSION$COST$SALT_AND_HASH
```

- `VERSION` - BCrypt version.
- `COST` - the cost of processing the data. The higher the cost, the longer it takes to calculate the hash. You would specify this when calling `bcrypt.hash`. It can not be lower than 4.
- `SALT` - a randomly generated salt for that password.
- `HASH` - the hashed password. Salt and hash are concatenated, but the algorithm knows how to separate them as salt has a fixed length.

We will store this entire string in the database. It provides a few advantages:

- We do not need to store the salt separately. It is already included in the hash.
- We can change the password hashing algorithm and the cost in the future, as everything needed to decode the password is already included in this string.

You might ask yourself - **why are we storing the salt with the password**? Is that not a security issue? Not really, because the purpose of this salt is not to be a secret. **Salt is not a key**. It does not unlock anything. It is to make sure that **every password has a different hash**.

Even if multiple users have the same password, they will have different hashes. Also, our database can not be cracked using rainbow tables. Anyone who could get a hold of our database would see the salt, and they would be able to perform a brute-force attack on our database, but brute-force attacks take an extremely long time to complete. Generated salts mean the attacker cannot reuse the same generated password hashes for other users. They would need to start from scratch for every user!

**What should you do with your current SECRET_SALT?**

We should reveal that our project-wide secret string would not be strictly considered salt. It would be regarded as **a pepper**.

We could remove it, and some even make a case against using pepper because no studies suggest that adding a fixed string of characters to the password before hashing would improve the security of our application. If flaws in the hashing algorithm and adding the same string results in reduced observable randomness (entropy), then adding the same string of characters might be detrimental. However, it logically follows that keeping the pepper could improve the security of our application a bit if:

- An attacker who gets access to our database would not necessarily have access to our live project configuration. For example, we are hosting our database on a different server.
- A user is using a weak password.
- Our algorithm is weak enough that it is feasible to check lots of passwords.

If these conditions are not met, then removing the SECRET_SALT could be justified to remove it. However, if these conditions are met, we could continue using the SECRET_SALT, the same as adding extra characters to the password before hashing.

In our provided solution, we will continue using the pepper, but you are free to remove it if you want to.

OK, enough theory. Now that you know about salt and pepper, we will let you cook.

Use [bcrypt package](https://www.npmjs.com/package/bcrypt) instead of the built-in `crypto` module. Since `bcrypt` does not provide TypeScript types, you should also install TypeScript types for it. Do you remember how to do that?

Update the test to check that the stored password hash is 60 characters long and starts with `$2b$`, which indicates the bcrypt algorithm.

Once you are done, you can check the solution in `auth-5` folder.

**Step 6.** Implement login functionality.

- **Continue watching**: [Hashing Passwords in Node and Express using bcrypt](https://www.youtube.com/watch?v=AzA_LTDoFqY) until the end.

In this step, your task is to:
- add tests for at least 3 cases (valid login, invalid email, invalid password)
- implementing a login procedure that passes the tests

Then, improve this implementation by adding tests and functionality:
- check that email is an email (you can use zod for that)
- your procedures normalize various email letter cases (john@doe.com, John@DOE.com, ...) and they remove any surrounding email whitespace

If you wanted to allow your users to log in with a mistyped email case or accidentally add whitespace, how would you do that? There are multiple ways to achieve this.

Once you are done, you can check the solution in `auth-6` folder.

## Authentication vs. Authorization (0.5 hours)

- Watch: [Authentication vs Authorization](https://www.youtube.com/watch?v=mL8EuL7jSbg) (20 min)

## Cookies, Sessions, JWTs (1.5 hours)

- Watch: [Authentication on the Web](https://www.youtube.com/watch?v=2PPSXonhIck) (40 min)
- Watch: [Cookies, Sessions, JSON Web Tokens (JWT)](https://www.youtube.com/watch?v=uXDnS5PcjCA) (50 mins)
- Watch: [What is JWT?](https://www.youtube.com/watch?v=7Q17ubqLfaM) (15 min)

## Exercise: Authentication (4 hours)

Let's update our mini auth app to use JWTs for authentication. To make matters simple, we will not deal with refresh tokens. We will use a single access token for authentication.

**Step 1.** Add a login procedure that uses a JWT token.

Install [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) package and a `@types/jsonwebtoken` package.

Start by adding a test to expect a successful login procedure to return a token string that starts with `eyJ`. Nearly by definition, all JWTs start with `eyJ`.

Use [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) package documentation to determine what you should set. Add some `TOKEN_KEY` to your project as the secret key for signing the token. You can use any string for that. We recommend setting an expiration time for the token using the `expiresIn` option. You can set it to `1h` for 1 hour, `1d` for 1 day or more. Once the token expires, the user will have to log in again.

Once done, console.log the token and paste it to [jwt.io Debugger](https://jwt.io/) to see what is inside. You should see what makes up a header and what is inside a payload.

While JWTs are not public information, they are not encrypted. That means that the user can see what is inside the token.

**Note.** In production applications, you might prefer having a separate token for access and refreshing.

**Step 2.** Alternative: using cookies.

Local storage is more problematic if your site is vulnerable to XSS attacks than cookies. Meanwhile, cookies are more susceptible to CSRF attacks than local storage. There are some possible mitigations for both of these issues, but they involve additional complexity, and some are only partially resolvable. That is why many applications that deal with finances or sensitive data use 2FA (two-factor authentication) to add a layer of security.

In this module, it is OK to use localStorage or cookies.

While we will continue using localStorage in our upcoming examples, as it is more straightforward to see what is happening, we will also show how to use cookies. The key difference with cookies is that instead of returning a token, we would call the `res.cookie` function to set a cookie. The `res` object would be available in a tRPC on an Express app. We are not using Express for our mini app, but we can emulate it by passing a `res` object to our procedure as we would in Express.

You might need to:
- add a cookie-setting test
- setup accepting the `res` object in procedures (close to `initTRPC`)
- setup passing the `res` object to the procedure (close to `createCaller`)
- get `res` from `ctx` in the login procedure

```ts
it('sets a cookie if the password matches', async () => {
  // A mock of the res object for this test that we can check.
  const res = {
    cookie: vi.fn(),
  }

  // A custom login/signup that uses our res mock.
  const { login, signup } = userRouter.createCaller({
    res,
  })

  // Continue with the implementation.
  // What should you expect at the end of the test?
})
```

Once you are done, you can check the solution in the `jwt-2-cookie` folder.

**Step 3.** Authentication inside a procedure.

Now, we have a method for authenticating a user. The question is - how do we use it to limit access to certain parts of our application?

By convention, every request will come in with an `Authorization` header that will contain a JWT token in the following format:

```
Authorization: Bearer <token>
```

Since this information is inside the header, it will be accessible in the request object. In a raw Express API, we would have access to the request object, generally named `req`.

We are not running our tRPC API wrapped in an Express app, so we cannot request data such as headers. However, we can emulate it by passing a `req` object to our procedure in the same way as we would do it in Express. In tRPC, a `ctx` object is used for everything beyond user input.

```ts
// where you initialize tRPC
initTRPC.context<{
  // Express req and res objects that we
  // would have in an Express.js app a
  // tiny slice of the express request
  // object that is relevant to us.
  req?: {
    header(name: string): string | undefined
  },

  //This is not used if we are not using cookies
  res?: {
    cookie: any,
  }
}>().create()
```

Here, we are defining a context similar to what we would have in Express. We are not using `req` and `res` objects for anything else so that we can define them as optional properties on the `ctx` object.

Write a test for some procedure:
- when given a `req` that does not have a valid JWT token in the Authorization header, it throws an Error with the message "Unauthorized."
- when given a `req` with a valid JWT token in the Authorization header, it returns some data or does something else

Once done, you can check the solution in the `jwt-3` folder. It uses a very primitive `changePassword` procedure.

**Note.** You might have noticed that HTTP status code 401 Unauthorized is thrown when our visitor is not authenticated. Some call it a mismatch between HTTP status codes and the actual meaning of the error.

**Step 4.** Reusing the authentication logic with middleware.

We have added our authentication logic to a procedure. However, we would like to reuse it in other procedures. For example, we have lots of procedures that require authentication. We want to reuse the same logic for all of them.

We can write a function that we run inside of many procedures. This function would check if the user is authenticated; otherwise, it would throw an error.

However, we would like to be able to ignore authentication details in many procedures. This will make them easier to read, test and more secure, as we will not have to worry about accidentally misusing our authentication functions.

We want our procedures to handle only the authorization details that are appropriate for that procedure. For example, a password change procedure should not worry about authentication or parsing headers. It should only have to worry about the password change logic.

The most appropriate way to separate this logic in tRPC is the same way we would with Express - using middleware functions.

Use [tRPC documentation](https://trpc.io/docs/server/middlewares) to move our authentication logic that checks the JWT token into a middleware function. Then, use that middleware in our procedure.

We recommend adding a new optional `authUser` property to the tRPC context (`ctx` object). You can name it any way you want, but `authUser` clearly communicates that this is the authenticated user. It has three possible states:

All requests start with `undefined` authUser. Then, our middleware has a single job - to check if the request contains a valid JWT token, and if it does, it should set `authUser` to `User`. If it does not, it should throw an error.

We also recommend renaming the current `procedure` variable into `publicProcedure` to communicate that this procedure does not require authentication in stark contrast to our new `authenticatedProcedure` (or any other name you choose).

Once you are done, you can check the solution in the `jwt-4` folder.

**Step 5.** Allow to provide authenticated user to a procedure.

We have added a middleware that checks if the user is authenticated. However, it always needs to receive an Express request header. Then, we need to mock our token verification logic or provide a valid JWT token from the start for every test. This is not ideal:

- All our tests would break if we changed our token verification logic.
- We must use prepared tokens for our tests, build them at run time, add module mocking, or restructure our code to use dependency injection. All of these are not ideal.

Can we test our authentication logic once and then not worry about it in our tests for other procedures?

We could not allow our authenticated procedure to run if we already have a valid `authUser` in our context. This way, we could test our authentication logic in an isolated test suite, which does not provide `authUser`. We make sure that our authentication procedure produces a valid `authUser`, and then we can directly provide an `authUser` to our other procedures without going through the Express headers, JWT, and implementation details that should be hidden from our procedures.

1. Move out `authenticatedProcedure` into a separate file. This requires a minor refactoring of moving out the tRPC instance and other shared variables, such as the token key, into separate files. To be fair, we stayed on a single file for a bit too long.
2. Add a test file for `authenticatedProcedure` that checks the following authentication scenarios on a dummy procedure:

```ts
import { expect, it, vi } from 'vitest'
import { authenticatedProcedure } from './authenticatedProcedure'
import { AuthUser, router } from './trpc' // assuming that you moved out trpc instance

const INVALID_TOKEN = 'invalid-token'
const VALID_TOKEN = 'valid-token'

// We could use dependency injection to provide jsonwebtoken dependency.
// Here we are mocking for a slightly uglier test, but easier to understand
// solution.
vi.mock('jsonwebtoken', () => ({
  default: {
    verify: (token: string) => {
      if (token !== VALID_TOKEN) throw new Error('Invalid token')

      return {
        user: { id: 2, email: 'valid@email.com' } as AuthUser
      }
    },
  }
}))

// a dummy router with a single procedure
const routes = router({
  testCall: authenticatedProcedure.query(() => 'passed'),
})

// This will allow us to test our other procedures by providing
// an authUser to the context without having to go through
// the authentication logic every time. If authentication breaks,
// it will break only this test suite, which will point us to
// the issue.
it('should pass if user is already authenticated', async () => {
  const authenticated = routes.createCaller({
    authUser: {
      // ...
    },
  })

  const response = await authenticated.testCall()

  expect(response).toEqual('passed')
})

it('should pass if user provides a valid token', async () => {
  const usingValidToken = routes.createCaller({
    req: {
      header: () => `Bearer ${VALID_TOKEN}`,
    },
  })

  const response = await usingValidToken.testCall()

  expect(response).toEqual('passed')
})

// add more tests:
it.todo('should throw an error if user does not provide a token')
it.todo('should throw an error if it is run without access to headers')
it.todo('should throw an error if user provides invalid token')
```

# Directions for further research (2 hours+)

- Watch [Reinventing Web Security](https://www.youtube.com/watch?v=LxUAnZY_08o) to think about what even are security vulnerabilities and how to think about them.
- What is Role-Based Access Control (RBAC)? What would be the most straightforward way to implement it?
- What is OAuth?
- What could you do to mitigate CSRF attacks?
- What could you do to mitigate XSS attacks?
