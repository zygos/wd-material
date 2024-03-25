**2. Connect with `kysely`**

Revisit the Kysely documentation on [Kysely](https://kysely.dev/docs/getting-started#dialects). It provides an example of how to connect to PostgreSQL.

Use it to connect to your PostgreSQL database in any of your previous Kysely exercises. You can try out connecting to a database using the previous sprint's your own or provided solutions.

You might need to:

- change connection options to accept PostgreSQL username, password, database name, etc. instead of SQLite file path
- slightly adapt your existing migrations

---

**1. Storing database credentials in environment variables.**

Up until this point, we were dealing with a database file in SQLite which was never a secret. However, in PostgreSQL, we will be connecting to a database that lives outside of our project folder. Often, it might be on a different machine. Therefore, our database connection credentials are sensitive information and should not be stored in our code under any circumstances. Instead, we will store them in environment variables.

---

There are quite a few resources on TypeORM migrations online, however many are outdated, relying on deprecated features. Therefore, we have prepared some scripts to make it easier to use migrations with TypeORM that you can run with `npm run`:

- `migration:create my_migration_name` - creates a new migration file
- `migration:generate my_migration_name` - generates a migration file based on the difference between our entities and the database
- `migration:run` - runs all pending migrations
- `migration:revert` - reverts the last migration
- `migration:show` - shows all migrations and whether they have been run or not

**0. Create a PostgreSQL database for development and add its credentials to your `.env` file based on `.env.example`.**
**1. Generate a new migration.**
**2. Run the migration.**
**3. Run the application, create a few movies via your REST client.**
**4. Bonus challenge: Add an integration test that tests the basics of your REST API while using a PostgreSQL database.**

To get the best of both worlds, you would need 2 databases for most of your projects:

- **development database** - used for development and testing. It is automatically synced with our entities. We will not need to write migrations when working with it. It is great if we add some columns, then remove them, rename them, etc.
- **production-like database** - a database that you can use to generate migrations. It is not automatically synced with our entities. We would write migrations when working with it.

For the most part, TypeORM migrations are similar to migrations in Kysely. What are the key differences?

- TypeORM offers its own CLI tool for migrations. Thus, we do not need to write our own CLI scripts to run migrations. Unfortunately, TypeORM CLI tool is not very convenient to setup when using TypeScript. Therefore, we have added some helper scripts to make it work.
- With Kysely, we used our database as the source of truth and used it to generate our data types. With TypeORM, we will be using our entity definitions as the source of truth and use them to match our database to our entities.
- TypeORM offers a synchronization feature, which allows you to automatically apply implied migrations to match your database to your defined entities. This is very convenient for development and testing.
- While Kysely by convention recommends using an ISO date string (20231030154803 for 2023-10-30), TypeORM uses [UNIX time](https://en.wikipedia.org/wiki/Unix_time) (1698672741166 for the same date) for migrations. The idea is the same - we want to have a unique identifier for our migrations that is also sortable by time. The difference is only in the format. We will use CLI scripts to generate these timestamps for us.

---

While you will be using TypeORM in your sprint project on your own, for now we have provided a starting template that includes an adapted setup from our previous sprint.

**Note on boilerplates/starting templates:** As a junior developer you will very rarely work on something from scratch. Most of the time you will be working on existing codebases, fixing bugs, adding new features, etc. So it is important to learn how to read and understand code written by other people. We will be providing some lean boilerplates/starting templates for you to get started with exercises as setting up a project from scratch would be extremely non-representative of your future work. You could work for months or even years without having to setup a full project from scratch. While ideally we would like you to be able to do work from an empty file, if it comes at a cost of not being able to cover more important topics, we will prioritize the latter.

**Steps:**

0. Download/clone the provided template for this sprint.
1. Run tests with `npm test typeorm-1`.** They will fail.

**Notes on the template**:

1. It uses **our well-known movies database schema** so we can focus on the technical details and not the problem domain.
2. It uses `@server` as a `src` import path alias instead of the `@`, which we will explain later in this sprint.
3. It uses `zod` to validate environment variables. Once validated, they are exported as `@server/config`, which should be used instead of `process.env` directly.
4. It uses `zod` to validate incoming requests.
<!-- 5. It provides a more granual dependency injection down to individual route handlers. -->
6. It uses camelCase whenever interacting with the database in JS-land. However, when you need to write references to database tables or columns, you should use snake_case. For example, `movie_id` in the database is `movieId` in JS.
<!-- 7. **You do not need to worry about migrations or using PostgreSQL just yet.** Tests use an in-memory SQLite database, which gets recreated every time you run the tests to match the described entities. In the `database/entities` folder. To put it simply - you add a new column to the entity and it will be immediately available in the tests. -->
8. To keep our TypeScript setup consistent across sprints, we are keeping our `tsx` based setup. However, `tsx` does not support [emitting decorator metadata](https://esbuild.github.io/content-types/#no-type-system) which would allow to JavaScript code to inspect its TypeScript definitions. We will need to make a very simple change - we will need to specify the database column types which we would recommend anyway. For example, instead of `@Column()` we would use `@Column('text')` for a string.
9. We are using the data mapper pattern which means that our entities are not responsible for data access. Instead, we will use repositories to access our data. It is a more flexible approach that allows us to separate our business logic from data access.

---