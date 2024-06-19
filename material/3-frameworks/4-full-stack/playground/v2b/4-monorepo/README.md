## Setup

1. `npm install`
2. Create a PostgreSQL database (or use an existing one).
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
```

## Running the project in development

```bash
# automatically restarts the server
npm run dev -w server

# client can be started separately
npm run dev -w client
```

## Running the project in production

Client (when not using a dedicated server application):

```bash
npm run build -w client
npm run preview -w client
```

Server:

```bash
npm run build -w server
npm run start -w server
```
