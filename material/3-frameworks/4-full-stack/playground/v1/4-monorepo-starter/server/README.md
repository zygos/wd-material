## Setup

1. `npm install`
2. Create a PostgreSQL database.
3. Add credentials to `.env` file based on `.env.example`.

For this project to work, you will need to finish writing entities and endpoints.

## Migrations

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
# automatically migrates schema and restarts the server
npm run dev
```

In production mode:

```bash
# prepare a migration
npm run migration:generate my_migration_name

# run a migration
npm run migration:run

# build
npm run build

# run the build
npm run start
```
