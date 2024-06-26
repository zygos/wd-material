## Back-end stacks (0.5 hours)

Let's say we are building Spotify. We can not send a list of all songs to every user, we would need to provide the necessary data about artists and songs on request. We would have some dedicate computer acting as a web server and responding to requests to get songs, artists, and user data.

As we start with a project, we can use some JavaScript code running on a Node server to handle our needs. We could use `JSON` files which are like to save data for our applications:

```json
{
  "users": [
    { "id": 1, "name": "Alice" },
    { "id": 2, "name": "Bob" }
  ],
  "songs": [
    { "id": 1, "title": "Never Gonna Give You Up", "artist": "Rick Astley" },
    { "id": 2, "title": "Africa", "artist": "Toto" }
  ],
  "artists": [
    { "id": 1, "name": "Rick Astley" },
    { "id": 2, "name": "Toto" }
  ]
}
```

If we need to store songs, we could keep them in a folder on same machine. It's nothing fancy, but it would get the job done.

As our project grows, we deal with various complex problems surrounding storing and querying data, handling uploads, distributing tasks across machines, etc. Our initial on-the-fly solutions need to be revised, and we need better systems to deal with our technical problems. These problems are not trivial to solve, and instead of trying to reinvent the wheel, we can use existing solutions that have been tried and tested.

A collection of these solutions is called a **stack**. A **back-end stack** is a collection of technologies that work together to create a back-end application.

There are various back-end stacks, each with strengths and weaknesses.

