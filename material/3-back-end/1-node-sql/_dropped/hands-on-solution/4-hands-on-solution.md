There are various ways to go through this exercise. If you had previous experience with databases and data modeling, you might want to experiment with other ways of solving this problem. For example, you could start with building an abstraction over your tables (repositories), which is a common way of interacting with databases, especially in OOP.

However, in this solution, we will focus on interacting with SQL with minimal abstractions while still arriving at a solution that is easy to read and maintain.

We will work through the hands-on exercise in the TDD (test-driven development) flow. Tests will be used not to ensure correctness of the code, but to guide us through the development process.

## 1. Setup project.

First, we need to create a new project. We will create a blank TypeScript project with the following dev dependencies:

- `@tsconfig/node20`
- `@types/node`
- `typescript`
- `vitest`

We will skip linting, formatting and TypeScript configuration as it is not the focus of this exercise and it is as easy as installing the eslint/prettier plugins and copying the config files from another project. You can inspect the files in the provided solution to see how they are configured.

We will install additional dependencies as we go.

## 2. Split the problem.

We have 2 main flows: **import from a spreadsheet**` and **export to a spreadsheet**.

We can then split the problem into smaller parts:

- import from a spreadsheet
  - read a CSV file: `file path -> string`
  - parse CSV file: `string -> array of objects`
  - insert new data into a database table: `array of objects -> database`
  - update data that is in the spreadsheet: `array of objects -> database`
- export to a spreadsheet
  - read data from a database table: `database -> array of objects`
  - convert data to CSV: `array of objects -> string`

Both of these flows depend on a **database with tables**, so we will start by creating a database. So, we will need to start by creating a database with tables.

## 3. Use CSV file to design the data model.

The first thing we need to do is to design our data model. The CSV file is denormalized and contains data that could be split into multiple tables. After some analysis, we can come up with the following list of tables:

- address
- customer
- driver
- invoice
- package

The given file contains a rather clear list of columns for each table. We will not try to get all columns right from the start, especially the data types. In some cases, there are multiple valid options for the data type. For example, invoice amount can be stored as a decimal number or an integer number of cents. For this example, we will use the decimal number as it is slightly easier to work with.

## 4. Create a database with a single table.

To know if our code works, we need to be able to test it. We could test it manually by creating a database on a file, running some code against it and then checking the results. However, this is not very convenient, quite slow and does not guarantee that we will get the same results every time we run the test.

To know whether we are making progress and whether our changes break anything, we would like to have a test suite that guides us through the development process.

We can leverage the fact that SQLite databases can be created in memory. Running in memory means that there will be no files on the disk and the database will be destroyed when the process exits. This is very convenient for testing as we can create a new database for each test and we do not need to worry about cleaning up after the test.

We could then follow the flow of:

1. **Writing a test for a simple scenario**.

```ts
it('should import a single customer', async () => {
  const database = createDatabaseWithTables()
  const csv = `...`

  await importSpreadsheet(database, csv)

  const customers = await database.query('SELECT * FROM customers')

  expect(customers).toEqual(...)
})
```

2. **Write a very naive/hard-coded implementation to make the test pass**.

3. **Add more tests to cover more dynamic scenarios**.

4. **Refactor the code to make it more generic**.

We will start with the first step: **creating a database with a single table**.

To make matters simple, we will start with the simplest table - `customer`. It contains only 2 columns: `id` and `name`.

To do that, we will need to connect to the database and execute some SQL. There are plenty of libraries that allow us to interact with SQLite in Node.js. We could pick any of the few most popular libaries. In this case, we will go for `better-sqlite3` as it has plenty of usage and it has recent updates, which is a sign of a healthy project.

So, we will install `npm i better-sqlite3`.

Let's start by working on a basic scenario: creating a database with a single table.

Let's create a folder `createTables`, which will be our module responsible for creating tables in the database. It will also be responsible for testing itself to make sure that it is working correctly. We will create two files inside of that folder:

- `createTables.spec.ts` which will specify what we want to achieve
- `index.ts` - which will contain the implementation

```ts
/* createTables/createTables.spec.ts */
import { it } from 'vitest'

it('creates a customer table', () => {
  // 1. create clean database for the test
  // 2. run the function which will create all tables
  // 3. check if we can do something with the table, for example SELECT
})
```

After some research, we can come up with the following test:

```ts
/* createTables/createTables.spec.ts */
import { it, expect } from 'vitest'
import sqlite from 'better-sqlite3'
import createTables from '.' // this will import the index.ts file

