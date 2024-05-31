Part 1: PostgreSQL and TypeORM

# Part introduction

In this sprint, we will start working on applications with a front end and a back end.

Here is the sprint structure modeled after the general structure of a full-stack application:

![Full stack application](https://imgur.com/3OtDjnK.png)

In this part, we are leveling up our database! We are moving from SQLite to PostgreSQL - a significant leap forward in terms of the robustness and scalability of our tech stack. We do not expect you to become a PostgreSQL wizard overnight or even in a month. We want you to get a sense of how to use this new database even with limited knowledge, understand the general ideas behind them, and reach a basic level of proficiency where you can get something productive done.

Why are we making this move? SQLite is an excellent tool for learning SQL and works well for many embedded environments like browsers, mobile phones, and desktop applications. But, it has some limitations that make it less suitable for web-scale applications. Conversely, PostgreSQL is a more full-featured database that can handle high concurrency, large amounts of data and better database management tools. It also supports more advanced features and offers greater control over data management and access permissions.

Let's get started!

# Key learning topics & resources for this part

## SQLite limitations

SQLite is an excellent database for learning SQL and for many embedded environments. SQLite is used in many browsers, mobile phones, and desktop applications. However, some limitations of SQLite make it far from ideal for web-scale applications. Here are a few:

1. **Poor performance.** SQLite is not designed for high concurrency or dealing with large datasets.

2. **Limited data management options.** You might have already noticed that SQLite supports only a limited subset of ALTER TABLE. The ALTER TABLE command in SQLite allows the user to rename a table or add a new column to an existing table. It does not support other ALTER TABLE actions that involve managing constraints or dealing with columns that have constraints.

3. **Fewer access and authorization controls.** SQLite doesn't have built-in user management. There's no concept of user roles, permissions, or anything similar. This can be a significant limitation for more extensive applications with multiple users and varying access levels.

4. **Less functionality than other databases.** SQLite doesn't support some of the more advanced features of other databases. For example, it doesn't support stored procedures, user-defined functions, complex triggers, or other advanced SQL features. Most applications do not need all of these features, but many require at least a few.

These are just some of the reasons why we will be moving to full-fledged database.

While SQLite has been an excellent tool for us so far, we will use a full-fledged database that we'll need to get used to. Here are a few of the vital practical differences you need to be aware of before setting up a production-grade database for the first time:

1. **Database Location:** With SQLite, our database was a file living peacefully inside our project folder. But other SQL databases are a bit more mysterious - the database lives outside our project. In production, that might mean having a database on a different machine entirely! You won't find a nice `.db` file to keep you company anymore.

2. **Connection Credentials:** Remember how we could waltz into our SQLite database without knocking? Those days are over. We will move on to a database that is no longer just a static file but a separate service. We will need to ask politely to connect to it. This involves providing credentials, such as a username and password. These credentials are sensitive, so we'll store them in environment variables to keep them safe.

3. **Database Users/Roles:** Most databases have a concept of roles and/or users. When we connect to our database, we'll do so as a specific role with its own set of permissions.

## PostgreSQL (4 hours)

There are several SQL database engines, though most share the same core concepts. For the applications we will be working on, the differences between them are not that significant.

In this module, we will be working with the PostgreSQL database as it is:
- [highly compliant](https://www.postgresql.org/docs/current/features.html) with [SQL standards](https://en.wikipedia.org/wiki/SQL#Interoperability_and_standardization)
- highly adopted in the industry, topping some developer polls for most [used](https://survey.stackoverflow.co/2023/#section-most-popular-technologies-databases) and [loved](https://survey.stackoverflow.co/2023/#section-admired-and-desired-databases) databases
- free and open-source

**Note on versions:** We will assume that you will use PostgreSQL 16, though we will not rely on cutting-edge features, so if you can not install the latest version due to your OS, you can use an older version, such as 12.

**Starting with PostgreSQL**

Here are a few key resources on PostgreSQL that you should be aware of:

- [Official documentation](https://www.postgresql.org/docs/current/index.html) - great for looking up specific, nitty gritty, and version-specific information. However, there are better resources for learning PostgreSQL.
- [PostgreSQL Tutorial](https://www.postgresqltutorial.com/) - a great resource for learning PostgreSQL, including tutorials and examples.
- [Prisma's Data Guide on PostgreSQL](https://www.prisma.io/dataguide/postgresql) - a more general resource on databases and PostgreSQL.
- [PostgreSQL DBA guide](https://roadmap.sh/postgresql-dba) - an advanced guide on PostgreSQL for database administrators that touches upon many topics we will not cover in this module. You can explore it if you are interested in learning more about PostgreSQL and databases in general on your own.
- [A handy cheatsheet](https://quickref.me/postgres.html) for common PostgreSQL commands. You will generally use only `\c`, `\l`, `\d`, `\dt`.

**We will start with [Prisma's Data Guide on PostgreSQL](https://www.prisma.io/dataguide/postgresql)** as it is well-written and easy to follow. It will help us to get started with PostgreSQL.

Go through the following PostgreSQL Guide chapters:

- 📖 The benefits of PostgreSQL
- 📖 Getting to know PostgreSQL
- 📖 ⌨️ Setting up a local PostgreSQL database
  - **If you are using WSL**, follow the instructions for Linux (Ubuntu/Debian) and install it in your WSL.
  - **If you are using Mac**, we recommend using the [Postgres.app](https://postgresapp.com/) as it is the easiest way to get started with PostgreSQL on Mac. It is a standalone application that you can run in the background, and it will provide you with a PostgreSQL server. It also includes a GUI tool for managing your databases.
  - We recommend downloading the latest stable version. Downloading PostgreSQL through the Ubuntu package manager by default installs an older version. Follow the "Install using the PostgreSQL project's Debian and Ubuntu repositories" subsection, which includes adding the PostgreSQL repository, which allows downloading the most recent version. If you are having any issues with the provided installation guide, you can go directly to [PostgreSQL downloads page](https://www.postgresql.org/download/) or [PostgreSQL tutorials](https://www.postgresqltutorial.com/postgresql-getting-started/).
- 📖 ⌨️ Connecting to PostgreSQL databases
- 📖 ⌨️ How to create and delete databases and tables in PostgreSQL

**Go through step-by-step guides marked with a keyboard (⌨️) yourself.** By the end you should have a PostgreSQL database running on your machine.

Other chapters are entirely optional as they are irrelevant to us at the moment.

**Differences between SQLite and PostgreSQL**

**SQLite vs PostgreSQL queries**

For the most part, the SQLite and PostgreSQL queries are nearly identical. You will not need to re-learn SQL as most queries you have written for SQLite will work in PostgreSQL. There are some slight differences, however. For example, the following queries are equivalent in SQLite and PostgreSQL:

```sql
-- 1. Current timestamp
-- SQLite (using strftime, which is not standard SQL but a C function)
strftime('%s', 'now')

-- PostgreSQL (using extract, which is standard SQL)
extract(epoch from now())

-- 2. Using parameters.
-- SQLite (using ? as a parameter)
SELECT id, name, age
FROM dogs
WHERE breed_id = ? AND age > ?;

-- PostgreSQL (using $1 and $2 as parameters)
SELECT id, name
FROM dogs
WHERE breed_id = $1 AND age > $2;

-- 3. Case sensitivity.
-- SQLite uses a case-insensitive LIKE statement by default.
-- But it can be configured to be case-sensitive.

-- PostgreSQL has separate LIKE (case-sensitive) and ILIKE (case-insensitive) statements.
SELECT id, name
FROM dogs
WHERE name ILIKE 'fido'; -- This will match 'Fido', 'FIDO', 'fido', etc.
```

**Data types in PostgreSQL**

PostgreSQL has a lot more data types than SQLite. Luckily, you will only need to learn some of them as most are pretty niche-specific or at least not worth going into detail at this point. Here are some of the most common ones that should cover most of your needs:

1. Integer (int): Used to store whole numbers without decimal places. It is commonly used for holding IDs, counts, or other numeric values that do not require decimal precision.
2. Numeric: Used to store numbers with decimal places. It is commonly used for storing prices, non-integer quantities, percentages, or other numeric values requiring decimal precision.
3. Text/varchar: PostgreSQL does not distinguish between text and varchar columns. Varchar allows specifying a maximum length for the stored string. For example, a user's name or email address can be stored as varchar(100) to limit the length to 100 characters. If you do not specify a maximum length, it is the same as the `text` type, which can store strings of any length (up to 1 GB). It is generally recommended to use `text` with a check constraint to limit the length, as it is more flexible, but it is also acceptable to use `varchar` with a length limit. In some database engines, using `varchar` would be preferable for short strings.
4. Boolean: Used to store true or false values. It is commonly used for storing binary or boolean data, such as `is_public` for a blog post that can be either private or public.
5. Timestamp: A timestamp records a specific moment in time, such as a user's registration date and time. You should prefer using timestamps with time zone (`timestamptz`), which stores the timestamp in UTC. This ensures the timestamp represents the correct time, regardless of the server or client's time zone configuration.

You can find more information on these and similar types on the [Prisma's Data Guide](https://www.prisma.io/dataguide/postgresql/introduction-to-data-types). However, the five types above should cover most of your needs.

For a complete list, you can go to [PostgreSQL documentation](https://www.postgresql.org/docs/current/datatype.html), though it is not recommended to go through all of them at this point.

**Note on timezones 🕑:** You should [avoid dealing with timezones](https://www.youtube.com/watch?v=-5wpm-gesOY). Try to work with the same timezone (`UTC`) and use a PostgreSQL `timestamptz` type, which stores the timezone information. This requires ensuring your servers are configured to use the UTC timezone, usually the default in large cloud providers. If you want to set a timezone for your database, you can run `ALTER DATABASE database_name SET TIMEZONE TO 'Etc/UTC';` in your database client. For Node.js, you might want to always set the timezone to UTC by adding `process.env.TZ = 'Etc/UTC';` at the start of your application.

**Note on money 💸:** There is a built-in `money` type in PostgreSQL, but it is better to use the `numeric` type or to store the amount as an integer of cents or fractional cents, e.g., store $10.99 as 1099 or 109900 (depending on the fractional cent precision you need). Do not use floats, doubles, or other imprecise types to store financial data.

You can find more information on a few [data type recommendations on the PostgreSQL wiki](https://wiki.postgresql.org/wiki/Don%27t_Do_This).

## PostgreSQL: Connecting using a GUI client (0.5 hours)

While you might not need to use a GUI client for many day-to-day development tasks, it is helpful for exploring the database. We recommend choosing one of the following GUI tools:

- [dbBeaver](https://dbeaver.io/) - a free and open-source tool that supports many databases, including PostgreSQL. Recommended option.
- [HeidiSQL](https://www.heidisql.com/) - another solid free and open-source tool that supports multiple database servers.
- [pgAdmin](https://www.pgadmin.org/) is PostgreSQL's de facto GUI tool. However, setting up can be more challenging, especially when using WSL.
- VS Code extension [SQLTools](https://marketplace.visualstudio.com/items?itemName=mtxr.sqltools). It is less feature-rich than other options but is easy to install and offers enough functionality for our use cases. You will also need to install the [SQLTools PostgreSQL Driver](https://marketplace.visualstudio.com/items?itemName=mtxr.sqltools-driver-pg) extension to connect to PostgreSQL.

**WSL users** should install dbBeaver in their Windows environment. If you choose to use `pgAdmin`, you can install it on your WSL or Windows environment.

**Note:** tables in PostgreSQL are within **schemas**. You can think of schemas as folders for tables. By default, all tables are in the `public` schema. Sometimes, not specifying a schema can result in unexpected results. For example, selecting from the `user` table would return results from the PostgreSQL user list, not your `user` table. You can specify the schema by prefixing the table name with the schema name, e.g., `public.user`. However, most tools we use on the Node.js side will automatically prefix the table name with the schema name.

## PostgreSQL: Connecting from Node.js (0.5 hours)

- Watch and follow along: [Connect to PostgreSQL from Node.js](https://www.youtube.com/watch?v=O4bNwkC1ZxA) (10 mins)

**Note:** If you are using an IIFE (immediately invoked function expression) to wrap your top-level async function while writing in a semicolon-free style, you must add a semicolon just before the IIFE. Example:

```js
const pool = new Pool({/* ... */})

//This will throw an error
(async () => {
  // ...
})

//This will work
;(async () => {
  // ...
})

// Think about why this is happening.
// This is one of the few cases where
// relying on automatic semicolon insertion
// can cause issues.
```

## PostgreSQL: Connecting with Kysely (3 hours)

{{ MUST: add guide to migrate a Kysely project from SQLite to PostgreSQL }}

## PostgreSQL: Connecting with Kysely (solution) (1 hour)

{{ MUST: add }}

# Directions for further research (1 hour+)

- When might you still prefer using SQLite over a full-fledged database?
- What are the differences between `SERIAL` vs. `GENERATED AS IDENTITY` vs. `UUID`?
- How can you create an index in a database with TypeORM?
- What is an eager relation in TypeORM?
