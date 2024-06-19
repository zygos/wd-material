## Setup

1. `npm install`
2. Create a PostgreSQL database, or use an existing one from the previous exercises.
3. Setup `.env` file based on `.env.example` files.

## Running the project in development

```bash
# automatically restarts the server
npm run dev
```

## Tests

```bash
# back end tests
npm test
```

## Migrations

```bash
# prepare a migration
npm run migrate:new myMigrationName

# migrate up to the latest migration
npm run migrate:latest
```

## Running the server in production

Server:

```bash
npm run build
npm run start

# or migrate + start
npm run prod
```
