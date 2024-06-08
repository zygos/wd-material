MUST: update project README
# Doggo

## Setup

```sh
npm install
```

Make sure that you have set the right database port!

You can run the project with:

```sh
npm run dev
```

If you see "Server is running at http://localhost:3000", then you are good to go!

## Description

You can create a new user with:

```
POST http://localhost:3000/api/v1/trpc/bug.report
```

While it is not required, you can provide JSON body for specific values:

```json
{
  "name": "Lassie"
}
```

You can get a list of dogs with:

```
GET http://localhost:3000/api/v1/trpc/dog.findAll
```

## Task 1: Dockerize the application

Could we somehow use Docker to package our application and run it on any machine that has Docker installed?

Let's try it out!

Instead of starting it with an in-memory database, you can assume that your container will be provided with environment variables necessary to connect to a PostgreSQL database.

Open a starting template for our `Dockerfile` and fill in the missing parts that are marked with TODO comments.

To test out this container, you would need to build it and run it. However, to run it with a real database, we would need to create it first.

What if instead of creating a database ourselves, we could use Docker to create it for us?

## Task 2: Add it to docker-compose

Now we have a way to build our Node application container.

How can we run it alongside a PostgreSQL database? We can build upon the Docker Compose file that we used in the previous step.

Review the provided `docker-compose.yml` file. It has a few TODO comments that we need to figure out.

How can we connect to the database from our Node application container?

Could we use the same `localhost:5435` as we did when we connected to the database from our machine?

**Try it out.** Add server environment variables to connect to the database on `localhost:5435` through `docker-compose.yml` file.

Then, run `docker compose up` and see what happens.

**Note.** If at any point you want to rebuild your app container, you can run `docker compose up --build`.

Once Docker builds and starts everything up, it might take a few more seconds before you see an error message:

```
ECONNREFUSED 127.0.0.1:5435
```

This seems to indicate that we cannot connect to the database from our Node application container.

Why? We need to think from the perspective of the Node application container. When it refers to `localhost`, it is referring to itself. Our Node application then tries to connect to its own port `5435`, which has nothing running on it. It only sees its own port 3000.

|---------------------------------------|
| Our machine                           |
|                                       |
|       |-------------------------|     |
|       | Postgres container      |     |
|       |-------------------------|     |
|  5435:| 5432                    |     |
|       |-------------------------|     |
|                                       |
|       |-------------------------|     |
|       | Node app container      |     |
|       |-------------------------|     |
|  3000:| 3000                    |     |
|       |-------------------------|     |
|                                       |
|---------------------------------------|

**Note.** There is a Docker network layer between the containers and our machine, but we can ignore it for now.

There are a few ways to solve this problem. We could connect to the Postgres container through our machine's address:

```yml
# Docker exposes a special address that allows us to connect to our machine, so our machine's "localhost", not the container's "localhost".
DB_HOST: host.docker.internal
DB_PORT: 5435 # port that we have mapped to our machine
```

However, this is not the recommended way to do it. A better way is to use Docker's internal network.

Docker creates a network for us and adds all of our containers to that network. We can refer to other containers by their service name.

```yml
DB_HOST: postgres # name of the service
DB_PORT: 5432 # exposed port

# "postgres" comes from the name of the service in the docker-compose.yml file:
services:
  postgres: <-- this name that we can use to refer to the container's address
```

Take note that we are using port `5432` instead of `5435`. This is because we are connecting to the port that the container exposes, not the port that we have mapped to our machine.

**Try it out.** Add `DB_HOST` and `DB_PORT` to the server environment variables in `docker-compose.yml` file.

Then, run `docker compose up` and see what happens.

You should see lots of SQL queries in the terminal that TypeORM uses to investigate the current state of the database. Then, you should see:

```
Server is running at http://localhost:3000
```

Great, we have containerized our Node app together with a database! 🎉

If you get stuck, you can look into the `_solution` folder for a possible solution.
