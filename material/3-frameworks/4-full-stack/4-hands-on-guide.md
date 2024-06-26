Part 4: Hands-on: Full-stack monorepo application (Solution)

## Steps

### Step 0. Setup

Install dependencies, set up a database, and add `.env` variables based on `.env.example` files.

Open up at least two terminals. Start the front-end client and the back-end server in development mode:

```bash
# install dependencies for both packages
npm i

# terminal 1, dedicated to the client
cd client
npm run dev

# terminal 2, dedicated to the server
cd server
npm run migrate:latest
npm run dev
```

First, browse through the web app and see what it does.

### Step 1. Think through required API endpoints

What endpoints do we need to implement to make the app work?

We should review the user flow and consider what data we need to send and receive.

```md
As a visitor:

- I can see a list of articles.
- I can see a list of comments for an article.
- I can sign up using an email and a password.
- I can sign in with an email and a password.

As a user:

- I can create a new article.
- I can create a new comment on an article.
- I can sign out.

As an article author:
- I can mark a comment as spam on my article.
```

While we could start from any endpoint, we recommend working in the same order as the most common user flow.

In our case, our main flow is:

1. A visitor sees a list of articles.
2. A visitor signs up.
3. A visitor logs in.
4. A user creates a new article.
5. A user creates a new comment.
6. A user marks a comment on their article as spam.

We could map these steps to endpoints:

- Article list = `article.findAll` (or `article.list`, `article.find`, etc.)
- Signup = `user.signup`
- Login = `user.login`
- Article creation = `article.create` (or `article.post`)
- Comment creation = `comment.post`
- Comment spam = `comment.markAsSpam`

We already have the `article.findAll` procedure. It would be a good time to investigate how it works. We could use it as an example.

### Step 3. Add an endpoint for creating an article

Let's create `article/create.ts` file, add it to the `article/index.ts` router and add a test `article/tests/articleCreate.spec.ts`.

What would be the simplest test case for this endpoint? Likely, it would be something that returns a static value or throws an error. Are there any such cases in this endpoint?

#### Part A. Testing the authentication for creating an article

Our `article.create` procedure should not allow unauthenticated users to create articles. Instead of doing anything with a database, we would throw an error — tRPC would wrap it in JSON and return it to the client. Let's test throwing an error for unauthenticated users.

```ts
import { createCallerFactory } from '@server/trpc'
import articleRouter from '..'

const createCaller = createCallerFactory(articleRouter)

it('should throw an error if user is not authenticated', async () => {
  // ARRANGE
  const { create } = createCaller({} as any)

  // ACT & ASSERT - when dealing with errors in tests,
  // it is easier to use the expect().rejects.toThrow()
  // syntax over wrapping everything in a try/catch block
  await expect(
    create({
      title: 'My Article',
      content: 'Some content.',
    })
  ).rejects.toThrow(/unauthenticated/i)
})
```

**Note.** We are using a regular expression for the error message as we would not want our test to fail if we changed the error message slightly. We only care that the error message contains the word "unauthenticated".

Now, we can add a simple procedure to handle this case:

```ts
// article/create.ts
import { articleSchema } from '@server/entities/article'
import { publicProcedure } from '@server/trpc'

export default publicProcedure

  // user can provide the following fields
 .input(
    articleSchema.pick({
      title: true,
      content: true,
    })
  )

  // Our mutation is not doing anything with the
  // database, just sending the input back to the client.
 .mutation(async ({ input }) => input)
```

Our test should fail, as the procedure has no logic to check whether the user is authenticated. We could check whether the request contains a valid token inside the procedure body. However, we can forsee that quite a few procedures in our application will need the same check. This check always comes before we do anything "useful" with the request, which is a good candidate for a middleware function.

We could use the `authenticatedProcedure` middleware from our authentication exercises.

```ts
// simplified version of the authenticatedProcedure middleware
export const authenticatedProcedure = publicProcedure.use(async ({ ctx, next }) => {
  // We can skip this middleware if we already have an authenticated user.
  // This also allows us to bypass this middleware in tests.
  if (authUser) return next(/* ... */)

  const token = getTokenFromHeader(ctx.req.header('Authorization'))
  const authUser = getUserFromToken(token)

  // Add authUser to the context, which is passed down to the procedure.
  return next({
    ctx: { authUser },
  })
})
```

