Part 2: Introduction to SQL

# Part introduction

This part will delve into SQL (Structured Query Language), which manages and manipulates relational databases. We'll explore relational and non-relational databases, understand their differences, and learn how to use SQL to interact with data. We will also work through several practical exercises to hone our SQL skills, including solving a mystery using SQL queries!

# Key learning topics & resources for this part

## Databases (0.5 hours)

One of the main reasons for having a back-end server is to store persistent data. A database is a structured collection of data. There are many different types of databases, but we can generally divide them into two categories: relational and non-relational.

**Relational databases**

Relational databases store data in tables of rows and columns, similar to a spreadsheet. The critical advantage of relational databases is that they are well-suited for handling complex data relationships. Relational databases nearly universally use **SQL (Structured Query Language)** to interact with the data.

The most popular SQL databases are:
- `PostgreSQL` - open-source, free, advanced features, highly SQL compliant
- `MySQL` - open-source, (mostly) free, easy-to-use
- `SQLite` - SQL database that stores data in a portable file
- `MariaDB` - open-source fork of MySQL that does not belong to Oracle
- `Microsoft SQL Server` - commercial, advanced features, uses a different SQL dialect

**Non-relational databases**

Non-relational databases do not store data in tables of rows and columns.

For example, the browser has a key-value database - `localStorage`. A popular example of a key-value database in the back end is Redis.

Other examples of non-relational databases are MongoDB, Elasticsearch, etc. These databases are also called **NoSQL databases** as they do not use SQL (Structured Query Language) for querying data.

For more detailed database paradigms, [watch this short video](https://www.youtube.com/watch?v=W2Z7fbCLSTw). It serves as a quick overview to familiarize you with the database landscape. We will be focusing on relational databases in this module.

In this sprint, we will primarily use `SQLite` as it is the easiest to set up and use. The SQL syntax is mostly the same across all SQL databases. If you search for additional material on SQL, you might find some MySQL or PostgreSQL tutorials. You can follow these tutorials, but some administrative commands (such as listing databases, tables, switching active databases, etc.) are different. Apart from that, most other day-to-day SQL commands are the same.

## [CS50 Week 7: SQL (3 hours)](https://cs50.harvard.edu/x/2023/weeks/7/)

**Important notes to follow the lecture:**

To follow along with the SQL demonstrations, you can either:
- go back to the [CS50 code editor](https://cs50.dev/)
- use [SQLite Online](https://sqliteonline.com/)
- (Recommended) Install `sqlite3` on your machine. macOS and most Linux distributions come with `sqlite3` pre-installed. You can test it by running `sqlite3` in your terminal. You can exit the `sqlite3` shell by typing `.quit` or pressing `Ctrl/Cmd + D`.

If you do not have it installed on a Ubuntu/WSL machine, you can install it by running:

```bash
sudo apt install sqlite3
```

If you are using Windows as your development environment (not WSL), you can follow the instructions [here](https://www.sqlitetutorial.net/download-install-sqlite/). Installing a GUI client is optional. We will be using the `sqlite3` command-line tool. As a developer, you are recommended to learn to use command-line tools over GUI tools.

**Notes on the segment starting from 1:52:20:**

There are many libraries for interacting with SQLite in Node.js. We recommend using [better-sqlite3](https://www.npmjs.com/package/better-sqlite3), as it provides the most straightforward API without callbacks or Promises.

To use SQLite, run these commands in a new folder:

```bash
npm init -y
npm i better-sqlite3
```

Make sure to add `"type": "module"` to your `package.json` file so we can use ES6 modules. Create a file, for example, `favorites.js`, and run it with `node favorites.js`. If you download the [source code](https://cdn.cs50.net/2022/fall/lectures/7/src7.zip) for the lecture and place the `favorites/favorites.db` file in the same folder as your `favorites.js` file, you will be able to interact with it in Node.js.

For selecting elements, you would use:

```js
import sqlite from 'better-sqlite3';

const db = sqlite('favorites.db');

const favorites = db
  .prepare(`SELECT * FROM favorites`)
  .all();

console.log(favorites);
```

For adding `?` parameters to your query, you could use:

```js
const favorites = db
  .prepare(`SELECT COUNT(*) AS n FROM favorites WHERE problem = ?`)
  .all(['Mario']);
```

Some other useful methods are:
- `db.exec('CREATE TABLE ...')` to run a SQL query without parameters and without returning any data
- `db.prepare('INSERT INTO cats (name, age) VALUES (?, ?)').run(['Fluffy', 3])` to run a SQL query with parameters
- `db.prepare('SELECT * FROM cats WHERE name = ?').get(['Fluffy'])` to run a SQL query with parameters and get a single row (while `.all` returns an array of rows)

You can optionally check out the [better-sqlite3](https://github.com/WiseLibs/better-sqlite3) documentation, but given you know how to run the queries, you should be able to figure out the rest.

## [CS50 Week 7: SQL Section (2 hours)](https://cs50.harvard.edu/x/2023/sections/7/)

This section will guide you through the basics of the [Hall of Prophecy](https://cs50.harvard.edu/x/2023/problems/7/prophecy/) exercise. You will be using SQL to query a database of Harry Potter characters. Follow along with the video and try to answer the raised questions yourself before the instructor answers them.

## [Exercise: Songs (2 hours)](https://cs50.harvard.edu/x/2023/labs/7/)

In this exercise, you will use SQL to query a database of songs. You will be given a database with songs and artists, and your task will be to explore the data and answer some questions about it.

For this exercise, you can use [cs50.dev editor](https://cs50.dev/) or you can use `sqlite3` in your local machine. If you want to use `check50` and `submit50` in your local machine, you will need to:
- make sure you have `pip` and `python` installed (run `pip --version` to check)
- install `check50` - `pip install check50`. [Documentation](https://cs50.readthedocs.io/projects/check50/en/latest/index.html).
- install `submit50` - `pip install submit50`. [Documentation](https://cs50.readthedocs.io/submit50/).
- assuming that you have set up `git` in your terminal, go to `https://submit.cs50.io` to grant `check50` access to your public GitHub information

## [Exercise: Fiftyville (2 hours)](https://cs50.harvard.edu/x/2023/psets/7/fiftyville/)

Find the thief in Fiftyville. If you manage to get through the exercise in under an hour, try to get through the exercise using as few queries as possible. Maybe you could use the result of one query to feed into another query?

# Directions for further research (2 hours+)

- What is a `HAVING` clause, and when can it be used?
- What is the primary purpose of foreign keys? Why might we prefer foreign keys over regular integer columns? Are there cases when we would not want to use a foreign key?
- What are the pros/cons of using an integer vs. a UUID as a primary key?
- There are various types of JOINs. What are the differences between them?
- What is the default type of JOIN in SQL?
- When might you consider using a NoSQL database, such as MongoDB or Redis, instead of an SQL database?
