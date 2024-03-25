## Setup

1. `npm install`
2. Create a PostgreSQL database, or use an existing one from the previous exercises.
3. Setup `.env` files in `client` and `server` based on `.env.example` files.

## Tests

```bash
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

## Running the server

In development mode:

```bash
# automatically restarts the server
npm run dev

# server can be started without a database
npm run dev:mem
```