**Watch [this video](https://www.youtube.com/watch?v=Sxxw3qtb3_g)** for a quick overview of key pieces that make up a front-end and back-end stack. By the end of this module, you will have interacted with most pieces of a modern back-end stack.

---

## Node.js with TypeScript (1 hour)

Node runs JavaScript, but in a professional environment, you will likely want to use TypeScript instead.

We recommend using TypeScript for most of your Node.js projects. You can still use JavaScript for various exercises and smaller projects, but for larger projects, TypeScript will help you catch bugs early on and make your code more readable. Even if you do not add types to your code, you will still benefit from the additional checks TypeScript provides.

There are several ways of setting up TypeScript for a back-end server.

- Manual: Install `typescript` as a dev dependency, and use the provided TypeScript compiler `tsc` directly. Create an entry file, such as `index.ts`, and run `npx tsc index.ts` to compile it to `index.js`. Then, to run the compiled file, run `node index.js`.
- Automated: There are tools for automatic compilation and reloading, such as `ts-node` or `tsx`.
- Going outside of Node: Using a different runtime, such as Deno or Bun, which allows dealing with TypeScript as if it was JavaScript.

Right now, we recommend going with [tsx](https://www.npmjs.com/package/tsx) as it includes everything you need to develop with TypeScript and is faster than most other options. It uses `esbuild` under the hood, transforming TypeScript to JavaScript faster than the good old `tsc`. We have already dealt with `esbuild` behind the scenes, as it also powers Vite!

**Note:** Why are we not using Vite for back-end development? Vite serves a different purpose as it is geared for front-end development using a browser with ES Module support. In the back-end development, we have a different set of requirements.

To use `tsx` in a new project, run:

```bash
# if you have not yet initialized your project with a package.json file
npm init -y

# install tsx to run TypeScript
# @types/node to get type definitions for our Node modules, such as fs, path, ...
# @tsconfig/node18 to get a starting tsconfig.json template for Node 18
npm i -D tsx @types/node @tsconfig/node18
# same as "npm install --save-dev ..."
```

Create a `tsconfig.json` file in the project folder:

```json
{
  "extends": "@tsconfig/node18/tsconfig.json"
}
```

Now you should be able to run TypeScript files in the following ways:

```bash
# to run a JS file
node file.js

# to run a TS file
npx tsx file.ts

# to run a TS file in watch mode
npx tsx watch file.ts
```

**A note on top-level await**

It is important to note that in this case, we are running Node not as ES Module (so do NOT include `"type": "module"` in the `package.json`). Node has incompatibility issues between ES modules and CommonJS modules. The main issue is that CommonJS modules are loaded synchronously, while ES modules are loaded asynchronously. Since most Node ecosystem is still based around CommonJS modules, we will run Node in CommonJS mode. Nevertheless, we will use ES module syntax in our code and let tools such as `tsx` to deal with the module incompatibility issues. But we will need to make one sacrifice to make CommonJS and ES Modules modules work together: we will not use the top-level `await` keyword. Example of top-level await:

```js
import ... from ...

// top-level await - await used outside of an async function. We will not use this.
const result = await getSomeResult()
console.log(result)
```

Instead, if you need to run asynchronous code at the top level (which is rarely needed) - you will need to wrap it in an async function and call it:

```js
// Recommended method. Easily done through an async function
async function main() {
  const result = await getSomeResult()
  console.log(result)
}

main()

// Alternative method through the underlying Promise API.
// Usable for one-off cases, but can get messy if we need to do multiple procedures
// in parallel depending on other results.
getSomeResult()
  .then(console.log) // same as .then(result => console.log(result))

// Through an IIFE (Immediately Invoked Function Expression).
// Notice that the semicolon is necessary here if you are using a semicolon-free style.
;(async () => {
  const result = await getSomeResult()
  console.log(result)
})()
```

Task: **Try creating a TypeScript file and running it through `tsx` in your terminal.**

In a regular project setup, you might use `src` folder and `src/index.ts` as the entry file. Then, you could add the following scripts to `package.json`:

```json
{
  "scripts": {
    "start": "npx tsx src",
    "dev": "npx tsx watch src"
  }
}
```

Now, given you have `src/index.ts`, you could run `npm run start` to run that file. For development you would use `npm run dev`, just as you did in your front-end projects.

**Note:** We are using `npx` to run the locally installed `tsx` and `tsc` (provided by `typescript` package) binaries. If you have `tsx` and `tsc` installed globally, you can run them directly, though it is recommended to use the local version through `npx` to avoid unexpected behaviour due to version conflicts between your local and global versions.

There are a few more methods of running TypeScript in Node.js that do not provide the same level of convenience as `tsx`. However, they are worth knowing as you might encounter them in the wild.

- [Node + TypeScript with tsc](https://www.youtube.com/watch?v=H91aqUHn8sE)
- [Node + TypeScript with tsc + ts-node + ts-node-dev + nodemon](https://www.youtube.com/watch?v=1UcLoOD1lRM)

## Exercise: Setting up Linting and Formatting (1 hour)

Setting up linting and formatting, in some sense, is even easier on the back end than in the front end as we do not need to deal with additional file formats that are common in the front end (`.vue`, `.jsx`, `.svelte`, ...).

You are expected to use linting and formatting in your practical projects and, preferably, hands-on projects.

**Setting up Prettier**

Given that you have the Prettier VS Code plugin installed setting up Prettier is very easy:

1. Add a `.prettierrc` file in the root of your project with your preferred configuration. To get a default config, you can also run "Prettier: Create Configuration File" from the VS Code command palette.
2. Add a `.vscode/settings.json` file with the following content (if you are not using these rules globally already):

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true
}
```

That should be sufficient to get you started. Adding a `format` script and installing Prettier as a dev dependency so it can be used from the command line from any machine is also a good idea, but not necessary to get us moving.

**Setting up ESLint**

Setting up ESLint is more involved than setting up Prettier. Here are the steps:

1. Install ESLint and configs as a dev dependency, for example:

```bash
npm i -D eslint-config-airbnb eslint-config-airbnb-typescript eslint-config-prettier @typescript-eslint/eslint-plugin@^6.0.0 @typescript-eslint/parser@^6.0.0
```

2. Create your ESLint configuration file `.eslintrc.cjs`:

```js
/* eslint-env node */

module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'airbnb', // or any other config you want to extend
    'airbnb-typescript/base',
    'prettier',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    project: './tsconfig.eslint.json',
    tsconfigRootDir: __dirname,
  },
  rules: {
    // we can override some problematic import rules here
    // that can cause issues when using import aliases.
    'import/extensions': 'off',
    'import/no-extraneous-dependencies': 'off',

    // functions are always hoisted, so we can use them before they are defined
    // which in various cases improves readability
    'no-use-before-define': ['error', { functions: false }],
    '@typescript-eslint/no-use-before-define': ['error', { functions: false }],
  },
}

```

Note that this file is run as a CommonJS module, so we need to use `module.exports` instead of `export default`. Why is it run as a CommonJS module? Because this file is being directly read by the `eslint` plugin in our editor or by the `eslint` CLI tool. Since ESLint is written using CommonJS, it is run as a CommonJS module.

3. (Recommended) If you want to autofix issues on file save, update the `.vscode/settings.json` file with the following settings:

```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll": true,
    "source.fixAll.eslint": true
  }
}
```

4. (Recommended) ESLint might complain about `eslintrc.cjs` file not being included in your TypeScript project. To fix this, we can use a technique specified by [AirBnB TypeScript config](https://www.npmjs.com/package/eslint-config-airbnb-typescript). Add a `tsconfig.eslint.json` file with the following content:

```json
{
  "extends": "./tsconfig.json",
  "include": ["src/**/*.ts", "src/**/*.js", "./.eslintrc.cjs"]
}
```

5. (Recommended) Add a lint script to `package.json`:

```json
{
  "scripts": {
    // ...
    "lint": "npx eslint ./src --ext .js,.jsx,.ts,.tsx",
  }
}
```

You might need to restart VS Code for the changes to take effect.