We could use it instead of `publicProcedure` in our `article/create.ts` file:

```ts
// article/create.ts
// authenticatedProcedure reads the Authorization header,
// checks whether it contains a token, and if so, sets
// the authUser in the ctx
export default authenticatedProcedure
// ...
```

Does that make our test pass? Not quite. We are getting an error, but not the right one:

```
Missing Express request object. If you are running tests, make sure to provide some req object in the procedure context.
```

This is because our `authenticatedProcedure` relies on reading request headers using the `req` Express object in the `ctx`. Our tests do not provide this object:

```ts
// articleCreate.spec.ts
// we would need to provide a fake request object inside the ctx object, which
// right now is empty - {}
const { create } = createCaller({} as any)
```

Providing a `req` object would require looking up what the `req` object should look like and what properties we use from it. This is a hassle, and it is not something we would want to do in every test. Instead, we've added a simple helper function that provides a fake `req` object:

```ts
// articleCreate.Spec.ts

// We are using 'as any' as TS demands a database object
// in the ctx, but we do not yet need it for this test.
const { create } = createCaller(requestContext({} as any))
```

It is a simple utility function for our tests that provides a few `req` object properties for us to get through the `authenticatedProcedure` middleware. It pretends there are no headers in the request, which is a good enough approximation for our test.

If there were actual headers, we should test them in the `authenticatedProcedure` middleware tests.

**Alternative to mocking a request object.** Alternatively, we could mock the `authenticatedProcedure` middleware itself. This is also an acceptable approach. It would be preferable if the requirements to get the `authUser` object were more complex, and we would need to test them in isolation.

#### Part B. Testing the article creation

Now, we will need to start dealing with the database. Let's update our test appropriately:

```ts
import { authContext, requestContext } from '@tests/utils/context'
import { fakeUser } from '@server/entities/tests/fakes'
import { createTestDatabase } from '@tests/utils/database'
import { createCallerFactory } from '@server/trpc'
import { wrapInRollbacks } from '@tests/utils/transactions'
import { insertAll } from '@tests/utils/records'
import articleRouter from '..'

const createCaller = createCallerFactory(articleRouter)

// Key part #1 - we are wrapping our database operations in a
// transaction which will be rolled back after each test is done.
const db = await wrapInRollbacks(createTestDatabase())

// ... authentication test is the same as before ...

// Our new test:
it('should create a persisted article', async () => {
  // ARRANGE
  // 1. Make a request as some signed-in user

  // ACT
  // 2. Call the article.create procedure with some input ({ title, content })

  // ASSERT
  // 3. Expect the procedure to return the created article
  // 4. Expect the database to contain the created article
})
```

We recommend to try and write this test on your own. There are a few utility functions that you might find useful:

- `insertAll` - inserts and returns given rows into the database.
- `selectAll` - selects rows from some table with a given condition.
- `authContext` - similar to `requestContext`, but it injects `authUser` into the procedure `ctx`, which is useful for testing authenticated endpoints. However, you could provide the `authUser` directly in the `createCaller` function.

We recommend creating a repository to interact with articles. While it could be initialized in the procedure itself, we recommend providing it in a more dependency-injection-friendly way. This way, we could replace the repository with a mock repository in the tests without mocking at the import level, as these mocks are a bit harder to manage.

```ts
// article/create.ts
export default authenticatedProcedure
  .use(provideRepos({ articleRepository }))

  // ... input
  .mutation(async ({ input, repos }) => {
    // repos.articleRepository is now available in the procedure
    // and we can use it to interact with the database.
    // However, make sure that the repository has the necessary
    // methods to do what you need to do in the procedure.
  })
```

You can find the solution in the `article/create.ts` file.

### Step 4. Add a repository method for getting a list of comments with their authors

We have the following requirements around seeing a list of comments:

- Any visitor can see the comments on the article.
- Each comment shows the first name and last name of the user who posted it.

We can already imagine we will need some sort of `comment.find` procedure. It could behave exactly like the `article.findAll` procedure, but it would return comments instead of articles. Even though that would work, how would we get the author's first and last names?