it('creates a customer table', () => {
  // 1. create clean database for the test
  const database = sqlite(':memory:')

  // 2. run the function which will create all tables
  createTables(database)

  // 3. check if we can do something with the table, for example SELECT.
  // The library we are using has 2 ways of executing SQL:
  // - exec - which executes a statement and returns nothing
  // - prepare - which prepares a statement which can be executed with
  //   - "run" to execute a statement
  //   - "all" to execute a statement and return results as an array
  const customers = database.prepare(`SELECT * FROM customer`).all()

  expect(customers).toEqual([])
})
```

**Note:** You might notice that `sqlite` does not offer any TypeScript types. This is a common problem with many libraries written in JavaScript. In this case, we can search npm for "better-sqlite3 types" and we will find a package `@types/better-sqlite3` which we can install to get the types `npm i -D @types/better-sqlite3`. Now, our database should have types.

```ts
/* createTables/index.ts */
export default function createTables(database) {
  // nothing here yet
}
```

We can run the test with `npx vitest createTables` (or `npm test createTables`, if we have set up the `test` script in `package.json`).

The test should fail with a "SqliteError: no such table: customer" error as we are not yet creating a table - our function is empty. Let's work on that. We might need to do some research to figure out how to create a table the way we want it.

```ts
export default function createTables(database) {
  database.exec(`CREATE TABLE customer (
    id integer PRIMARY KEY,
    name varchar NOT NULL
  )`)
}
```

We can run the test again and it should pass. At this point, we could:

- add more tables
- refactor the code to make it more generic
- move on to other parts of the problem

In this case, we can be quite confident that we will be able to add more tables in the future just by adding more SQL statements. Refactoring is a good idea, but given that we have some time constraints, we should **explore other parts of the problem that we are less confident about**. Let's try to make a complete flow of creating 1 table in the database and importing a single row from a spreadsheet. This will touch on all the core parts of the problem.

## 5. Allow inserting a single row into the database.

We can create a test file for this flow: **inserting data from a spreadsheet**.

Just like before, we will start with 2 files:

- `importSpreadsheet/importSpreadsheet.spec.ts` - which will specify what we want to achieve
- `importSpreadsheet/index.ts` - which will contain the implementation

```ts
/* importSpreadsheet/importSpreadsheet.spec.ts */
import { it, expect } from 'vitest'
import sqlite from 'better-sqlite3'
import createTables from '../createTables'
import importSpreadsheet from '.'

it('should import a single customer', async () => {
  // create database with tables
  const database = sqlite(':memory:')
  createTables(database)

  // import data from a CSV string
  const csv = 'customer_id,customer_name\n1,John Doe'

  await importSpreadsheet(database, csv)

  // check if the data was imported correctly
  const customers = database.prepare('SELECT * FROM customer').all()
  expect(customers).toEqual([
    {
      id: 1,
      name: 'John Doe',
    },
  ])
})
```

Let's start the test with `npx vitest importSpreadsheet`. It should fail. Let's make it pass.

We could start out with the most hard-coded implementation:

```ts
/* importSpreadsheet/index.ts */
export default async function importSpreadsheet(database, csv) {
  database.exec(`INSERT INTO customer (id, name) VALUES (1, 'John Doe')`)
}
```

Here we are completely ignoring the CSV file and just inserting a single row into the database. While we will not be able to use this moving forward, it is a good starting point to make sure that we can insert data into the database. This works as a **"sanity check"** to make sure that we are not missing anything obvious.

We can now refactor our function to actually parse the given CSV file. We could do it manually, but Node ecosystem has plenty of libraries that can help us with that. Let's say we find 3 packages:

- `csv-parser`
- `neat-csv`
- `json-2-csv`

All 3 pass our surface level requirements. We can pick any of them. `csv-parser` seems great if we need to stream the data, but we don't need that and that would make the code more complex. `neat-csv` seems to be easier to use. Finally, `json-2-csv` seems to work similarly to `neat-csv`, except that it provides a way to convert the data back to CSV, which we will need later. Let's try out `json-2-csv`.

```ts
/* importSpreadsheet/index.ts */
import { csv2json } from 'json-2-csv'

