Part 2: Query Builders and Validation

# Part introduction

In this part, we will continue working on our tiny blog API while introducing some new tools and practices used in production-ready web applications. By the end, we will have replaced our SQL queries with a query builder and our procedural validation logic with declarative data parsing schema.

# Key learning topics & resources for this part

## Abstractions over SQL (0.5 hours)

- Read: [Comparing SQL, query builders, and ORMs](https://www.prisma.io/dataguide/types/relational/comparing-sql-query-builders-and-orms)

Up to this point, we have been using SQL directly. That is an excellent way to learn how SQL works, but there are more common ways to interact with a database in a production-ready web application's source code. Most production-ready applications use an abstraction layer on top of SQL to provide better data type safety, built-in security practices, database schema migration tools, and generally better developer experience, which is hard to achieve with raw SQL strings.

We could use a query builder or an ORM, depending on our desired abstraction. Query builders are a thin layer over SQL, while ORMs tend to provide a high-level abstraction over the database.

In our case, we will take one step from raw SQL queries to SQL query builders.

## Kysely (1 hour)

There are quite a few query builders available for Node.js. The most used SQL query building package is `knex`. However, `knex` was written when there was no TypeScript, so it does not provide the best developer experience as it allows us to easily make mistakes in table names, column names, and data types. For this reason, we will use `kysely` instead - a knex-inspired TypeScript-first library that will make working with SQL databases much more pleasant.

To familiarize yourself with Kysely, check out the following resources:

- [Introduction to Kysely](https://kysely.dev/docs/intro)
- Watch: [Kysely first impressions](https://www.youtube.com/watch?v=vnSnor_C2rA)
- [Examples](https://kysely.dev/docs/category/examples) - this will be the most helpful resource for you as it contains many examples of how to map your current SQL knowledge to Kysely.

## Exercise: use Kysely database instance (0.5 hours+)

**Step 0: Install kysely.**

Install `kysely`, `dotenv` packages as dependencies and `kysely-codegen` as a dev dependency. Codegen (code generation) is a tool that will generate TypeScript types from our database schema. Let's go, automation!

**Step 1: Use Kysely to wrap an SQLite3 instance.**

For learners looking for a challenge, we recommend replacing the existing implementation of `src/database/index.ts` with the example in Kysely documentation and then adapting it to work with our current migrations.

For everyone else who wants to get to the good stuff, here is an adapted version of our `src/database/index.ts` file:

```ts
// reading environment variables from .env file
import 'dotenv/config';
import { CamelCasePlugin, Kysely, SqliteDialect } from 'kysely';
import Database from 'better-sqlite3';
import type { DB } from './types'; // we will handle this in the next step

export * from './types'; // we will handle this in the next step

// we are pulling DATABASE_URL from our environment variables
const { DATABASE_URL } = process.env;

if (!DATABASE_URL) {
  throw new Error('Provide DATABASE_URL in your environment variables.');
}

// creating the SQLite database instance
const database = new Database(DATABASE_URL);

// wrapping inside a shared interface, which allows Kyseley
// to understand it. This would allow us to use a different
// database engine in the future.
const dialect = new SqliteDialect({ database });

// finally, we are creating a Kysely instance, which we will
// use to interact with our database
export default new Kysely<DB>({
  dialect,

  // Bonus! Automatically convert snake_case to camelCase
  // and vice versa, so we are using the JS camelCase convention
  // in our JS files and the SQL snake_case convention in our database.
  // This is one of the many advantages of using an abstraction
  // over raw SQL - we can easily perform widespread transformations.
  plugins: [new CamelCasePlugin()],
});
```

Also, create a `.env` file at the root of your project (so, NOT inside of the `src`). We will use this file for configuration, such as our database file path:

```
DATABASE_URL=./data/database.db
```

**Step 2: Create types for our database schema.**

For Kysely to provide type safety, it needs to know the data types of our database schema. We could give them manually, but that would be a lot of work over time. Instead, we will use `kysely-codegen` to generate the types.

Add a handy script to your `package.json`:

```json
{
  "scripts": {
    // ...
    "gen:types": "kysely-codegen --camel-case --dialect sqlite --out-file src/database/types.ts"
  }
}
```

It will connect to our database (via `.env` file configuration) and investigate the database schema to generate the types for us.

Run `npm run gen:types` to generate the types. You should find a new file, `src/database/types.ts`, with a list of types for all tables in our database 🤯.

## Exercise: migrate to Kysely migrations (1 hour)

Our custom migration system has served its purpose of showing us how migrations work. However, we will use Kysely's own migration system instead of continuing to build on top of our custom solution.

**Step 3: Adapt our existing migration "system" to use Kysely-provided tool.**

Let's update our migration tool to use Kysely. `src/database/migrate.ts`:

```ts
/* eslint-disable no-console */
import 'dotenv/config';
import * as path from 'path';
import SQLite, { type Database } from 'better-sqlite3';
import fs from 'fs/promises';
import { Kysely, Migrator, SqliteDialect, FileMigrationProvider } from 'kysely';

const { DATABASE_URL } = process.env;
const MIGRATIONS_PATH = './migrations';

async function migrateToLatest() {
  if (typeof DATABASE_URL !== 'string') {
    throw new Error('Provide DATABASE_URL in your env variables.');
  }

  const db = new Kysely<Database>({
    dialect: new SqliteDialect({
      database: new SQLite(DATABASE_URL),
    }),
  });

  const migrator = new Migrator({
    db,
    provider: new FileMigrationProvider({
      fs,
      path,
      migrationFolder: path.join(__dirname, MIGRATIONS_PATH),
    }),
  });

  const { error, results } = await migrator.migrateToLatest();

  results?.forEach((it) => {
    if (it.status === 'Success') {
      console.log(`migration "${it.migrationName}" was executed successfully`);
    } else if (it.status === 'Error') {
      console.error(`failed to execute migration "${it.migrationName}"`);
    }
  });

  if (error) {
    console.error('failed to migrate');
    console.error(error);
    process.exit(1);
  }

  await db.destroy();
}

migrateToLatest();
```

That in itself is not enough. We must also rewrite our existing migrations to use the Kysely format. We will do that in the next step.

**Step 4: Rewrite existing migrations in Kysely format.**

Given that we are learning to use a query builder, we will break our rule of never touching existing migrations and rewrite them in Kysely methods.

Since we will be using a different system for tracking migrations, our existing migration records will be ignored. This would be a real pain to deal with, but since we are just learning, we will take some liberties in our approach.

1. Delete our existing database (or move it somewhere else).
2. Rewrite existing migration files to use Kysely format. Use the [SQLite migration example](https://kysely.dev/docs/migrations#sqlite-migration-example) and the remaining Kysely documentation to help you.
3. Recreate the database by running `npm run migrate:latest`.
4. If migrations succeed, run `npm run gen:types` to regenerate the types.

This will be our new workflow when updating the database schema:

- add a new migration
- run `npm run migrate:latest` to apply the migration
- run `npm run gen:types` to regenerate the TypeScript types for our database tables

**Optional challenges:** You can add a new utility script to your `package.json` to run both commands simultaneously. You might want to add additional scripts for performing down migrations (e.g. `migrate:rollback`/`migrate:down`) and for creating new migration files with the correct timestamp (e.g. `migrate:make ${migrationName}`).

## Exercise: use a query builder in the article model (1 hour)

**Step 5: Before we start adding more endpoints to our API, let's refactor our existing `article` model to use Kysely instead of raw SQL.**

Use the [Kysely documentation](https://kysely.dev/docs/category/examples) to help you out.

Since there can be a difference in what we might accept in `INSERT`, `SELECT`, and `UPDATE` queries, there can be a difference in the types we use for each. This is why we will need slight variations of our `Article` type, which can be formed using the provided `Insertable`, `Selectable`, and `Updateable` utility types. For example:

```ts
// articles/model.ts:
import type { Insertable, Selectable, Updateable } from 'kysely';
// ...

type ArticleInsert = Insertable<Article>;
type ArticleUpdate = Updateable<Article>;
type ArticleSelect = Selectable<Article>;
```

**Note:** Kysely uses async functions to ensure that it works uniformly with sync/async database drivers, which means it has to use `async` in all cases. So you will need to propagate async/await through your code. This also can change your return types to be `Promise<...>`.

Now, you can rewrite the `article` model to use the database via Kyseley instead of raw SQL strings. It will allow you to ditch the `...as Article` type assertions.

## Validation and parsing (0.5 hours)

Until this point, we either trusted user input or validated it by hand. Also, we might have needed to rely on `any` or `as ...` type assertions. Every time we use them, we force TypeScript to trust that we have done an excellent job of validating the data. Since TypeScript is only a compile-time tool, it does not ensure that the data we receive matches our expected data type.

If we make any mistakes in our validation, we might have a runtime error or data corruption. This is more than just a bad practice - it is a severe security vulnerability.

We should **never trust the data we receive from the client**. **All user input is guilty until proven otherwise**. We should never assume that the data that we receive is valid. Instead, we should validate it with strict rules, assuming that the user is trying to break our application.

There are two general ways of validating:

- imperative validation with procedural validation logic. Think of the good ol' `if` statements where we check if the data fulfills our requirements.
- declarative validation using a schema to define our expectations. The schema is then used to validate the data.

```ts
// Imperative validation
if (typeof data.text === "string" || data.text.length === 0) {
  throw new Error("Text must be a non-empty string");
}

// Declarative validation (JSON schema example)
const schema = {
  text: {
    type: 'string',
    minLength: 1,
  },
}
```

It should not be surprising that declarative validation is the preferred way of validating data. Reading and understanding a schema is much easier than going through a chain of `if` statements or a single all-or-nothing Regex pattern. Data validation is too important to rely on us not making any mistakes while reinventing the wheel. We should use a library that has been battle-tested.

While there are approximately 12540 JS validation libraries (source: I made it up), we will narrow it down to 2 leading contenders:
- [ajv](https://www.npmjs.com/package/ajv) - library for validating data against a static JSON schema. It is an excellent pick if we want our data definitions to be portable across different languages and platforms.
- [zod](https://www.npmjs.com/package/zod) - TypeScript-first validation library addresses two problems: data validation and TypeScript typing.

We will use `zod` as it provides TypeScript types for defined object shapes. We will then use these types to ensure they match our database types.

**Step 6:** Install `npm i zod`.

Read the following sections in the [zod documentation](https://zod.dev/):

- "Basic usage"
- "Primitives"
- "Coercion for primitives"
- the very first example in the "Objects" section

`zod` is an extensive library with many features. We will only use a small subset of them, so stay within the primary use cases.

## Exercise: Using zod to parse the provided data and type user requests (1 hour)

**Step 7: Create a `zod` schema for parsing user input into an `article`.**

7.1. Create a zod schema for the `article` data inside your article model.

```ts
import { z } from 'zod'
// ...

// define what is the expected shape of the data
const schema = z.object({
  id: z.number(),
  // ...
})
```

7.2. **Add additional constraints to the schema.** For example, we might want to limit the length of the `title` and `content` fields. How could we do that within our schema definition? Are there any other constraints we might want to add for the `id` field? For example, would we want to allow negative numbers? Fractions?

**Note:** For `zod` to correctly display the inferred type, you must add `"strict": true` to your `tsconfig.json`.

7.3. Instead of directly dealing with the parsing objects with our schema, create a few functions to parse the data for a particular purpose. These functions will be the only ones dealing with the schema directly.

We can then use this schema to create some useful functions:

```ts
/** Parse the provided id. */
const parseId: (id: unknown) =>
  schema.shape.id.parse(id)

/** Parse the entire provided record. */
const parse: (record: unknown) =
  schema.parse(record)

/** Parse a partial record. Useful for partial updates. */
const parsePartial: (record: unknown) =>
  schema.omit({ id: true }).partial().parse(record)

/** Parse what we would accept when creating a new record. */
const parseInsertable: (record: unknown) =>
  // add your implementation here
```

These functions make no optimistic assumptions about received data (`unknown`). They will return an object matching our schema, or it will throw an error.

Now, as long as we keep our schema up-to-date and all data validation is done through these functions, we can be sure that the data we receive is valid.

We can even consider splitting our schema into a separate `schema` file, as user input validation is a separate concern from performing SQL queries. We can neatly encapsulate our validation schema and all functions that have exclusive access to it.

**Step 8: Use your parsing functions in the controller.**

We want to mold the data we receive from the client into the shape we want as soon as possible.

## Exercise: Putting it all together (2 hours)

**Step 9: Add an endpoint for creating a `user`.**

1. Create a migration to add a `user` table to our database. Users need to have the following data:

```sql
id: integer
first_name: text
last_name: text
```

2. Migrate to the latest version.
3. Generate updated table types.
4. Create a `user` module with its model and controller. It should be possible to create a new user via the API.
5. Make sure you can create a new user via the API.

**Step 10: Add an endpoint for creating a `comment`.**

1. Create a migration to add a `comment` table to our database. Comments need to have the following data:

```sql
id: integer
article_id: integer -- the article that the comment was posted on
user_id: integer -- the author of the comment
content: text
created_at: timestamp
```

2. Migrate to the latest version.
3. Generate updated table types.
4. Create a `comment` module with its model and controller. It should be possible to:
  - create a new comment via the API
  - get all comments
  - get all comments for a particular article
5. Make sure you can create a new comment via the API.

Your back-end is responsible for adding a `created_at` timestamp for the comment and ensuring that the `article_id` and `user_id` refer to existing `article` and `user` records. The API should return a clear error message if those records do not exist.

## Review the provided solution (2 hours)

Similar to the previous part, we have provided a solution that you can investigate. This time, we added a few more functions and patterns to the solution you might still need to implement. You can use this solution to compare your implementation and see if there is anything you could apply to your code.

The solution could be simplified even more at the cost of an additional layer of indirection, but that would be too much for our first Express.js application.

# Directions for further research (1 hour+)

- How could you call your endpoints from a front-end web app?
- How could you get data by some condition using the `where` clause in Kysely?

---

TOTAL: 10 hours