We could add another endpoint to get a user's first and last name using their ID. But that would require an additional request for each comment. Alternatively, we could allow passing a list of user IDs and getting a list of user first names and last names in a single request. While this is a bit better, there might even better solutions in our case.

After all, we are not interested in the user's first name and last name in isolation. We are interested in the user's first name and last name in the context of a comment. We could use a JOIN or a subquery to get the user's first and last names in the same query as the comments. Then, we would return it to the client:

```json
{
  "id": 1,
  "content": "Some content",
  "userId": 2,
  "firstName": "John",
  "lastName": "Doe"
}
```

Even better, we could return the user's first name and last name in a nested object:

```json
{
  "id": 1,
  "content": "Some content",
  "author": {
    "id": 2,
    "firstName": "John",
    "lastName": "Doe"
  }
}
```

This is a bit easier to work with on the client side. It is clear what belongs to the comment and belongs to the author.

It seems that our `comment.find` (or `comment.list`, `comment.findByArticleId`, ...) procedure will be a thin wrapper around a repository method performing the JOIN/subquery. So, instead of trying to get these parts working simultaneously, we will focus entirely on the repository method. Once it is working, adding a procedure that uses it should be a breeze.

Let's go to our `repositories` folder and add a test file for the `commentRepository`:

```ts
// commentRepository.spec.ts
// using a describe block to organize tests by method
describe('findByArticleId', () => {
  it('should find comments with authors by article id', async () => {
    // Given
    const comments = await insertAll(db, 'comment', [
      // a few comments
    ])

    // When
    const commentsFound = await repository.findByArticleId(
      // some article id
    )

    // Then
    expect(commentsFound).toEqual([
      // a few comments with nested authors
    ])
  })
})
```

To begin with, if we want to insert a few comments into the database, we need two more entities: an article and a user (its author). Whenever we face a need for stateful dependencies (such as a database, external API, or file system) in our tests, we should consider one of the two options:

- **create and provide "the real thing" in the test itself**
- **mock it out with a fake object/function**

Which one should we choose? Consider the following:

1. **What would you test?**
2. **What would provide you with the most confidence in your test?**
3. **What would be the easiest to write and change?**

If we are testing the repository method and testing an outcome against a running database, then it is clear what we will expect - we will expect some change in the database. What are the alternatives?

- The method ends up forming the right SQL query string.
- The method calls the right query builder (or ORM) methods.

At this point, we do not even know what our query will look like or which methods we will use to build it. If we can't specify what we expect to happen, we should look for other ways to test our code.

Also, we argue that **testing a repository without a database might not provide us with much confidence**.

Finally, trying to form our tests around specific SQL queries or query builder (such as Kysely) methods might be a bit too **implementation-specific**. We might not care about the exact SQL query, but rather about the outcome of the query.

Given this, we will opt for the first option - **providing the actual database in the test**.

If we want to test getting a list of comments from a real database, we must have some comments in the database. We will insert some with the `insertAll` utility function.

```ts
// we could write it ourselves
const comments = insertAll(db, 'comment', [{
  content: 'Some content',
}])

// or we could use a helper function that generates some random data
const comments = insertAll(db, 'comment', [fakeComment()])
```

However, we must provide an `articleId` and a `userId` for every comment. If we tried to insert a comment without an article ID, we would get a foreign key constraint violation - our database checks that the article and user ids point to existing rows in the database.

This raises the question of whether we should create an article for the comments test. That is one of the drawbacks of testing with a database that enforces foreign key constraints. We could either:

A. **Create an article in the test**. This is more work, but we can simulate this endpoint much closer to how it would work in production.
B. **Disable foreign key constraints** in the test database. It simplifies the test setup, but we lose some of the safety guarantees we would expect from running tests with a database.

The B method is a hack well-suited for seeding the database with some initial fake data. However, we would like to preserve foreign key constraints if we test the API endpoints.

Let's stick with creating a few articles and users for the test.

