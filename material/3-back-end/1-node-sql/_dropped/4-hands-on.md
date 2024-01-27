# Task Description

The client needs a solution for their data storage problem. Currently, they are handling their data using spreadsheet files. It has become difficult for them to manage and track their data. They need a more efficient and scalable way to store, access, and manage their data.

In this project, you will use Node.js and SQLite to create a minimal solution for the client's problem.

This exercise will stress your knowledge on designing SQL tables, performing basic queries and using TypeScript to interact with a database. **You are not expected to nail every requirement on your first attempt**. Instead, you should try to get as far as you can on your own and then use the suggested solution to fill in the gaps in your knowledge. It will demonstrate how to implement the given requirements and most bonus challenges.

## Requirements

1. "importSpreadsheet" module.
  - It accepts a path to a SQLite database and a path to a local CSV file.
  - If the database has no tables, it is initialized with the database schema necessary to store all the data in a normalized manner across multiple tables
  - It inserts the data from the CSV file into the database.
  - If the rows with the same ID already exist in the database, they are updated with the new data.
  - Passing the same CSV file multiple times should not result in duplicate data.
  - Usage example: `importSpreadsheet(path.join(__dirname, './database.db'), path.join(__dirname, './data.csv'))`
2. "exportSpreadsheet" module.
  - It accepts a path to a SQLite database and a path to a local CSV file.
  - It exports all the data from the database into the provided CSV file. If the CSV file already exists, it is overwritten. If the CSV file does not exist, it is created.
  - The exported CSV file should match the format of the input CSV file provided in this exercise.
  - Usage example: `exportSpreadsheet(path.join(__dirname, './database.db'), path.join(__dirname, './data.csv'))`
3. Each package in the database should have references to the customer, driver, invoice and addresses (pickup and delivery).
4. Client wants to store delivery and pickup addresses in the same table.
5. Driver license number, invoice serial_number and table primary keys should be unique.
6. Client wants to use `length`, `width`, `height` columns instead of `size` for the package dimensions. Nevertheless, exporting the data should use the `size` column.
7. Do not use any SQL abstraction libraries (query builders, ORMs, etc.) since the goal of this exercise is to practice SQL queries.
8. Fields that do not have a value in the CSV file should be set to `NULL` in the database, and these fields should be nullable in the database schema.
9. You should not delete any data from the database; CSV files are only used to perform new inserts/updates.
10. It can be assumed that:
  - the CSV file can overwrite existing data in the database. For example, if one CSV import inserts the package with ID 1 and the second CSV import updates the package with ID 1, the final result should be that the package with ID 1 has the data from the second CSV import. It should not be assumed that the new CSV file will contain all the rows from the previous CSV files;
  - currency is always presented as ISO 4217 3-letter code;
  - size is always presented as a string in the format of `length x width x height` without spaces (e.g., `10x20x30`);

## Recommended Step-by-Step Approach

1. Setup project.
2. Split the problem into smaller sub-problems.
3. Use a CSV file to design the data model.
4. Create a database with a single table.
5. Allow inserting a single row into the database.
6. Allow updating existing data in the database.
7. Make your code more generic, so it works with multiple tables.
8. Allow exporting data to a CSV format.
9. Add more tests to cover more scenarios.
10. Refactor your code to make it more readable and independent from implementation details.

## Hints

- Look for npm packages for various tasks, such as converting CSV to JSON and vice versa.
- You can use SQLite in-memory database for testing purposes.

## Bonus Challenges

1. Use TypeScript, ESLint, and Prettier to develop your solution.
2. Use Test-Driven Development (TDD) to guide your development. You can use Vitest or Jest to run your tests.
3. Add data validation to ensure that the data in the CSV file and inserted into the database adhere to the correct format and data types.
4. How could you prevent SQL injection attacks in your solution?
5. Make your implementation work with multiple databases, such as SQLite and PostgreSQL.
6. Allow your script to be called from the command line and accept arguments for the database and CSV file paths.
7. If you are already experienced with Node.js, try using a different runtime, such as Deno or Bun, for this project (note: the provided solution was originally developed using Bun).
8. Try using foreign key constraints to ensure data integrity.

## Approach to Solving the Task

Follow this approach to tackle the hands-on exercise:

- Spend up to 10 hours attempting to solve the task on your own.
- If you struggle during the first hours and find it too difficult, try seeking help from your peers or JTLs for an additional 10 hours. Spend half of this time working with someone else, whether it's a study buddy, a peer who has completed the exercise, or a JTL in an open session.
- When you are no longer making any progress on your own, take a look at the suggested solution and walk through it step-by-step. Spend up to 10 more hours on the walkthrough while experimenting and learning from the provided solution.
- Try to go back to your own solution once the suggested solution clears up any obstacles you encountered.
- We recommend checking the final suggested solution even if you have completed the task on your own, to compare approaches and potentially learn new techniques.
