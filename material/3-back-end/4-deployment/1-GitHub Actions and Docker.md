Part 1: GitHub Actions and Docker

# Part introduction

In this part of the course, you'll dive into Continuous Integration/Continuous Deployment (CI/CD) and containerization with Docker. This knowledge is crucial for modern web development, where the ability to release updates quickly and reliably is paramount.

By the end of this section, you will:

- Gain a basic understanding of CI/CD practices and the role of GitHub Actions in automating your development workflows.
- Learn how to set up a CI/CD pipeline using GitHub Actions to automatically lint and test your web applications upon each push to your repository.
- Be able to containerize your application.
- Understand how to use Docker Compose to manage multi-container applications.
- Apply these skills practically by setting up CI/CD pipelines and containerization for your capstone project.

This course equips you with the foundational skills for junior-level web development positions. Therefore, we do not expect you to master advanced DevOps practices or to deploy complex, large-scale systems. Your current goal is to grasp the basics of CI/CD and Docker that you could apply to your capstone project.

Let's embark on this journey to streamline your development process and make your applications more robust and deployable!

# Key learning topics & resources for this part

## CI/CD and GitHub Actions (1.5 hours)

The role of these pipelines is to test and deploy an application to a server.

- Watch: [CS50: CI/CD and GitHub Actions](https://cs50.harvard.edu/web/2020/weeks/7/) (57:15 - 1:17:25) (20 min)
- Watch: [GitHub Actions Tutorial (Overview)](https://www.youtube.com/watch?v=R8_veQiYBjI) (30 min)
- Watch: [GitHub Actions (Node example)](https://www.youtube.com/watch?v=yfBtjLxn_6k) (10 mins)
- Review: [GitHub Actions (Example of running Playwright)](https://github.com/codediodeio/sveltefire/blob/15cc05def33778eef07dd4395088e8c363fbb012/.github/workflows/run-tests.yml) (5 mins)
- Explore: [GitHub Actions](https://github.com/codediodeio/sveltefire/actions/workflows/run-tests.yml) (10 mins)
- Read: [GitHub Actions Cheat Sheet](https://resources.github.com/actions/github-actions-cheat/) (15 mins)

The 1st video is a high-level overview of CI/CD, GitHub Actions, and YAML syntax.

The 2nd video presents a general test, build, push, and deploy CI/CD flow. The video uses a Java application as an example, but the general flow is the same for any application. The order of steps is mostly the same, no matter what language or framework you use. The main difference is the specific commands you would use to run your tests, build your application, and deploy it. So, do not worry about Java-specific commands. Also, the latter part of the video (after 24:35) talks about building and deploying a Docker image, which we will cover later.

The Node example video is a quick rundown of the GitHub Actions role in a project. The latter half talks about some specific steps you would need to use to publish a package on `npm` that other people can install with `npm install my-special-package.` Instead of thinking about how to publish a package, we will work towards deploying our application to a server.

The Node example video references a minimal testing workflow that uses Playwright to run E2E tests. We will use a similar approach in our exercises, though we will do more than just E2E testing. We recommend exploring the GitHub Actions workflow for this project, both in the linked `yaml` file and through the UI.

## Exercise: Using GitHub Actions to test a monorepo (1 hour)

You must set up a CI/CD pipeline to test and deploy your capstone project.

We will focus on testing in this sprint part.

Trying to get everything right yourself would be a challenge beyond a junior web developer position. That is why we are providing a half-done example and a solution for setting up GitHub Actions in a monorepo.

In this GitHub Actions example, our goal is to:

- check our FE and BE with code quality and type safety tools we have - TypeScript type checking and code linting
- test our FE and BE separately, which primarily tests various units of code (functions, modules, services, stores, etc.)
- test our FE and BE together with E2E tests

![E2E test](https://imgur.com/LFSFEZc.png)

[Download the GitHub Actions example](https://drive.google.com/file/d/13KGtXiQcZk_0EcW832t3hspmVv8lIvGQ/view?usp=sharing).

1. To set up and start the project, run `npm run demo` in the project's root. This all-in-one script will install dependencies, add `.env` files, and launch both the FE and BE. It can run against an in-memory database for demo purposes, so there is no need to set up a database.
2. Create a private GitHub repository and push this project to it.
3. **Look through** `.github/workflows/main.yml`
4. Open the GitHub repository, click the "Actions" tab, and check if your application passed the tests. Click on the "test" job and look through the steps. Compare the steps in the GitHub Actions page and the workflow `main.yml` file.
5. Fill in the first "TODO:" comment with a few new steps in `.github/workflows/main.yml`.
6. Push it to GitHub and make sure that the job passes in GitHub Actions. If it fails, investigate the logs of a failed step.
7. Fill in the remaining "TODO:" comments and push your code to your GitHub.
8. Ensure that your test pipeline passes.
9. Check against the provided solution in the `.github/_solution` folder.

## Exercise: Setup GitHub pipeline to test your capstone (1.5 hours)

We will assume that your capstone project follows some `client` and `server` monorepo structure. If it does not have any code for a web client yet, this might be a good time to add some initial boilerplate code.

**Goal:** **Setup GitHub Actions to test your capstone application** that performs the same key tasks as the Actions pipeline in the previous exercise. It should:

- type check your code
- lint your code
- test your back end and front end (if you have any FE code at this moment)
- test your application in an E2E fashion (if you have FE)

This pipeline should run on every `git push` to any branch, as we want to test all committed code.

Make sure that the type checking, linting, and tests pass on your machine first. Depending on your current setup, you might need to add a few missing scripts to `package.json` files and install additional dev dependencies.

You can use the provided examples, online resources, and help from your peers.

## Containerizing an application (1 hour)

Until now, we have worked on our back end with little consideration on how it should reach our users.

![How to reach users](https://imgur.com/aSaGDgx.png)

Right now, our application lives entirely on our machine. We can start it if we run `npm run dev`, but it is no longer available once we close it. We need a pathway for someone else to reach our application.

The most straightforward way to expose our application to the internet is to launch it on port 80 (HTTP port) and then configure your home Wi-Fi router to forward all port 80 requests from the outside world to your computer. Then, as long as your computer is up and running and you are running your application, it will be accessible to the internet via your IP address, which you would know by visiting any of the [IP checking websites](https://whatismyipaddress.com/). Anyone could type your IP address into the browser's address bar and interact with your site.

Unfortunately, running a server from our machine has some major limitations. Here are just a few of them:

- our application goes down if we shut down our machine
- other developers could not push new features

Most of the time, you would want to host your app on another machine dedicated to running servers.

A straightforward approach to do that would require:

- renting out a tiny fraction of a machine from a hosting service, such as [DigitalOcean](https://www.digitalocean.com/)
- connecting to that machine via a provided IP address and password
- installing Node, Postgres, and possibly adding some configuration to expose port 80 for the internet
- uploading our code there (or pull it via GitHub)
- starting our server on the machine's terminal (`npm run dev,` or more appropriately, `npm run start`).

Then, the server would be up and running on the machine's IP address.

However, this does not bode well if we need to add more servers. That means more setting up and more time managing these machines by hand. What happens if one of them goes down? What if you need to install some security updates? What if you need to update the OS of a machine? Would it still work?

These are challenging problems; companies often hire administrators to manage this infrastructure.

If we want to make it easy for ourselves, we would move everything to a script that would allow us to set up our machine in a reproducible manner:

```sh
# set up our machine
sudo apt update
sudo apt install nodejs
# ... many, many more commands ...

# run our application
npm run start
```

This is a much better approach, but it still has a few issues:

- it requires quite a bit of work of configuring our remote machine;
- it is quite tricky to test and maintain over time.

Every environment has subtle issues, so you cannot guarantee that something that runs on your Ubuntu, macOS, or Windows machine will work on a remote server.

Most simple applications would work fine most of the time, but once in a while, you would end up with a "works on my machine" type of issue, where something works on your machine but not on a deployed machine. These issues can be an absolute nightmare to resolve.

How can we **ensure that our application runs consistently across different environments**?

Can we create a set of instructions for our server that not only starts a Node.js app but also sets up the entire system in a reproducible way? Can we test this setup on our local machines?

Today, the most prevalent solution to these challenges is containerization, with Docker being the leading platform for managing containers. Docker comprises three main components:

- **Dockerfile**: A compact, readable file (typically 1 - 3 KB) containing step-by-step commands to construct our environment.
- **Image**: A layered snapshot (ranging from ~1 - 1000 MB) created by running the `docker build` command with our `Dockerfile`. It encapsulates the state achieved by executing the commands up until the command that is used to run our application.
- **Container**: An instance of our environment created by executing the `docker run` command with our image.

![Docker cake analogy](https://imgur.com/3TlCkOj.png)

Consider the `Dockerfile` as a detailed set of instructions, akin to a lengthy list of shell commands. It's our "recipe" for preparing a ready-to-use environment. When this recipe is given to Docker, it compiles all the provided elements into a layered snapshot file, reflecting the system's state as if we had executed all the steps. For instance, if our `Dockerfile` includes instructions to install Node, the resulting image will contain Node. This image is then stored in a location accessible to our server, typically a **container registry**—a file storage service that supports Docker commands. The official Docker container registry is [Docker Hub](https://hub.docker.com/). On our server, we would retrieve this image and run it, creating as many instances as needed.

**Note on image layers:** Docker images are structured in layers like a cake. We can leverage pre-existing images that already contain our dependencies. Instead of building an environment from scratch, we can use [official Node images](https://hub.docker.com/_/node/) as a starting point, which are based on an OS image with Node pre-installed. There's a vast array of Docker images stacked atop one another. For instance, there's an image for [Python + Node](https://github.com/nikolaik/docker-python-nodejs/blob/main/Dockerfile), which is built upon the [Python image](https://github.com/docker-library/python/blob/402b993af9ca7a5ee22d8ecccaa6197bfb957bc5/3.12/bookworm/Dockerfile), itself based on an image containing various [build tools](https://hub.docker.com/_/buildpack-deps/), which in turn is built upon [Debian Linux](https://github.com/docker-library/buildpack-deps/blob/3e18c3af1f5dce6a48abf036857f9097b6bd79cc/debian/bookworm/curl/Dockerfile).

**Note on image naming:** Browsing through the list of available [Node Docker images](https://hub.docker.com/_/node), you might find the selection daunting. The various tags and options specify different configurations and versions, allowing you to choose the most suitable base for your project.

![Docker tags](https://imgur.com/TMRA2el.png)

Most Docker images are built atop various versions of Debian Linux. Commonly, you'll encounter codenames for these Debian releases: Debian 12 ("Bookworm"), Debian 11 ("Bullseye"), and Debian 10 ("Buster"). Alternatively, you might find images based on Alpine (a very lightweight Linux distribution) or Ubuntu (which itself is based on Debian). Occasionally, you may come across `slim` versions of images. These are optimized to exclude some less frequently used dependencies, thereby reducing the image's size. For example, `21.2.0-bullseye-slim` refers to Node version 21.2.0 built on Debian 11 with certain packages omitted. If you're interested, you can [read more about Node image variants](https://github.com/nodejs/docker-node#image-variants).

- Watch: [CS50: Introduction to Docker](https://cs50.harvard.edu/web/2020/weeks/7/) (from 1:17:25 to the end of the video)

## [Docker Tutorial for Beginners](https://www.youtube.com/watch?v=pTFZFxd4hOI) (3 hours)

Follow this tutorial to ensure you can install Docker, set it up on your machine, and successfully run a basic "Hello World" application in Node using Docker.

We generally recommend using Docker within the same environment where your editor and source code reside. If you're working with the Windows Subsystem for Linux (WSL), you should opt for the WSL 2-based engine. However, Docker Desktop's Windows UI is also an option.

**Note:** You may encounter Docker Hub's rate limits (100 pulls per 6 hours). If this happens, create a [Docker Hub](https://hub.docker.com/) account and authenticate using `docker login` with your credentials.

## Exercise: Play with Docker Classroom (2 hours)

In your terminal, run:

```sh
docker run -dp 80:80 docker/getting-started
```

Then, open your browser and navigate to [http://localhost](http://localhost/). Best of luck!

## [Exercise: Containerize an Express App](https://www.youtube.com/watch?v=gAkwW2tuIqE) (1 hour)

Now that we've covered the basics, you'll work with a more relevant example: containerizing an Express.js application.

The final step involving Docker Compose is not necessary for this exercise. However, you can explore it later as an optional activity when working with a monorepo setup at the end of this section.

## Exercise: Using Docker Compose (2 hours)

Docker Compose is a tool for quickly defining and running multiple Docker containers.

Instead of running multiple Docker containers individually:

```sh
# Imagine we have already built a few containers
docker run --env-file ./server/.env -p 3000:3000 -d server
docker run --env-file ./client/.env -p 3001:3001 -d client
docker run --env-file ./database/.env -p 5432:5432 -d postgres
```

We could use a script to execute these commands for us. However, this method becomes cumbersome as we introduce more environment variables, attach volumes, facilitate inter-container communication, and expose additional ports.

A more structured approach is to define these tasks using Docker Compose.

Previously, we worked with `Dockerfile` to build individual Docker images. When dealing with multiple containers, we use a `docker-compose.yml` file.

**Note on Docker Compose V2:** As of July 2023, Compose V1 has ceased to receive updates and is no longer included in new releases of Docker Desktop. We will be using Docker Compose V2 in our exercises. Be aware that many online tutorials still reference Compose V1. Often, there is little functional difference between the two versions, and knowledge is generally transferable. To determine which version is in use:
- Compose V1 typically uses `docker-compose` (note the hyphen)
- Compose V2 uses `docker compose` (note the space)

We will explore several examples of containerizing applications with Docker and orchestrating containers using Docker Compose.

Download the [Docker Compose examples](https://drive.google.com/file/d/17EnnZNUnOm0sNuLoXU52tcAbp69o_Bsp/view?usp=sharing).

Each example and exercise includes a `README.md` file. **Proceed through the exercises and examples one-by-one**.

The final section will provide a comprehensive example that may resemble your capstone project, especially if you utilize project templates and examples from previous modules.

1. **Single container** (`1-postgres`).

![Postgres Container Diagram](https://imgur.com/302I02b.png)

2. **Multiple containers:** Node + Postgres (`2-node`).

![Node and Postgres Containers Diagram](https://imgur.com/fV0qQbL.png)

3. **Multi-stage client** `Dockerfile` with a Node container for building static assets and an Nginx container (pronounced "engine X") for serving them (`3-client`).

![Multi-stage Client Diagram](https://imgur.com/Opol0qg.png)

4. **Monorepo**, which combines the previous examples. **This setup is significantly more complex than you might devise independently**. Therefore, this step primarily serves as an example of adapting for your monorepo projects.

![Monorepo Diagram](https://imgur.com/9hzrgi6.png)

**Note:** You may not use containers for every application component in production environments. For instance, you might use a dedicated virtual machine for data management rather than containerizing a database. Production databases typically exist outside the containerized ecosystem.

## Exercise: Containerize Your Capstone Project (1.5 hours)

Ensure you can launch your capstone project's back end, and if you have a front end, confirm that you can build and start it as well.

We suggest using the `Dockerfile`, `.dockerignore`, and `docker-compose.yml` files from the previous exercises as your templates.

If your application requires additional environment variables, you can specify an `env_file` in your `docker-compose.yml` to reference an existing `.env` file, such as `./server/.env`. Project setup will require the necessary `.env` configuration.

## Directions for Further Research (1 hour+)

- Our focus has been on using `Dockerfile` to prepare our application for production deployment. However, Docker is also beneficial in development environments. Explore how you might use containers during development. What are Development Containers, and how do they integrate with VS Code?

## Optional Exercise: Building and Bundling Back-End Code (2 hours)

We now start our application using `tsx`, which is acceptable for your capstone project. However, building TypeScript on your production server is not recommended as it necessitates including development dependencies such as `tsx` and TypeScript in your production container. Additionally, compiling on the fly consumes extra memory and causes delays in server startup.

To address these issues, we should compile our TypeScript into JavaScript beforehand, similar to what we've done with our front-end code.

We need to tackle two main issues:
  - Decide whether to use ES Modules or CommonJS for our build and ensure our code strictly adheres to one of these standards. `tsx` smooths over some compatibility issues, such as `__dirname` versus `import.meta.url`. To run our code without `tsx`, we'll need to manually resolve these module discrepancies.
  - Ensure import aliases, like `@server/...`, correctly point to their intended paths.

Right now, both module systems can have slight issues when we try to build our code. We'll explore both options and provide a few tips for each.

For learners looking for a quick way to build their projects, we recommend using CommonJS. Meanwhile, we recommend using ESM if you want to learn how to build more modern ES Modules.

**CommonJS builds**

If you use CommonJS, everything should work out of the box for most projects. However, for tRPC projects that use `superjson`, you may encounter an error similar to the following:

```
Errror [ERR_REQUIRE_ESM]: require() of ES Module
```

This error occurs because `superjson` has dropped CommonJS support starting with version 2. To resolve this issue, we can:

A. Transpile this package to CommonJS ourselves
B. Migrate to ES Modules

Here we will cover the first option.

The easiest way to address this is to use a package to manage our back-end builds. In the last few back-end mono repo starter templates, we have included a `tsup` package for this purpose. It is a simple, zero-config TypeScript bundler that transpiles our code to CommonJS. It is helpful for issues like this, where we need to transpile a package to CommonJS.

Given that you already have `tsup`, you would need to add a configuration block for it in your `package.json` file, with a `noExternal` option to include `superjson` in the build process.

```json
"tsup": {
  /* ... */
  "noExternal": ["superjson"]
}
```

If you have your npm `build` set up as `"build": "tsup src/index.ts"`, then you should be able to run `npm run build` to generate a `dist` folder with your CommonJS build. You can run this code with `node ./dist/index.js` - without tsx and TypeScript! This will result in a leaner application memory footprint.

**ES Module builds**

Assuming your project is set up with ES Modules and includes `"type": "module"` in your `package.json`, you're good to go. If not, you can add this configuration. In our case, it is a bit simpler to use ES Modules if you are using `superjson` for serialization. Otherwise, you could use CommonJS. We will assume you are using ES Modules for this example.

Let's proceed with building our source code:

- Install the TypeScript compiler: `npm install --save-dev typescript`
- Build the back end: `npx tsc --rootDir src`

  - `npx` ensures we use the locally installed `tsc` command rather than a global one. When using `package.json` scripts, `npx` can be omitted for installed dependencies.
  - `tsc` is the TypeScript compiler provided by the `typescript` package.
  - The `--rootDir src` option confines the build process to the `src` folder.

We can attempt to launch our Express app with `node ./dist/index.js`. Unfortunately, this results in an error:

```
Error [ERR_MODULE_NOT_FOUND]: Cannot find module '.../server/dist/app'
```

If a module is not found, it either doesn't exist or the resolution method is incorrect.

Upon inspecting the path, it appears correct, pointing to the `app.js` file. The problem arises because Node, when using ES Modules (with `import` statements), expects exact filenames. Therefore, it looks for `dist/app.js` instead of `dist/app`, which can be frustrating.

Why didn't we encounter this issue on the front end? In the front-end build, we use a bundler (Rollup via Vite) that preprocesses our code and resolves these dependencies for us.

There are three solutions to this problem on the back end:

A. Specify the exact file with the `.js` extension in all our imports. This means that even in TypeScript files, we would use `.js` in our import statements. We also cannot use `./entities` to refer to `./entities/index.js`.
B. Bundle the back-end code into a single file.
C. Force Node to adopt CommonJS-like module resolution, where it would attempt to locate `.js` files or `index.js` files when a directory is referenced.

**Method A** is straightforward but would require changing many lines in our codebase, making our back-end code look unnecessarily different from our front-end code.

**Method B** involves using a **bundler**. While optional for the back end, this approach is detailed separately in the `server/OPTIONAL_BUNDLER.md` file within the monorepo example, which you can consult for an alternative build method that produces a single JS file.

We'll focus on **Method C**, which involves instructing Node on how to locate modules based on their paths. Node offers a [loader](https://github.com/nodejs/loaders-test/tree/main/commonjs-extension-resolution-loader) for this purpose, which we've included as `server/loader.js`. By passing this as the `--import` argument to Node (or `--loader` for Node versions prior to 18.19), Node will use it to determine the correct file paths for modules.

**Execute** `node --import ./loader.js ./dist/index.js`

This triggers a different error:

```
Error: Cannot find module '@server/utils/validation'
```

Node is unaware of how to resolve the `@server` alias. This is a limitation of `tsc`, which we can overcome with the `tsc-alias` utility. It processes our `./dist` files and substitutes all import alias paths with their relative counterparts. For instance, `@server/entities` might be replaced with `../../entities`.

1. Install `tsc-alias`: `npm install --save-dev tsc-alias`.
2. Build and replace import alias paths: `npx tsc --rootDir src && npx tsc-alias`.
3. Launch the Express server from the `./dist` directory: `node --import ./loader.js ./dist/index.js`.

Your Express server should now be operational. These two commands have been incorporated into `package.json` as `npm run build` and `npm run start`.

