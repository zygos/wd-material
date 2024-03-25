## Task

Your task is to finish the implementation of this program to import data from a spreadsheet into a SQLite database and export data from a SQLite database into a spreadsheet.

By the end, all tests should pass.

**Hint:** Start by investigating `data/example.csv` and `src/database/createTables/create-tables.sql`. Then, run tests and try to fix them one-by-one. The `tests/importExport.test.ts` file should be left for the end as it tests importing and exporting together with a database and a spreadsheet.

## Installation

```bash
npm install
```

## Running tests

Run all tests:

```bash
npm test
```

Running specific tests:

```bash
npm test formRows
```

## Usage example

Importing data from a spreadsheet:

```bash
npx tsx ./src/importSpreadsheet ./data/database.sqlite3 ./data/example.csv
```

Exporting data to a spreadsheet (assumes ./data/database.sqlite3 exists):

```bash
npx tsx ./src/exportSpreadsheet ./data/database.sqlite3 ./data/exported.csv
```
