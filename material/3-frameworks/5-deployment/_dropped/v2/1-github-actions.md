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
