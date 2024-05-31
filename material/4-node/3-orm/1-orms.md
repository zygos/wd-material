
## ORMs

In the previous sprint, we were dealing with SQL operations rather directly. Kysely helped us write safe queries with TypeScript types. However, we still had to write a lot of boilerplate code for our migrations and repositories. Can we automate some of these tasks?

Yes, we can. We can use an ORM, a type of library that manages our database relations via objects and acts as a thicker layer between our business logic and the database. However, ORMs are not a silver bullet; they come with their own trade-offs.

Some of the pros of using an ORM:

- we do not need to write most migrations by hand
- we do not need to write repeating logic for repositories
- we can think less about the particulars of our database (PostgreSQL, MySQL, SQLite, etc.)
- we can handle relations between tables in our code
- we have a standard way interface for a repository, which makes it easier to mock in tests

Some of the cons of using an ORM:

- we need to learn a new library, which might be quite complex
- it can be harder to optimize queries as we are not dealing with them directly
- some more niche database features that are not supported by the ORM might be more challenging to use
- ORMs tend to be quite heavy. Even importing an ORM can add a decent overhead to our application and tests.

You were tangentially introduced to the concept of ORMs in the previous sprint and [how it is different from a query builder](https://www.prisma.io/dataguide/types/relational/comparing-sql-query-builders-and-orms), such as Kysely.

The critical difference between ORMs and query builders is that ORMs shift our attention from tables and columns to objects living in our source code. Each ORM draws a line between the database and the application in a different way. Some lighter ORMs are only a thin layer on top of a query builder, while others are more opinionated and provide much functionality out of the box as long as you buy into their way of doing things.

There are plenty of ORMs out there, and we can not cover all of them. There are many options, even if we limit ourselves to JavaScript packages! You might have seen some of them mentioned in online tutorials:

- Prisma
- Sequelize
- TypeORM

They all have their own spin on dealing with the database. We will be using TypeORM in this sprint. It represents ORMs used in the industry outside of the JavaScript ecosystem. Also, we want to introduce you to at least one library that uses **classes and decorators** as you will encounter them in the wild, especially in OOP-heavy codebases. That means we will need to (re)learn some basics of using classes. We do not expect you to understand everything that is going on with classes and decorators, but we want you to be able to read and write code that uses them.

## TypeORM (3 hours)

- Watch: [TypeORM Crash Course](https://www.youtube.com/watch?v=JaTbzPcyiOE) (2 hours)

We recommend following along up until **1:01:30**. From then on, the video primarily focuses on the Active Record pattern, which we will not use. We will use the Data Mapper pattern with repositories instead, which you are already familiar with from the previous sprint. However, watching the entire video is still recommended as it will give you a good overview of TypeORM.

**Notes on the video:**
- **11:20** - The project installs a TypeScript setup with `ts-node`, `typescript`, and `nodemon`. Our module exercises primarily use a setup with `tsx`, which does not require these dependencies. However, for this video crash course, you should follow the same setup in the video.
- **12:12** - The video installs TypeORM version 0.2.34, which is slightly older than the current version. We will be relying on **0.3.x** versions of TypeORM. In TypeORM, all 0.x versions can introduce breaking changes, which means not everything written for **0.2** is compatible with **0.3** versions.
- **13:20** - We do not recommend installing any packages globally. Instead, you should install them locally into your project and use `npx` to run them. Whenever you use a global dependency, you are introducing the "it works on my machine" problem. The main idea behind `package.json` is to have a declared list of dependencies required to run your project. Global dependencies exist outside of that list.
- **15:20** - Instead of using `createConnection(options)`, use `new DataSource(options)`. `DataSource` can be imported from `typeorm`. This is a breaking change between 0.2 and 0.3 versions of TypeORM.
- **24:50** - `BaseEntity` is used for the Active Record pattern. In Active Record, the model is responsible for data access and business logic. There is a different pattern - Data Mapper where the model is only responsible for business logic, while the data access is handled by a separate class - a repository. You can read more about the differences between the two patterns in [TypeORM documentation](https://typeorm.io/active-record-data-mapper). We will use the Data Mapper pattern in our exercises as it is easier to test.
- **26:05** - In our boilerplates, we use `esbuild` (through `tsx` and `vitest`) to compile TypeScript. However, `esbuild` does not support [emitting decorator metadata](https://esbuild.github.io/content-types/#no-type-system). Thus, we have three options - use a slower `ts-node` + `nodemon` setup, use an alternative TypeScript compiler (`swc`), or do not rely on decorator metadata. All of these options have their drawbacks. We will use the last option for now as we prioritize having a simple setup with fewer dependencies. That requires always specifying the database types for our columns, which is a good practice. For example, instead of `@Column()`, we would use `@Column('text')`.
- **40:53** - You will be introduced to Entity Inheritance. This example presents it as a tool to minimize code duplication. However, this is not the right reason to use inheritance. Unlike composition, inheritance **should not be used as [a tool for code reuse](https://www.yegor256.com/2016/09/13/inheritance-is-procedural.html)**. Just because a few objects share some common properties, that does not mean they should be inherited from a shared base class. We recommend not to use inheritance in most cases. In professional practice, since inheritance introduces strong coupling, you should consult someone more senior in your team before using it in hard-to-reverse areas such as database models.

## Migrations with TypeORM

With Kysely, we had the following workflow:

1. Write a migration file to update the database.
2. Run the migration file.
3. Run codegen to match our TypeScript types to the database.

With TypeORM, our focus is on entity definitions. Therefore, our workflow will look a bit different. We have 3 options for creating tables and columns in our database:

A. Create them manually, which is tedious, not repeatable and error-prone;
B. Use the `synchronize` option to compare our entities to our database and automatically apply an auto-generated migration. This is very convenient for development but should be avoided when deploying production apps, as it can lead to data loss. For example, sometimes renaming a field in our schema can be interpreted as dropping the existing column and creating a new one, which will result in data loss of the old column;
C. Use file-based migrations that are repeatable and can be reviewed before being pushed to an actual production server.

If we wanted to deploy our application to production, we would like to do that with file-based migrations. However, in this sprint, we will focus only on the development workflow with the `synchronize` option, and we will skip the migration file generation step.

Thus, with TypeORM, we will work with schema synchronization, making it very easy to start a new project. Our entire workflow will look like this:

1. Write/update an entity class. There is nothing more to do; it will be automatically synced with the database.

## Exercises: Entities and Data Mapper with TypeORM (5 hours)

We will go through a set of exercises to ensure you know enough to start using TypeORM in your projects. Also, we will familiarize you with:

- Using TypeORM repositories, which we will use instead of the Active Record pattern.
- Adding column data types, which we will use instead of relying on decorator metadata, which is not supported by `esbuild`.
- Using zod schemas in conjunction with TypeORM entities.

We will end with a small data schema that we will use in upcoming sprint exercises.

A few notes before we start:

- We have included a function that creates in-memory SQLite databases for testing. These are easy and fast to set up. We could run the same tests against an actual PostgreSQL database, but that would require more work with test setup.
- We have added TypeORM's Snake Naming Strategy, which lets us write our entity classes in camelCase while the database tables and columns will be in snake_case. This is a standard convention.

[Download the TypeORM exercises](https://drive.google.com/file/d/130P252GA55Ii__8I4GdljDx90ThKURhc/view?usp=drive_link).

Start with the `README.md` file, which contains a few notes on getting started.
