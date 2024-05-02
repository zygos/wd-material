## Task

You are working on a project for a delivery company. The company needs a simple proof-of-concept API to manage deliveries. This API will be used by the company's drivers to keep track of their deliveries. The API is designed to communicate using JSON over HTTP, so it could have a web interface in the future.

Your task is to finish a simple Node.js server that has 2 endpoints:

- GET /deliveries - Returns a list of all deliveries with the following format:

```json
[
  {
    "id": 1,
    "customer_name": "Albert Einstein",
    "pickup_address_name": "Home",
    "pickup_address_full": "123 Main St",
    "destination_address_name": "Work",
    "destination_address_full": "456 Elm St",
    "weight": 10.5,
    "pickup_at": "2022-01-01 10:00:00",
    "delivered_at": null
  },
  // ... remaining deliveries
]
```

- GET /deliveries/:id/delivered - Sets `delivered_at` to current date and time for the delivery with the given ID. Returns `{ "success": true }` if the delivery was found and updated, or `{ "success": false }` if the delivery was not found.

- If the URL does not match any of the above, the server should return a 404 status code with the following JSON response: `{ "error": "Not found" }`.

The server should use an SQLite database to store the deliveries. The database has 3 tables:

- address
- customer
- delivery

The schema for each table can be found in `src/database/tables.sql` file.

You will need to complete a few additional sub-tasks to complete the project:

- You will need to make sure that your project has the necessary dependencies to run the server. Right now, the project has a single dependency in its source code but it has not been added to the `package.json` file. Can you find it and install it?
- You will need to insert some "seed" data into the database to test the server. You can use the data provided in the `seed.sql` file.

## Start the server

You can start the server with `npm run start`. If you change anything, you will need to kill the server (Ctrl+C, or Cmd+C on Mac) and start it again.

Before you can start the server successfully, you will need to install the missing dependency.
