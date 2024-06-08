## Start a PostgreSQL database with Docker

Our first example involves spinning up a new PostgreSQL database container with Docker.

Open up the `docker-compose.yml` file in this folder. Read through the comments to understand what each line does.

Now, if we run `docker compose up`, Docker will:

- download the `postgres:16.1-alpine` image from Docker Hub
- spin up a new PostgreSQL container, which by default exposes port `5432`
- map it to port `5435` on our machine, since you might already have a PostgreSQL database running on port `5432`
- create a new user `turing` with password `turing`
- create a new database `bugs`
- persist the database data in a volume - virtual storage managed by Docker

This was quite a bit faster than installing PostgreSQL on our machine and creating a new database manually.

With Docker, we can do spin up new databases that we have not even installed on our machine before.

We could use other versions of PostgreSQL, MySQL, MongoDB, Redis, etc. Installing and running these databases on our machine would take quite a bit of time. With Docker, we can do it in a few seconds.

**Explore the running container from the command line.**

```sh
# list all running containers
docker ps

# connect to the running container
docker exec -it 1-postgres-postgres-1 bash
# -it stands for interactive terminal
# bash will give us a terminal inside the container.
# We could use a different shell, like sh, if we wanted to.

# alternatively, connect with the container id instead of the name
docker exec -it {CONTAINER_ID} bash

# You should be inside the container now.
# Connect to the container's PostgreSQL database with:
psql -U turing -d bugs

# Run \l to see the list of databases.
\l

# You should see the bugs database in the list.
   Name    | Owner  | Encoding | ...
-----------+--------+----------+ ...
 bugs      | turing | UTF8     | ...
 postgres  | turing | UTF8     | ...
 ...

# quit the PostgreSQL client
\q

# exit the container
exit
```

**Explore the container from the Docker Desktop app.**

1. Open your Docker Desktop app, click on "Containers" and you should see the `1-postgres` running through docker-compose.
2. Click on the `1-postgres` name. You will see the container log.
3. Once you see the log, you should see your container `1-postgres-postgres` ({folder name}-{service name}) on the left side.
4. Click on the three dots on the right side of the container name and click on "Open In Termainal".
5. Now, you can run the same commands as above.
6. Alternatively, you can click "Logs", "Inspect", "Files" and "Stats" tabs to explore the container.
7. Open up Volumes on the left side and you should see the `bugs-db` volume. Click on it, you will see the files in the volume that are persisted across container restarts.

**Connect to the database from PostgreSQL client on your machine.**

Since we have exposed the PostgreSQL database on port `5435` on our machine, we can connect to it from our machine. We will use `psql` to connect to the database. Given that you have installed PostgreSQL and you have `psql` command line tool, you can connect to the database with:

```sh
sudo psql -U turing -d bugs -p 5435 -h localhost -W
```

You will be prompted for the password. Enter `turing` and you should be connected to the database.

Make sure to stop the container with `docker compose down` before you continue to the next exercise.
