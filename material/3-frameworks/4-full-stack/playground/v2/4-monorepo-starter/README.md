## Setup

1. `npm install`
2. Create a PostgreSQL database, or use an existing one from the previous exercises.
3. Setup `.env` files in `client` and `server` based on `.env.example` files.

## Running the project in development

```bash
# automatically restarts the server
npm run dev -w server

# client can be started separately
npm run dev -w client
```

## Tests

```bash
# front end unit and E2E tests
npm test -w client

# only front end unit tests
npm run test:unit -w client

# only front end E2E tests
npm run test:e2e -w client

# back end tests
npm test -w server
```

## Migrations

```bash
# prepare a migration
npm run migrate:new myMigrationName -w server

# migrate up to the latest migration
npm run migrate:latest -w server
```

## Running the project in production

Client:

```bash
npm run build -w client
npm run preview -w client
```

Server:

```bash
npm run build -w server
npm run start -w server

# or migrate + start
npm run prod -w server
```
