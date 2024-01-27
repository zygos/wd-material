Part 1: Node.js

# Part introduction

Welcome to the back-end module! This is where you'll learn about the other side of web development: the server side. We'll explore how to build back-end servers using Express.js, how to work with databases, and how to use best practices to ensure security. You'll learn about essential concepts such as authentication and authorization, continuous integration and continuous deployment (CI/CD), containerization, and finally, how to deploy your server. Get ready to dive deep into the world of back-end development!

In this sprint, we'll focus on back-end servers and databases. You'll learn to work with Node.js and how to interact with databases using SQL. We'll explore data modeling, and you'll get hands-on experience working with SQLite. This sprint will culminate in a peer mock interview where you'll get to demonstrate everything you've learned.

In the first part of our back-end development journey, we'll introduce you to the general concept of back-end servers. You'll learn what a server is and what a back-end stack consists of and familiarize yourself with some common back-end terminology. We'll also introduce you to Node.js, a runtime environment that lets you run JavaScript on your server. By the end of this part, you'll have a foundation to build upon in the following parts when we will introduce you to relational databases.

# Key learning topics & resources for this part

## Introduction to Back-end Servers (0.5 hours)

- Resource: [Introduction to back-end servers](https://www.youtube.com/watch?v=XBu54nfzxAQ)

A server can be any application that listens and responds to incoming requests. For example, a web server listens for HTTP requests and responds with HTML, CSS, JavaScript, images, etc. A runtime, such as Node.js, has a built-in server that can be used to create a web server without any additional dependencies.

**Note:** We can have multiple servers running on the same machine, each listening on a different port. For example, we can have an optimized web server application, such as Nginx or Apache, handling our requests. It could resolve requests for static files, such as static HTML, CSS, images, and client-side JavaScript, and forward requests for dynamic content to a Node.js server. This is a typical setup for production applications called a **reverse proxy**. However, in development environments, using a single Node.js server to handle all requests is common.

## Back-end stacks (0.5 hours)

As we start with a project, we can use some JavaScript code running on a Node server to handle our needs. We could use `JSON` files to persist our data. If we need some caching, we could do that in memory by having a plain old JavaScript object. If we need to store user uploads, we could keep them in a folder on the server. It's nothing fancy, but it would get the job done.

As our project grows, we deal with various complex problems surrounding storing and querying data, handling uploads, distributing tasks across machines, etc. Our initial on-the-fly solutions need to be revised, and we need better systems to deal with our technical problems. These problems are not trivial to solve, and instead of trying to reinvent the wheel, we can use existing solutions that have been tried and tested.

A collection of these solutions is called a **stack**. A **back-end stack** is a collection of technologies that work together to create a back-end application.

There are various back-end stacks, each with strengths and weaknesses.

**Watch [this video](https://www.youtube.com/watch?v=Sxxw3qtb3_g)** for a quick overview of key pieces that make up a front-end and back-end stack. By the end of this module, you will have interacted with most pieces of a modern back-end stack.

## Introduction to Node.js (2 hours)

- Resource: [Node.js Tutorial](https://www.youtube.com/watch?v=TlB_eWDSMt4)

You likely already have Node.js installed on your computer, so you can skip the installation section of the video tutorial. For the purpose of this module, we are assuming that you have at least version 18 of Node.js installed. You can verify your Node.js version by typing `node -v` into your terminal.

While you should already have a basic understanding of Node.js from your front-end project experience, this video will serve as a helpful refresher of Node.js fundamentals.

**Note:** You will be exposed to using CommonJS modules in Node.js. This is the default way of importing and exporting modules in Node.js. However, there are ways of using ESM modules in Node.js as well. In this course, we will quickly move on to using the ECMAScript Modules (ESM), as it is slowly becoming the standard way of importing and exporting modules in Node.js.

For the most part, you can think of:
- `module.exports = ...` as `export default ...`
- `module.exports.something = ...` as `export const something = ...`
- `const imported = require('./path')` as `import imported from './path'`

## Understanding Core Node.js Globals and Modules (1 hour)

In the browser, we have various global objects that we can use to perform specific tasks. For example, we can use `window` to access the browser window, `document` to access the DOM, `fetch` to perform HTTP requests, etc.

Node has its own set of global objects that we can use to perform certain tasks. These are called the Core Node.js Modules. **You can find the complete list of Core Node.js Modules [here](https://nodejs.org/api/).** Refrain from memorizing them; **here's a quick overview of the most important ones**. The ones marked with **bold** are the ones you will likely use the most.

Variables:
- `__dirname` and `__filename` - the directory and file name of the current file
- **`process.env`** - an object containing the environment variables of the current process. For example, `{ NODE_ENV: 'development',  API_KEY: 'abc123' }`.
- `process.argv` - an array of arguments passed to the process. For example, if you run `node index.js arg1 arg2`, it will be [`node`, `index.js`, `arg1`, `arg2`].

Global functions:
- **`console.*`** - the console object contains the trusty functions such as `log`, `error` for logging information to the console.
- **`fetch`** - performing HTTP requests, very similar to the browser's `fetch`.
- `require` - used for importing CommonJS modules. However, you will most likely use `import` instead as the industry is moving towards using ESM modules.
- **`setTimeout`, `setInterval`, `setImmediate`** - the usual suspects for scheduling code to run later. Do not forget their `clear` counterparts for canceling what you scheduled (especially, `clearInterval`).

Global classes you will use regularly:
- **`Promise`** - for creating Promises.
- **`URL`** - for parsing and formatting URLs.

Modules you will use regularly:
- **`fs`** - for reading and writing files. Take note of the `fs/promises` version, which is nicer to work with than the default callback-based version.
- **`path`** - for dealing with file paths.

**Note:** Node and web standards evolved separately. This means that Node has its APIs that are unavailable in the browser and vice versa. In recent years, Node has been moving towards adopting new web standards, such as the `fetch` API. But in some cases, Node has modules that serve the same purpose as the browser-native options based on web standards. For example, Node has `crypto` and `Stream`, which have similar roles to `Crypto` and `Stream` available in the browser. In Node, these tend to be referenced as "Node APIs" and "Web APIs". For example, [Node Crypto](https://nodejs.org/api/crypto.html) and [Web Crypto in Node](https://nodejs.org/api/webcrypto.html). The good news is that 99% of the time, you do not need to rely on Node-exclusive APIs; most of the time, it will be clear which one is being used. Most tutorials and documentation will refer to the Node APIs when dealing with Node.

## Exercises: Using core Node.js modules (2 hours)

For these exercises, we recommend creating a new folder, running `npm init -y` in  it, and adding `"type": "module"` in the `package.json` file to use ES modules in Node.js. Then, everything inside that folder (and subfolders) will expect the import/export syntax over the require/module.exports syntax.

**Exercise 1: Reading a file**

Create a file named `readme.txt` and write some text in it. Then, create a Node.js script to read this file and log its content to the console.

<details>
  <summary>Solution</summary>

  ```javascript
  import { readFile } from 'fs/promises'

  const output = await readFile('readme.txt', 'utf-8')

  console.log(output)
  ```
</details>

**Exercise 2: Writing to a file**

Create a Node.js script to write some text to a file named `output.txt`. If the file already exists, its content should be replaced.

<details>
  <summary>Solution</summary>
**Solution 2:**

```javascript
import { writeFile } from 'fs/promises'

await writeFile('output.txt', 'Hello, world!', 'utf-8')
```
</details>

**Exercise 3: Adding a file to a directory**

Create a Node.js script that helps to organize daily reports to folders based on the current date. It creates a local file `reports/{currentYear}/{isoDate}`. For example, if the script is run on `2023-01-01`, it should create a file named `reports/2023/2023-01-01.txt` (`reports` and `2023` are folders). The file's contents should be the first passed argument to the script. If the file already exists, an informative error should be thrown. If the `reports` or `reports/{currentYear}` folder does not exist, it should be created automatically.

Usage example:

```bash
node saveReport.js "It's fine."

# creates reports/2021/2021-01-01.txt with "It's fine." inside.
```

**Bonus challenge:** Allow to overwrite an existing report by passing a `--force` flag as an argument to the script. You can assume that the report's content will never start with a `--` sequence.

**Solution 3:**

<details>
  <summary>Solution</summary>

```js
import { mkdir, writeFile } from 'fs/promises'
import { join } from 'path' // or node:path

const FORCE_FLAG = '--force'

const args = process.argv.slice(2)
const content = args.find(arg => !arg.startsWith('--'))
const doForce = args.includes(FORCE_FLAG)

async function createReport(content, doForce = false) {
  const isoDate = new Date().toISOString().split('T')[0]
  const year = isoDate.slice(0, 4)
  const dir = join('./reports', year)

  await mkdir(dir, { recursive: true })

  try {
    const filePath = join(dir, `${isoDate}.txt`)
    const flags = doForce ? 'w' : 'wx'
    await writeFile(filePath, content, { encoding: 'utf-8', flag: flags })
    console.log(`Report for ${isoDate} has been saved.`)
  } catch (error) {
    if (error.code === 'EEXIST') {
      console.error(`Report for ${isoDate} already exists. Use --force to overwrite.`)
    } else {
      console.error(`An error occurred: ${error.message}`)
    }
  }
}

await createReport(content, doForce)
```
</details>

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

# Directions for further research (2 hours+)

- What could be an issue if we always used sync versions of `fs` functions?
- How do environment variables work in Node.js? How can we access them in a project?
- Node is not the only JavaScript server runtime. There are other runtimes, such as Deno and Bun. What are the differences between Node, Deno, and Bun?

## Optional: Back-end terminology (2 hours)

If Node.js in the back-end is nothing new to you, you can spend some time on familiarizing yourself with some back-end terminology that we will use in upcoming sprints. Allocate a few hours to going through the terms in [this back-end cheatsheet](https://github.com/cheatsnake/backend-cheats) to get a general idea of the terminology used in the back-end world. There is no need to remember listed commands and definitions, but try to get a general idea of what most key terms refer to. For example, there is no need to know the differences between `XML`, `JSON` or `protobuf` RPCs, but you should know that RPC is a way of calling procedures on a remote machine. Some parts, such as Deployment, Optimization can be skipped for now.
