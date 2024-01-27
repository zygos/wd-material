Part 4: Dynamic queries in Node.js

# Task Description

Your client is a small shipping company that wants to migrate from spreadsheets to a database for managing deliveries. This exercise will depend on your TypeScript and SQL knowledge, focusing on performing basic queries in an automated manner.

In this project, you will work on an unfinished solution developed using Node.js and SQLite. Your task is to finish the given solution to pass the tests and fulfill the requirements.

It is important to note that tests are not exhaustive and are only used to guide you in the right direction. Most of your tests will run against an in-memory database, so you can run them as many times as you want without affecting the database.

## Requirements

1. "importSpreadsheet" module.
  - It accepts a path to a SQLite database and a path to a local CSV file.
  - The missing tables are created if the database does not contain some expected tables.
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
6. Client wants to use `length`, `width`, `height` columns instead of `size` for the package dimensions. Nevertheless, exporting the data should use the `size` column so that the exported CSV file matches the format of the input CSV file.
7. Fields that do not have a value in the CSV file should be set to `NULL` in the database, and these fields should be nullable in the database schema.
8. You should not delete any data from the database; CSV files are only used to perform new inserts/updates.
9. It can be assumed that:
  - each row will have a product_id, which will not be repeated in the same CSV file;
  - the CSV file can overwrite existing data in the database. For example, if one CSV import inserts the package with ID 1 and the second CSV import updates the package with ID 1, the final result should be that the package with ID 1 has the data from the second CSV import. It should not be assumed that the new CSV file will contain all the rows from the previous CSV files;
  - currency is always presented as ISO 4217 3-letter code;
  - package size is always presented as a string in the format of `length x width x height` without spaces (e.g., `10x20x30`);

## Bonus Challenges

1. Use transactions to ensure the data is not corrupted if the application crashes during import.
2. Add foreign keys to the database schema.
3. Design the database interface in a generalized way so that it can operate with various databases like SQLite, PostgreSQL, and MySQL.

## Recommended Step-by-Step Approach

1. Familiarize yourself with the problem and database schema.
2. Run tests.
3. Allow inserting data into the database from a CSV file.
4. Allow updating existing data in the database.
5. Allow exporting data to a CSV format.
6. Run all tests to make sure we are not breaking anything.
7. Refactor your code to make it more readable and independent from implementation details.

## Approach to Solving the Task

Follow this approach to tackle the hands-on exercise:

- Download the provided unfinished solution and use it as your starting point.
- Try to implement what is needed to pass the tests one by one. Do not try to implement everything at once. Start with the smaller tests deeper in the project and work up to the top-level tests.
- Spend up to 10 hours attempting to solve the task on your own.
- If you struggle during the first hours and find it too difficult, try seeking help from your peers or JTLs for an additional 10 hours. Spend half of this time working with someone else, whether a study buddy, a peer who has completed the exercise, or a JTL in an open session.
- When you are no longer making any progress on your own, take a look at the suggested solution and walk through it step-by-step. Spend up to 10 more hours on the walkthrough while experimenting and learning from the provided solution.
- Try to go back to your own solution once the suggested solution clears up any obstacles you encountered.
- We recommend checking the final suggested solution, even if you have completed the task on your own, to compare approaches and potentially learn new techniques.
