## 1-github-actions

This is an example of how you could structure a monorepo with a front end (client) and a back end side (server).

## Setup & Run in-memory

Run:

`npm run demo`

Alternatively, with a persistent database:

1. `npm install`
2. Create a PostgreSQL database.
3. Create a `server/.env` (see `server/.env.example`).
4. Create a `client/.env` (see `client/.env.example`).

## Tests

```bash
# using -w packageName is not required
# if you are already in the package directory

# front end unit and E2E tests
npm test -w client

# front end unit tests
npm run test:unit -w client

# front end E2E tests
npm run test:e2e -w client

# back end tests with an in-memory database
npm test -w server

# back end tests with a development database
npm run test:db -w server
```
