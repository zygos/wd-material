## Install and setup PostgreSQL (1 hour)

In this module, we will be dealing working with PostgreSQL database, as it is:
- free and open-source
- [highly compliant](https://www.postgresql.org/docs/current/features.html) with [SQL standards](https://en.wikipedia.org/wiki/SQL#Interoperability_and_standardization)
- highly adopted in the industry, topping the polls for most [used](https://survey.stackoverflow.co/2023/#section-most-popular-technologies-databases) and [loved](https://survey.stackoverflow.co/2023/#section-admired-and-desired-databases) databases

You will likely use many other databases in your career, but the concepts you will learn here are applicable to all of them. SQL flavors matter only for some of the more advanced and administation tasks. If you find any tutorials or resources on your own that use a different SQL flavor (such as MySQL, MariaDB, SQLite, etc.), you can still follow along. The main differences are in the table creation syntax and the provided GUI tools which are optional anyway.

- Resource: [Setting up a local PostgreSQL database](https://www.prisma.io/dataguide/postgresql/setting-up-a-local-postgresql-database)
- Resource: [Try out the basic commands](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-postgresql-on-ubuntu-22-04) (starting from step 2)

## Connect to PostgreSQL from Node.js (0.5 hour)

- Resource: [Connect Node to Postgres](https://www.youtube.com/watch?v=O4bNwkC1ZxA)

---

**Note on timezones:** You should [avoid dealing with timezones](https://www.youtube.com/watch?v=-5wpm-gesOY). Try to work with the same timezone (`UTC`) and use a PostgreSQL `timestamptz` type which stores the timezone information. This requires ensuring your servers are configured to use UTC timezone, though this is usually the default in large cloud providers. If you want to set a timezone for your database, you can do so by running `SET TIMEZONE='Etc/UTC';` in your database client and then running `SHOW TIMEZONE;` to verify that it was set correctly. For Node.js, you might want to always set the timezone to UTC by running `process.env.TZ = 'Etc/UTC';` at the start of your application.

---

- What are the differences between `SERIAL` vs. `GENERATED AS IDENTITY` vs. `UUID`?
- How can you create an index in a database?
- Would a `PRIMARY` or `UNIQUE` field have an index created for it automatically?