```ts
// commentRepository.spec.ts
const db = await wrapInRollbacks(createTestDatabase())
const repository = commentRepository(db)

const [userOne, userTwo] = await insertAll(db, 'user', [
  fakeUser(),
  fakeUser(),
])

// 2 articles, both written by userOne
const [articleOne, articleTwo] = await insertAll(db, 'article', [
  fakeArticle({
    userId: userOne.id,
  }),
  fakeArticle({
    userId: userOne.id,
  }),
])

describe('findByArticleId', () => {
  it('should find comments with authors by article id', async () => {
    // Given the following combination of comments
    const comments = await insertAll(db, 'comment', [
      fakeComment({
        articleId: articleOne.id,
        userId: userOne.id,
      }),
      fakeComment({
        articleId: articleTwo.id,
        userId: userOne.id,
      }),
      fakeComment({
        articleId: articleOne.id,
        userId: userTwo.id,
      }),
    ])

    // When we call the repository method
    const commentsFound = await repository.findByArticleId(articleOne.id)

    // Then we should get the following comments with authors
    expect(commentsFound).toEqual([
      {
        ...comments[0],
        author: userOne,
      },
      {
        ...comments[2],
        author: userTwo,
      },
    ])
  })
})
```

It's time to implement the `findByArticleId` method to pass this test.

```ts
// Often repositories are written as classes, but we will use a function
// with a plain object for simplicity.
export function commentRepository(db: Database) {
  return {
    async findByArticleId(articleId: number): Promise<Comment[]> {
      return db
        .selectFrom('comment')
        .select(commentKeysPublic)
        .where('articleId', '=', articleId)
        .execute()
    }
  }
}
```

While this should select the comments for a given article, it does not include the author's first name and last name. How could we include them?

There are a few ways to do this. We will explore the most straightforward one - `INNER JOIN` with the `user` table on the `userId` column. Then, we would need to manually restructure the result into a nested object containing the `author`. We would use `LEFT JOIN` if we could have comments without authors or there is a possibility that there are multiple authors for a single comment. In our case, we will assume that every comment has an author.

```ts
const comments = await db
 .selectFrom('comment')
 .innerJoin('user', 'comment.userId', 'user.id')
 .where('articleId', '=', articleId)
 .select([
    ...commentKeysPublic,
    'firstName',
    'lastName',
  ])
 .execute()

// move all author fields to a nested author object
return comments.map(({ firstName, lastName, ...comment }) => ({
  ...comment,
  author: {
  id: comment.userId,
      firstName,
      lastName,
  },
}))
```

This nearly works. We get an error `column reference "id" is ambiguous`. Is there something special about the `id` column that happens in this query but not in our previous queries? Well, `id` could mean the `id` column from the `comment` table or the `id` column from the `user` table. We should be more explicit about which field is taken from which table:

```ts
'comment.id',
'comment.content',
// ...
```

While this is fine, we could do a bit better and make this piece of code more expressive and resistant to future changes to the database schema. We could use the `commentKeysPublic` array and add a utility function to prefix all keys with the table name:

```ts
// produces ['comment.id', 'comment.content', ...]
...prefixTable('comment', commentKeysPublic),

// we could do the same with the user keys, but we
// will keep this very simple for this example
'firstName',
'lastName',
```

`prefixTable` is just a simple function with a `map`. However, it requires a bit of TypeScript magic to make it "smart", so it does not just return `string`, but the exact literal types that calm down Kysely's type safety checks.

We still might get a type error that `author` is not in the `Comment` type. We could create a new type, `CommentPublic` (or `CommentWithAuthor`), that extends `Comment` and adds the `author` field. We could keep that type in the `entities/comment.ts` file.

#### Advanced methods building JSON on the database side

We have added several alternative approaches to building a nested JSON object.

PostgreSQL allows us to build JSON objects directly in the database. We could use the `json_build_object` function (or `json_build_array` for arrays) to construct a JSON object directly in the query:

```sql
SELECT
  comment.id,
  comment.content,
  json_build_object(
    'id', user.id,
    'firstName', user.firstName,
    'lastName', user.lastName
  ) AS author
FROM comment
JOIN user ON comment.userId = user.id
WHERE comment.articleId = 1
```

This would allow skipping the JSON building step in the application code. Alternatively, we could use a subquery to build the JSON object:

```sql
SELECT
  comment.id,
  comment.content,
 (
    SELECT json_build_object(
      'id', user.id,
      'firstName', user.firstName,
      'lastName', user.lastName
 )
    FROM user
    WHERE user.id = comment.userId
 ) AS author
FROM comment
WHERE comment.articleId = 1
```

