## 4-monorepo-example

# Start the project with Docker

Start the application:

```sh
docker compose up
```

Visit http://localhost:3001 in your browser.

If you change something, you can rebuild the images with:

```sh
docker compose up --build
```

Investigate the following files:

- docker-compose.yaml
- server/Dockerfile
- client/Dockerfile
- client/nginx/default.conf.template

## Running without Docker

1. Create a PostgreSQL database.
2. Create a `server/.env` (see `server/.env.example`).
3. Create a `client/.env` (see `client/.env.example`).

```sh
# install dependencies
npm i

# run database migrations
npm run migrate:latest -w server
```

### Development mode

```sh
# start servers separate terminals (recommended)
npm run dev -w server
npm run dev -w client
```

### Production-like mode

```sh
# client
npm run build -w client
npm run preview -w client

# server
npm run build -w server
npm run start -w server
```

Visit http://localhost:3001 in your browser.