export default async function importSpreadsheet(database, csv) {
  const customers = await csv2json(csv)
  const customer = customers[0]

  database.exec(
    `INSERT INTO customer (id, name) VALUES (${customer.customer_id}, '${customer.customer_name}')`
  )
}
```

That's a step in the right direction. We are now parsing the CSV file and our test passes.

There are a few problems with this implementation:

1. it does not work for multiple rows
2. it is not generic - it only works for the `customer` table
3. it is not safe - it is vulnerable to SQL injection as someone could provide us with a large CSV file that contains SQL code in the data
4. we are not validating our data so if there is some problem with data type mismatch, we will know about it only when we try to insert the data into the database. This would likely result in some cryptic error message. Ideally, we would like to know about the problem as soon as possible.

We can now refactor our solution to make it more generic and safer. Each problem can be addressed separately:

1. we can use some sort of iteration to insert multiple rows. Though, do we need to have multiple SQL statements? Can we insert multiple rows with a single statement? We can either remember the SQL syntax or do some research. We can find that we can use `INSERT INTO ... VALUES (...), (...), ...` syntax to insert multiple rows with a single statement. In that case, we would need to form a `INSERT INTO customer (id, name) VALUES ${values}` query.
2. We could either repeat the same logic for each table or we could try to make it generic by having a function which would accept a table name, list of columns, values and would run the `INSERT INTO ${table} (${columns}) VALUES ${values}`. We could then call that function for each table.
3. We could add parameters to the SQL statement instead of just concatinating the values into the query. We could then use the `prepare` function to prepare the statement and then run it with the values. This would make the code safe from SQL injection. Then, our statement would look like this: . We would then run it with `database.prepare('INSERT INTO customer (id, name) VALUES (?, ?)').run([customer.customer_id, customer.customer_name])`.
4. We could add validation to make sure that the data we have just parsed from the spreadsheet is correct. There are many ways to do that:

- manual validation - we could write functions that would check if the data is correct. For example, we could check if the `customer_id` is a number and if the `customer_name` is a string. This would be quite tedious, repetitive and error prone. At the same time, it is very flexible as we can write any validation we want without any possible limitations.
- using a library - we could use a library that would validate the data for us.

Given that implementation flexibility is not a priority and our problem seems to be quite generic, we will go with a library. There are multiple libraries to accomplish this task. If we look for data validation libraries on npm, we would find such libs as `ajv`, `joi`, `zod` and many more. We could pick any of them. The one that stands out is `zod` as it not only allows validating data, but it also intelligently creates TypeScript types for the data. So we will go with `zod`. This will allow us to be more confident about the data at the time we are working with it (due to TypeScript type definitions) and it will also allow us to validate the data at run time before we insert it into the database.

Most of these considerations might not be worth our time at this moment. At the moment, we can opt to add parameters to the SQL statement as that takes only a minute and it would not only make our code safer, but also more generic.

## 6. Allow updating existing data in the database.

Similarly to the previous step, we will start with a test:

```ts
it('should update existing customer without modifying other customers', async () => {
  // create database with tables
  const database = sqlite(':memory:')
  createTables(database)

  // import data from a CSV string
  const csv1 = 'customer_id,customer_name\n1,John Doe\n2,Jane Doe'
  await importSpreadsheet(database, csv1)

  // update data in the database with a partial update
  const csv2 = 'customer_id,customer_name\n1,Johnny Doe'
  await importSpreadsheet(database, csv2)

  // check if the data was imported correctly
  const customers = database.prepare('SELECT * FROM customer').all()
  expect(customers).toEqual([
    // updated
    {
      id: 1,
      name: 'Johnny Doe',
    },

    // unchanged
    {
      id: 2,
      name: 'Jane Doe',
    },
  ])
})
```

We can do implement this in 2 ways:

- by selecting existing data from the database by id and then updating the data that we have in the CSV file
- by using `ON CONFLICT` clause in the `INSERT` statement. This would allow us to perform INSERT and UPDATE in a single statement. This would require us knowing the primary key of the table. Luckily, in our case, we know that the primary key is `id` for all tables.

In the provided solution, we went with the second option as it is easier to implement. However, both options are valid for a problem like this.

## 7. Make your code more generic so it works with multiple tables.

It's great that our code works on a single table. However, we have more tables and we would like to be able to import data into all of them. We can add a single test, which will check if we can import data into multiple tables. It will obviously fail as our code is not generic enough.

For our code to work on multiple tables, we might consider introducing another step in our code:

```
- parsing CSV file (string -> array of objects)
- mapping objects to database rows (array of spreadsheet format objects -> array of database format objects)
- performing SQL queries (array of database format objects -> database)
```

For example:

```ts
// we call some function to read a file, we get:
const csv = 'customer_id,customer_name,package_id\n1,John Doe,3'

