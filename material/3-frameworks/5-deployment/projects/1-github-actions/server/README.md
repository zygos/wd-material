## Setup

1. `npm install`
2. Create a PostgreSQL database.
3. Add credentials to `.env` file based on `.env.example`.

For this project to work, you will need to finish writing entities and endpoints.

## Running the server

In development mode:

```bash
# automatically migrates schema and restarts the server
npm run dev
```

In production mode:

```bash
# build
npm run build

# run the build
npm run start
```
