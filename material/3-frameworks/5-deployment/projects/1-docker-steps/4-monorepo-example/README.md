## 4-monorepo-example

Start the application:

```sh
docker compose up
```

Visit http://localhost:3001 in your browser.

Investigate the following files:

- docker-compose.yaml
- server/Dockerfile
- client/Dockerfile
- client/nginx/default.conf.template
- client/src/stores/dogs/index.ts

You are free to look over the other files, but they are not as important for this example.

## Running without Docker

### Setup & Run in-memory

```sh
npm run demo
```

Visit http://localhost:3001 in your browser.

### In development mode with a persistent database

1. Create a PostgreSQL database.
2. Create a `server/.env` (see `server/.env.example`).
3. Create a `client/.env` (see `client/.env.example`).

```sh
# separate terminals (recommended)
npm run dev -w server
npm run dev -w client
```
