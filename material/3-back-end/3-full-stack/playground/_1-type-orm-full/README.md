## Setup

1. `npm install`
2. Create a PostgreSQL database.
3. Add PostgreSQL credentials to `.env` file based on `.env.example`.
4. Run `npm run dev`.

When running `npm run dev` the server will automatically sync the database with the entities. We will focus on this flow. If you would run it with `npm run start` and set `NODE_ENV` to `production`, you would need to run the migrations manually.

You task here is to finish writing entities and endpoints so that tests pass. To run tests, run `npm test`.

## Migrations

While you do not need to deal with migrations in this project, you might want to know how to use them.

```bash
# generate a migration file based on the entities
npm run migration:generate my_migration_name

# create a new file for hand-written migrations
npm run migration:create my_migration_name

# run the migrations
npm run migration:run

# revert the last migration
npm run migration:revert

# show the migration status
npm run migration:show
```

## Running the server

In development mode:

```bash
npm run dev
```

In production mode:

```bash
npm run start
```
