## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

## Serving static assets

How can we deploy our application to a server?

One way is to simply upload the source code to the server and run it there with `npm run dev`. However, this is not ideal because:

- running in development mode is not optimized for production
- development server establishes an additional connection with the browser used to reload the assets when they change. This is unnecessary in production as we are not changing the assets on the fly on the server.

We could address this by building our application into a static site that is optimized for production.

Run:

```sh
npm run build
```

This will create a `dist` folder with the static site that contains the optimized code ready for production.

How can we deliver this to the person who is visiting our website?

Vite has a built-in server that we can use to serve the static site.

Run:

```sh
npm run preview
```

This is a fine way to preview our application locally.

However, in production, we would want to use a more robust server that provides many more features, options for configuration and performance optimizations.

For this, we will use [NGINX](https://www.nginx.com/). It will do a very similar job to the Vite server, but it is geared towards production-ready deployments.

How can we run NGINX?

One way is to install it on our machine and run it there. Unfortunately, this is not ideal because:

- it is quite a hassle to install and configure NGINX
- we would need to install it on every machine that we want to run our application on

Instead, we will use Docker to run NGINX in a container.

## Task: Add a Dockerfile for running the front end in NGINX

We can use [official NGINX Docker image](https://hub.docker.com/_/nginx) to serve our static site.

First of all, we need to remember that we only have our source code in the container. We do not have the `dist` folder with the static site. We could rely on developers to run `npm run build` before pushing their changes and deploying the application. This is not recommended because:

- a developer might forget to run `npm run build`
- it would be a real hassle to resolve merge conflicts in the `dist` folder
- building the application is a time-consuming process and we would want to preserve the developer's time

For these reasons, commiting the `dist` folder to the repository is not a good idea.

What can we do instead?

We could look for, or even build our own Docker image that has NGINX and Node installed. Then, we could run `npm run build` inside the container and serve the static site with NGINX in a similar manner to how we did it with Vite's `npm run preview`.

While this is a good start, it is not ideal because:

- we would need to manage the Docker image with Node and NGINX ourselves, as there are no official images for this
- we do not necessarily need Node in the container that serves the static site with NGINX

What is the solution then?

We can use one container with the official Node image to build the static site. This will produce a `dist` folder with the static site. Then, we can copy over the `dist` folder to another container with the official NGINX image and serve the static site from there.

This is called a [multi-stage build](https://docs.docker.com/develop/develop-images/multistage-build/).

Let's try it out!

Open `Dockerfile` in this folder and fill in the missing parts that are marked with TODO comments.

Once you are done, run `docker compose up` to start the application. It should be available at http://localhost:3001. We have mapped the port 80 of the NGINX container to the port 3001 on our machine in `docker-compose.yml`.

If something goes wrong, you can rebuild the images with `docker compose build` and try again.

You can look into the `_solution` folder for a possible solution.
