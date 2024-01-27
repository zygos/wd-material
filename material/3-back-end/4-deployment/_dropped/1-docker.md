**Note.** It is possible to use Docker Compose for some of these steps, for example installing dependencies, starting a server, etc. At the same time, it is easier to work with GitHub Actions tooling if we use their step-by-step instead of Docker Compose.

--- Building monorepo ---

## Example: Building a monorepo (0.5 hours)

Since the last Docker setup provided a complete example of how to set up a Docker Compose file, now is your time to set up a similar file for your capstone project.

Before you begin, we recommend to make sure that you have the following scripts in your `client` and `server`:

- `type-check`

You can use the provided `package.json` files as examples. The `client` scripts should be already familiar as we have followed a nearly identical script structure in the front-end course module.

However, we have not delved into building our back-end TypeScript source code into JavaScript, because at the end of the day, our API server still runs JavaScript through Node. Using tools such as `tsx` or `ts-node` only makes this TS to JS compiling invisible to us as the generated JavaScript is not saved to a `dist` folder, it is directly fed to Node.

However, we should not rely on performing this on-the-fly in our production server. Ideally, we would like to build our TS code into JS ahead of time. That might even allow to omit some TypeScript-specific dependencies out of our production application.

**Type check script**

First, let's go through the `type-check` part. We need to ensure that we are not building our application if it has TypeScript errors. We can do that by using the TypeScript package (`typescript`) utility `tsc`, which can perform type-checking similarly to our IDE.

Steps to setup `server/package.json` `type-check` script:

1. Install `npm i -D typescript`, if it is not already in your project's `devDependencies`.
2. Add `"type-check": "tsc --noEmit"` to `package.json` scripts. The `--noEmit` means we are not outputting (emitting) any files, we are just using `tsc` for type checking.
3. Run `npm run type-check` (add `-w server` if you are not in the `/server` directory).

This will display any type errors in your server code. For that to work properly, you might need to play around with the `tsconfig.json`. We have added one viable configuration in the `4-monorepo-example` `server/tsconfig.json`. It is optimized for developer convenience.

--- npm run dev vs start ---

Since the exact way on how you could set this up depends on your Wi-Fi router, we will delve into this step in particular and it will be an optional step.

---

While running it with `npm run dev` is fine for development, it is not ideal for production:

- It watches for any file changes to restart our Node application
- It requires our production application to compile TypeScript on-the-fly into JavaScript and to run it through Node. What if there is an error when compiling that somehow sneaked by?

We can address the 1st issue by running `tsx` without the `watch` flag.

Addressing the 2nd issue would require compiling TypeScript files into JavaScript before we deploy our application. We will discuss this step as a bonus challenge later on. Right now, we will keep things simple.