This is a very developer-friendly approach as we could move the logic for building the JSON object to a single function:

```ts
function withAuthor(eb: ExpressionBuilder<DB, 'comment'>) {
  return jsonObjectFrom(eb
    .selectFrom('user')
    .select(userKeysPublic)
    .whereRef('user.id', '=', 'comment.userId')
  ).as('author') as AliasedRawBuilder<UserPublic, 'author'>
}
```

Then, adding author to a specific query becomes as simple as:

```ts
const comments = await db
  .selectFrom('comment')
  .select(commentKeysPublic)
  .select(withAuthor) // single line for the author relationship
  .where('articleId', '=', articleId)
  .execute()
```

We could even use it for the `RETURNING` clause in the `INSERT` statement:

```ts
const commentInserted = await db
  .insertInto('comment')
  .values(comment)
  .returning(commentKeysPublic)
  .returning(withAuthor) // single line to return the author as well
  .executeTakeFirstOrThrow()
```

All in all, this is a compelling approach, but it is optional for simple applications. Also, some of you might be aware of some trade-offs of using subqueries vs. joins in the database, but the query planner in modern databases might mitigate these. These details do not matter too much in a small application. Focus on what is the most readable and maintainable for you, and then optimize if necessary.

The approaches for building JSON objects are covered in the [Kysely documentation](https://kysely.dev/docs/recipes/relations).

Once this works, we could add more test cases to cover a few more scenarios.

### Step 5. Add an endpoint for getting a list of comments with their authors

This step is quite straightforward. Our endpoint is just taking the `articleId` and returning the comments with the authors. We will use the `commentRepository` method we have just created.

The more interesting part is the test. We have already tested the repository method, and our endpoint is just a thin wrapper around it. We could test it in a very similar way to how we tested the repository method. We would need to create a few test users, articles, and comments and then test whether our endpoint returns the comments with the authors. However, there might be better uses of our time than adding more tests around the same functionality. Also, if we decide to change something, we need to change a lot of tests in multiple places. This can be counter-productive.

Instead, we could test the `comment.find` procedure with a mocked repository. After all, we have tested it, and if we want to test more edge cases surrounding the database interaction, we could do it in the repository tests.

How can we mock the comment repository?

In our simple application setup, it is as simple as providing a fake repository object to `ctx`. This is one of the purposes behind the `provideRepos` middleware. If it finds that we have already passed in a repository, it uses that instead of creating a new one with a real database.

```ts
// Example with a real database.
const db = await wrapInRollbacks(createTestDatabase())
const { find } = createCaller({ db })

// Example with a fake repository.
const commentRepository = {
  findByArticleId: async () => [
    // some hard-coded return value
  ],
}

const { find } = createCaller({
  repos: { commentRepository },
})
```

When we provide a mocked repository, we do not need to worry about the database setup, seed data, database constraints, etc. This is fine, as long as we have a test for the repository method we are mocking.

Here how the complete test could look like:

```ts
// import statements...

const repos = {
 commentRepository: {
    // findByArticleId will return whatever we pass in
    findByArticleId: async (articleId: number) => [
      // using fakeComment, so we do not list all the fields
      fakeComment({
        id: 1,
        articleId,
        author: { id: 1, firstName: 'Jane', lastName: 'Doe' },
      }),
    ],
    // Type check to make sure that the fake repository satisfies
    // the CommentRepository interface. Then, TypeScript will
    // notify us if our mock has an incompatible type.
  } satisfies Partial<CommentRepository>,
}

const createCaller = createCallerFactory(commentRouter)
const { find } = createCaller(authRepoContext(repos))

it('should return a list of comments of a given article', async () => {
  // ARRANGE (Given)
  const articleId = 5

  // ACT (When)
  const commentsFound = await find({ articleId })

  // ASSERT (Then)
  expect(commentsFound).toMatchObject([
    { id: 1, articleId, author: { id: 1, firstName: 'Jane', lastName: 'Doe' } },
  ])
})
```

Our procedure does little, so it is OK to have a straightforward test. We could add some functionality not covered by the repository method, such as what happens if the `articleId` is passed in not as a `number` or how the procedure handles an error thrown by the repository method.

### Step 6. Add an endpoint for creating a comment

While we tested the `comment.find` procedure with a mocked repository, we will demonstrate how to test the `comment.post` procedure with a database.

You are free to choose either approach. Either way, you will need to test the interactions with the database in the procedure or repository.

Let's describe the expected behavior of the `comment.post` procedure:

```ts
// commentPost.spec.ts
// import statements

// overall setup
const createCaller = createCallerFactory(commentRouter)
const db = await wrapInRollbacks(createTestDatabase())

// some initial setup, if needed

it('allows creating a comment', async () => {
  // ARRANGE (Given)
  // given some fake comment data

  // ACT (When)
  // call the comment.post procedure with the fake comment data
  // as some signed-in user

  // ASSERT (Then)
  // expect the database to contain the saved comment
  // expect the procedure to have returned the saved comment
})
```

How would we will fill in these parts?

We would need to create a user and an article in the database upfront.

```ts
// We will leave this outside of our particular test, as this looks like
// something we would need in multiple tests.
const [userArticleAuthor] = await insertAll(db, 'user', [
  fakeUser(),
])

const [article] = await insertAll(
  db,
  'article',
  fakeArticle({
    userId: userArticleAuthor.id,
  })
)

it('allows creating a comment', async () => {
  // ARRANGE (Given)
  const comment = fakeComment({ articleId: article.id })

  // ACT (When)
  // call the comment.post procedure with the fake comment data
  // as some signed-in user

  // ASSERT (Then)
  // expect the database to contain the saved comment
  // expect the procedure to have returned the saved comment
})
```

Time to move on to the `ACT` part. We will need to create a user and call the `comment.post` procedure with the comment data.

```ts
const comment = fakeComment({ articleId: article.id })
const { post } = createCaller({
  db,
  authUser: // ???
})
```

What sort of scenario should we test? We could test the following:

- The article author can post a comment.
- Another user can post a comment.
- A non-logged-in user cannot post a comment.

While all three scenarios deserve our attention, we will focus on the "Another user can post a comment" as it is the most complex. Instead, we will leave the easier scenarios covered in the solution source code.

```ts
const { post } = createCaller({
  db,

  // or otherUser, or just user, it's all personal preference
  authUser: userOther.id,
})
```

Where will we get this `userOther`? The same way we got our `userArticleAuthor`—by inserting a user into the database.

```ts
const [userArticleAuthor, userOther] = await insertAll(db, 'user', [
  fakeUser(),
  fakeUser(),
])
```

Now, we have access to two users in this test file. This sounds like enough for a reasonable test.

```ts
it('allows creating a comment', async () => {
  // ARRANGE (Given)
  const comment = fakeComment({ articleId: article.id })

  // ACT (When)
  const ctx = { db, authUser: userOther }
  const { post } = createCaller(ctx)
  const commentReturned = await post(comment)

  // ASSERT (Then)
  // simple check - does the returned comment match the saved comment?
  const [commentSaved] = await selectAll(db, 'comment', (cb) =>
    cb('id', '=', commentReturned.id)
 )
  expect(commentReturned).toMatchObject(commentSaved)
  expect(commentSaved).toHaveProperty('userId', userOther.id)
})
```

Now, how would we implement this?

```ts
// comment/post.ts
export default authenticatedProcedure

  // inject the commentRepository into the procedure
 .use(
    provideRepos({
      commentRepository,
    })
  )

  // user provides the content for their comment
  // and the articleId they are commenting on
  .input(
    commentSchema.pick({
      articleId: true,
      content: true,
    })
  )

  // create a comment and return it to the client so they
  // can update the front-end with the new comment
  .mutation(async ({
    input: comment,
    ctx: { authUser, repos },
  }): Promise<CommentPublic> => {
    const commentCreated = await repos.commentRepository.create({
      ...comment,
      userId: authUser.id,
    })

      return commentCreated
  })
```

However, what happens if the user tries to comment on an article that does not exist? We should add a test for this case.

```ts
it('throws an error if the article does not exist', async () => {
  // ARRANGE (Given)
  const comment = fakeComment({ articleId: article.id + 999999 })

  // ACT (When) & ASSERT (Then)
  const { post } = createCaller(authContext({ db }))
  await expect(post(comment)).rejects.toThrow(/not found/i)
})
```

Unfortunately, our procedure throws an error about the violated `foreign key constraint`. This is because our database checks that the `articleId` in the `comment` table points to an existing row in the `article` table.

Instead of this "ugly" error, we would like to throw a more user-friendly error. There are a few ways to do this:

A. Check whether the article exists before inserting the comment.
B. Catch the error and re-throw a more user-friendly error.

Here's what the upfront check could look like:

```ts
const article = await repos.articleRepository.findById(comment.articleId)

if (!article) {
  throw new TRPCError({
    code: 'NOT_FOUND',
    message: 'Article not found',
  })
}

// proceed to create the comment
```

This is easy to understand and allows for adding additional conditionals in the application code. For example, some articles might have their comments disabled, some might require only some users to comment, etc. This would be harder to enforce at the database level than just with a few `if` statements. The drawback of this approach is that we are making two database queries instead of one — first to get an article and then to insert a comment.

Alternatively, we could just insert the comment, catch the error, and re-throw a more user-friendly error:

```ts
// We could use a try/catch block, but it is a bit too lengthy
// for a simple operation like this, so we will use the build-in
// Promise.prototype.catch method.
const commentCreated = await repos.commentRepository
 .create({
    ...comment,
    userId: authUser.id,
  })
 .catch((error) => {
    // foreign key constraint violation
    // We could look for a specific string in the error message
    // or we could look for a specific error code.
    // We could look up online "postgres error codes" and find
    // "foreign_key_violation" is code 23503.
    if (error.code === '23503') {
      // re-throw a more user-friendly error
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Article not found',
        cause: error, // optional, but could be useful for server logs
      })
    }

    // If this is not the error we are looking for, we will
    // re-throw the original error. Maybe the database is down
    // or there is some other issue. In that case, we might want
    // to display a generic error message to the user in the front end.
    throw error
  })
```

### Step 7. Add real login and authentication to the client

**Now we will focus on the `client` - our front-end application.**

Authentication works by sending credentials to the server, which checks whether they are valid. The browser can send the credentials in the request. HTTP requests contain two parts:

- Request body. It is used for username and password authentication in a POST request.
- Request header - such as an `Authorization` header with a `Bearer` token for JWTs or by passing a JWT/Session ID in a `Cookie` header.

Usually, authentication is done first by sending a request to the server with the credentials, such as a username and password. Then, the server sends back some sort of string that is used to authenticate the user in the future. This string is usually a session ID or a JWT.

In our case, we will be using a JWT.

Suppose we call the `login` procedure; it returns an `accessToken`. We need to attach this token to every request we make to the server. By convention, it is attached to the `Authorization` header. However, if we do not store it anywhere, the token lives only as a variable in the browser's memory. Once the page is refreshed, the token is lost.

Some Auth schemes use multiple tokens and having an in-memory token might make sense. However, our simple single-token setup relies on saving the token somewhere on the client so it is not lost between page refreshes. **We would like our users to stay logged in for some time even if they refresh the page**.

How would we do that? Is there any mechanism to persist data in the browser?

Some of you might remember `localStorage`. It is an acceptable way to store a JWT in the browser. While it has some drawbacks, such as being accessible from any JS script on the page, it is sufficient for our needs.

So, we will need to:

1. Call the `login` procedure.
2. Store the `accessToken` in `localStorage`.
3. Attach the `accessToken` as an `Authorization: Bearer {token}` header in every request.

We will create a `user.ts` file in the `stores` folder. It will contain the following:

```ts
import { trpc } from '@/trpc'

export async function login(userLogin: { email: string; password: string }) {
  const { accessToken } = await trpc.user.login.mutate(userLogin)

  localStorage.setItem('token', token)
}
```

OK, once we log in, we add the token to `localStorage`. **How would we attach it to every request?**

A quick "trpc headers" web search should lead us to the [tRPC Custom Headers page](https://trpc.io/docs/client/headers). Luckily for us, it even has a token-based example, because it is a very common use case.

We would then pass this auth token to all procedures in the `Authorization` header.

In our case, we are pulling the token from `localStorage`, so it we need to simply add a function that returns the desired headers as a plain object.

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

Our application deals with tokens in multiple places. If we wanted to change the token's localStorage key, we would need to do so in multiple places. We should consider colocating all auth-token functions in a single module. In this case, we have moved all token functions to `utils/auth.ts`.

### Step 8. Add route guards to protect routes that require authentication

We want to keep dashboard routes protected from unauthenticated users. If a user tries to go to the `/dashboard` route, we would like to redirect them to the login page.

We can do that by using a route guard.

While we could use a global route guard, we will use a local one as it is easier to understand. You can find more details on per-route guards in the [Vue Router docs](https://router.vuejs.org/guide/advanced/navigation-guards.html#Per-Route-Guard).

We can add a simple guard function that checks if the user is logged in, and if not, it redirects them to the login page:

```ts
// router/guards.ts
export const authenticate = () => {
  // isLoggedIn would be a property that is true if the user is logged in.
  // If the user is not logged in, we redirect them to the login page.
  if (!isLoggedIn.value) return { name: 'Login' }

  // otherwise, we can continue as usual
  return true
}

// router/index.ts
const router = createRouter({
  routes: [
    /* ... */
    {
      path: '/dashboard',
      component: MainLayout,
      beforeEnter: [authenticate], // guard
      children: [
          // all routes here will be protected by the authenticate guard
      ],
    }
  ],
})
```

How would we implement `isLoggedIn`? We probably want to keep it close to the `user.ts` store - it is a piece of user state after all. We could use a Vue `computed` property to derive the `isLoggedIn` value from the `authToken` value.

```ts
// stores/user.ts

// isLoggedIn can be derived from the authToken value.
// When authToken exists, isLoggedIn = true.
// When authToken does not exist, isLoggedIn = false.
export const isLoggedIn = computed(() => !!authToken.value)

function login(/* ... */) {
  // ...
  authToken.value = accessToken
}
```

Then we could import it in our route guard:

```ts
if (!isLoggedIn.value) return { name: 'Login' }
```

### Step 9. Run E2E tests and replace fake front-end data with real data from our API server

At this point, we need to replace all remaining hard-coded client data with data from the server. One way to do it is to wrap existing functionality in E2E tests and then replace the hard-coded data with API calls.

We have added E2E tests for that purpose. It goes through the main user flows.

We have added various helper functions to facilitate testing the application from different users' perspectives.

While we could add a lot of procedural logic to the E2E, we recommend playing around with more expressive code. An example of that is shown in the `client/e2e/comment.test.ts` where we have tested a bonus requirement - the ability for article authors to report a comment as spam. This requires switching between multiple roles, which would be a hassle with procedural code.

```ts
// this would create the necessary user, log in as that user,
// and perform the necessary actions as that user within the
// provided function
const author = fakeUser()
const article = await asUser(page, author, async () => {
  // ... produce an article
})

// we perform some actions as another user
const commenter = fakeUser()
const comment = await asUser(page, commenter, async () => {
  // ... produce a comment
})

// we switch back to the author and report the comment as spam
await asUser(page, author, async () => {
  // test out reporting the comment as spam
})
```

### Step 10. Handle errors

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

It takes in a function and returns a function that sets the error message if the original function throws an error:

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

**Note.** We did not flesh out all error handling and various authorization flow cases. For example:

- What happens if a request fails due to an expired token? We want to catch these errors, possibly at the tRPC client level, and redirect the user to the login page.
- What happens if a request fails due to a network error or some unexpected error? Is the user notified about it? Is the user exposed to unnecessary (possibly sensitive) information in error messages?

We could cover many more cases, such as rate limiting, pagination, caching, and managing front-end loading states and optimizing the state management, but this is beyond the scope of this exercise. We already did quite a bit of work to get to this point! Great work!

## Bonus feature - reporting comments as spam

We have implemented an additional feature to demonstrate a more complex authorization middleware function that safeguards a procedure from unauthorized access. Article authors can report comments as spam. This was not a requirement for the exercise, but we've added it to demonstrate how to implement more complex authorization logic.

You do not necessarily need to move most of the authorization logic to middleware functions. It is a good practice if you use the same logic in multiple places.
