## Setup

Make sure you have an `.env` file with the database connection string. For SQLite, that is the path to the database file.

```bash
DATABASE_URL=./data/database.db
```

## Migrations

Before running the project, we need to run the migrations.

```bash
npm run migrate:latest
```

If at any point you add new migrations to alter the database tables, run the following command to update the generated TypeScript types:

```bash
npm run gen:types
```

## Running the server

In development mode:

```bash
npm run dev
```

In production mode:

```bash
npm run build
npm run start
```