// we call some function to parse the CSV file, to reach something more usable:
const parsed = [
  {
    customer_id: 1,
    customer_name: 'John Doe',
    package_id: 3,
  },
]

// we call some function to map the data to database format:
const tablesRows = {
  customer: [
    {
      id: 1,
      name: 'John Doe',
    },
  ],
  package: [
    {
      id: 3,
      customer_id: 1,
    },
  ],
}

// finally, the database can simply insert/update the data:
syncTables(tablesRows)
```

We could choose a different format for the data, but this one seems to be quite easy to work with. Also, it leaves a possibility to use some sort of `[tableName]: TableRecordType[]` TypeScript type definition down the line.

To implement these steps, we would need to split up our current logic into multiple functions and iteratively add tests to make sure we are progressing in the right direction.

This results in 3 modules:

- `parseFile`
- `formRows`
- `syncTables`

Each module contains a test file and an implementation file. You can check the provided solution to see how it is implemented.

## 8. Allow exporting data to a CSV format.

Exporting data to a CSV format would require to do the opposite of what we did when importing data from a CSV file. We would need to:

- read data from the database (`SELECT` with `JOIN` statements)
- map the data to the JS object for the spreadsheet
- convert the data to CSV

All things considered, the solution is quite straightforward and it can be even expressed as a single SQL statement, which can be stored in the JS file as a string or in a separate SQL file.

The only tricky part is how should we test it? Ideally, to test data exporting, we should not rely on data importing working correctly. Trying to test both would result in a complex integration test that would not tell us much about the problem apart from the fact that the whole flow works. We would like that our exporting test breaks only when the exporting code is broken and not when the importing code is broken.

To do that, we could use `sqlite` to create a database in a file and then use it to test the export flow in isolation. Right now, we are only using SQLite as in-memory database, but it can also be used to create a database in a file. We could run a data importing test against a file to create a portable database and then use it as a fixture to develop the data exporting flow.

Then, we would end up with a test that looks like this:

```ts
import { it, expect } from 'vitest'
import { join } from 'node:path'
import createDatabase from '../../database'
import exportSpreadsheet from '..'

it('should return all results in the CSV format', async () => {
  // a database with data imported from a CSV file
  const database = createDatabase(join(__dirname, './fixtures/database.db'))

  // a CSV file we would like to end up with, this could be the source file
  const csvExpected = readFile(join(__dirname, './fixtures/expected.csv'))
  const csv = await exportSpreadsheet(database)

  expect(csv).toEqual(csvExpected)
})
```

Then, we can implement `exportSpreadsheet` to make our test pass. There are a few caveats when dealing with CSVs and trying to make our tests robust as CSVs sometimes can be formatted in different ways. For example, some libraries might wrap values in quotes, some might not. Given that we do not particularly care about the formatting of the CSV file, we might need to adapt our test to make sure that it is checking the content of the CSV file and not the formatting. One way to do that is to parse the CSV file and then compare the parsed data instead of comparing the raw CSV strings. How that could be done is shown in the provided solution.

**Note:** Most professional environments use various abstraction layers on top of the database which allow us to check if the data is correct without relying on the database implementation details.

## 9. Add more tests to cover more scenarios.

We have ignored some potential issues to get the core functionality working. Now, we can add more tests to make sure that our code is robust and works in more scenarios.

For example:

- what happens if some fields are null?
- what happens if we provide multiple records with the same id?
- what happens if we provide multiple records with conflicting data in the same spreadsheet (e.g. different names for the same customer id)?

It is best to figure out how we would like to test these scenarios and then add tests to make sure that we are covering all the cases.

## 10. Refactor your code to make it more readable and independent from implementation details.

Finally, we can refactor our code to make it more readable and independent from implementation details. For example, we could:

- add missing types
- add more documentation
- rename variables and functions to make the code more readable
- consider consolidating repeated code into functions or classes
- think about making our solution withstand possible future changes - change in order of columns in the CSV file, change in the database schema, etc.
- for learning purposes, abstracting the database implementation into an interface so that we can switch between different databases (e.g. SQLite, PostgreSQL, etc.) without changing the code
- supporting transactions for databases that support them

Some of these changes are provided in the solution.
