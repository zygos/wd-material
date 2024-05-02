Part 1: Node.js

# Part introduction

We have already explored how to run JavaScript inside the browser. It is perfect for running some logic on the client side, but what if we want some logic or private data that should not be exposed to the browser? For example, authentication, accessing data of other users, performing heavy computations, or interacting with some private APIs.

In this sprint, we'll focus on the fundamentals of running JS outside the browser and using it in conjunction with one of the main reasons to have a back-end server at all - a database. You'll learn to work with Node.js and interact with databases using SQL. We'll explore data modeling, and you'll get hands-on experience working with SQLite. This sprint will culminate in a peer mock interview where you'll get to demonstrate everything you've learned.

You'll learn what a server is and what a back-end stack consists of and familiarize yourself with some common back-end terminology. We'll also introduce you to Node.js, a runtime environment that lets you run JavaScript on your server. By the end of this part, you'll have a foundation to build upon in the following parts when we introduce you to relational databases.

# Key learning topics & resources for this part

## Introduction to Back-end Servers (0.5 hours)

- Resource: [What is a Server](https://www.youtube.com/watch?v=VXmvM2QtuMU) (up to 12:00)
- Resource: [Introduction to back-end servers](https://www.youtube.com/watch?v=XBu54nfzxAQ) (15 min)

A server can be any application that listens and responds to incoming requests. For example, a web server listens for HTTP requests and responds with HTML, CSS, JavaScript, images, etc.

If you have used VS Code's Live Server extension, you have already run a server on your machine. This extension runs a script that listens to requests from a specific port and serves static files in the project folder based on the requested URL. But what if we want a server that executes some logic and returns a response based on that logic?

## Introduction to Node.js (2 hours)

- Resource: [Node.js Tutorial](https://www.youtube.com/watch?v=TlB_eWDSMt4)

JavaScript was designed as a language for the browser, and developers had to learn a different language for the back end. At the same time, there were some methods of running JavaScript outside the browser. Still, nothing caught on, as JavaScript was a relatively slow and non-standardized language for executing business logic on the server.

As the years passed, JavaScript engines became faster and more efficient, spurred on by competition between browser vendors such as Google, Mozilla, and Microsoft. Many clever developers worked on making JavaScript faster, making it a viable option for running on the server.

In 2009, developer Ryan Dahl combined Google's V8 JavaScript engine (found in Chromium browsers), an event loop for asynchronous tasks, and a few other utilities for file system access and networking to create Node.js. Node.js allows you to run JavaScript outside the browser directly in your terminal, making it a suitable choice for server-side applications.

**Note on Node versions.** While even more recent Node versions are available, we will primarily use Node 18 in this module in our examples, as some older computers might be unable to run the latest versions. These versions do not have any significant differences, so you can go for Node 20 or later.

**Note on CommonJS and ES Modules.** The provided video will expose you to CommonJS modules in Node.js. This is the old-school way of importing and exporting modules in Node.js. It is still prevalent in the Node.js ecosystem, and you will find it used in several code examples online. It is being slowly phased out in favor of **ES Modules (ESM)** (ES = ECMAScript, the standard modern JavaScript is based on) that use `import` and `export` statements.

For the most part, you can directly map:

- `module.exports = ...` as `export default ...`
- `module.exports.something = ...` as `export const something = ...`
- `const entireModule = require('./path')` as `import entireModule from './path'`
- `const { someFunction } = require('./path')` as `import { someFunction } from './path'`

There are some "gotchas" as the underlying mechanisms differ, but the effect of the above statements is similar enough for most practical reasons. To avoid having to deal with these differences, we will use ES Modules in the vast majority of our examples (import/export statements).

## Understanding Core Node.js Globals and Modules (1 hour)

In the browser, we have various global objects that we can use to perform specific tasks. For example, we can use `window` to access the browser window, `document` to access the DOM, `fetch` to perform HTTP requests, etc.

Node has its own set of global objects that we can use to perform certain tasks. These are called the Core Node.js Modules. **You can find the complete list of Core Node.js Modules [here](https://nodejs.org/api/).** Refrain from memorizing them all; **here's a quick overview of the most important ones**. The ones marked with **bold** are the ones you will likely use the most.

Variables:
- `__dirname` and `__filename` - the directory and file name of the current file. This is only supported in **CommonJS** mode. Since we will be using primarily the newer ES Modules, you should use `import.meta.url` instead to get the filename.
- **`process.env`** - an object containing the environment variables of the current process. For example, `{ NODE_ENV: 'development',  API_KEY: 'abc123' }`.
- `process.argv` - an array of arguments passed to the process. For example, if you run `node index.js arg1 arg2`, it will be [`node`, `index.js`, `arg1`, `arg2`].

Global functions:
- **`console.*`** - the console object contains the trusty functions such as `log`, `error` for logging information to the console.
- **`fetch`** - performing HTTP requests; it is very similar to the browser's `fetch`.
- `require` - used for importing CommonJS modules. However, we will use `import` most of the time, as the industry is moving towards using ES modules.
- **`setTimeout`, `setInterval`, `setImmediate`** - the usual suspects for scheduling code to run later. Do not forget their `clear` counterparts for canceling what you scheduled (especially `clearInterval`).

Global classes you will use regularly:
- **`Promise`** - for creating Promises, used for asynchronous tasks that should be done outside of Node's main thread.
- **`URL`** - for parsing and formatting URLs.

**Imported modules** you will use regularly:
- **`fs`** - for reading and writing files. Take note of the `fs/promises` version, which is nicer to work with than the default callback-based version.
- **`path`** - for dealing with file paths.
- **`http`** - for starting a web server.

**Note.** Node and web standards evolved separately. This means that Node has some global variables and modules unavailable in the browser and vice versa. In recent years, Node has been moving towards adopting new web standards, such as the `fetch` API. However, in some cases, Node has modules that serve the same purpose as the browser-native options based on web standards. For example, Node has `crypto` and `Stream`, which have similar roles to `Crypto` and `Stream` available in the browser. In Node, these tend to be referenced as "Node APIs" and "Web APIs". For example, [Node Crypto](https://nodejs.org/api/crypto.html) and [Web Crypto in Node](https://nodejs.org/api/webcrypto.html). The good news is that 99% of the time, you do not need to rely on Node-exclusive APIs; most of the time, it will be clear which one is being used. Most tutorials and documentation will refer to the Node APIs when dealing with Node.

**Note.** Node allows prefixing built-in modules with `node:` when using ES modules. For example, `import { readFile } from 'node:fs/promises". While not mandatory, we recommend using this prefix when importing a built-in Node module. This helps to distinguish between built-in modules and external modules. Then, we can follow the following rule of thumb:

```js
// built-in Node module (starts with node:)
import { join } from 'node:path'

// your local file (starts with ./ or ../)
import { myFunction } from './someFile.js'

// external package from the internet (no prefix)
import { someHandyFunction } from 'some-package'
```

## Exercises: Using core Node.js modules (2 hours)

**How to create a new Node project**.

1. Create a new folder. For example, `mkdir node-exercises`.
2. Navigate to the folder. For example, `cd node-exercises`.
3. Run `npm init -y' to create a `package.json` file, which will become the project's configuration file. This file will list the project's dependencies and scripts. We will discuss external dependencies in the next section.
4. To use ES modules in Node.js, add the `"type": "module" line to the package.json file. This will allow you to use the `import` and `export` syntax instead of the more dated `require` and `module.exports` statements.
5. Create a new JavaScript file. For example, `touch exercise-1.js`.
6. Write some code in the file, such as `console.log('Hello, world!')`.
7. Run the file with Node.js. For example, `node exercise-1.js`.

**Exercise 1: Reading a file**

Write some text in a file named `readme.txt`. Then, create a Node.js script to read this file and log its content to the console.

<details>
  <summary>Hint</summary>

  You can use the `fs` module to read files. The `fs` module is a built-in Node.js module that provides functions for working with the file system. Preferably, you can use the `fs/promises` version of the module, which provides Promise-based versions of file system functions. This version is a bit easier to work with than the default callback-based version.
</details>

<details>
  <summary>Solution</summary>

```js
// using the 'node:' prefix is not mandatory, but it makes
// it is clear that we are using a built-in Node module
import { readFile } from 'node:fs/promises'

const output = await readFile('readme.txt')

console.log(output)
```
</details>

**Exercise 2: Writing to a file**

Create a Node.js script to write `Hello, world!` to a file named `output.txt`.

<details>
  <summary>Solution</summary>

```js
import { writeFile } from 'node:fs/promises'

await writeFile('output.txt', 'Hello, world!')
```
</details>

**Exercise 3: Adding a file to a directory**

Create a Node.js script that helps organize daily reports in folders based on the current date. It creates a local file `reports/{currentYear}/{isoFormatDate}`. For example, if the script is run on `2023-01-01`, it should create a file named `reports/2023/2023-01-01.txt` (`reports` and `2023` are folders). The file's contents should be the first argument passed on to the script. If the `reports` or `reports/{currentYear}` folder does not exist, it should be created automatically.

Usage example:

```bash
node saveReport.js "It's fine."

# creates reports/2021/2021-01-01.txt file with "It's fine." inside.
```

**Solution 3:**

<details>
  <summary>Solution</summary>

```js
import { mkdir, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

const today = new Date()
const content = process.argv[2]

await createReport(today, content)

async function createReport(date, content) {
  const isoDate = date.toISOString().split('T')[0]
  const year = isoDate.slice(0, 4)
  const dir = join('./reports', year)

  // create the directory if it does not exist
  await mkdir(dir, { recursive: true })

  try {
    const filePath = join(dir, `${isoDate}.txt`)
    await writeFile(filePath, content)
    console.log(`Report for ${isoDate} has been saved.`)
  } catch (error) {
    console.error(`An error occurred: ${error.message}`)
  }
}
```
</details>

## Introduction to JavaScript Packages (2 hours)

**Module** in JavaScript is any file exposing some of its functionality to other files. For example:

```js
// math.js - a file that exports a function to sum numbers
export const sum = numbers => numbers.reduce((a, b) => a + b, 0)
```

Now, other files in the project can import some parts of this module.

```js
import { sum } from './math.js'

sum([1, 2, 3]) // 6
```

There is a special category of modules called **packages**. A package is an external module that is not part of a project's source code but is used in the project.

Some alternative JavaScript runtimes, such as Deno, allow importing these packages by providing their URL. For example:

```js
import { VERSION } from "https://deno.land/std/version.ts"
```

Meanwhile, Node.js has a package repository called **Node Package Manager (npm)**. It has two key parts:

- **Package repository** - a place where developers can publish their packages. You can browse it at [npmjs.com](https://www.npmjs.com/).
- **Command-line tool** - a tool that allows you to install, update, and remove packages from your project. This tool is installed with Node automatically. You can use it by running `npm install some-package-name` in your project's directory.

Once someone finds a common problem, they can write a package that solves it and publish it to NPM as a package. This way, other developers can use this package in their projects. For example, working with dates in JavaScript can be cumbersome, so a package called `date-fns` (among others) provides many helpful functions for working with dates.

Anyone can publish a package on NPM, which is why there are millions of packages available. Some of these packages are published by sole developers, and some by massive companies.

**Note.** You might come across other alternative package managers like `pnpm` or `yarn`, but `npm` is the most popular one as it comes bundled with Node.js.

> Open your terminal and run `npm -v` to check if you have `npm` installed on your machine. This command will display your `npm` version, which should not be confused with your Node.js version.

**Note:** Try to use the VS Code terminal for these commands. An external terminal interface is fine, but we prefer you learn to use the VS Code terminal as it integrates well with the VS Code editor and debugging tools. Also, if you are running Windows and have WSL installed, ensure your terminal is selected to use WSL (Ubuntu) as its default shell. This can be seen in the terminal's top right corner. You might need to change the default shell in your VS Code settings to keep this setting persistent.

To get a good overview of `npm` and JS packages, watch this [npm tutorial](https://www.youtube.com/watch?v=P3aKRdUyr0s). This video is in the context of writing Sass, so the particular tools, such as Gulp and Chalk are not relevant to us right now. However, the video does a great job explaining the basics of `npm` and `package.json`.

Use the video and online resources to investigate the following:

- What is semantic versioning?
- Should you primarily install packages locally or globally?
- What does the `^` in front of the package version mean? What are other supported versioning operators?
- What is the difference between `package.json` and `package-lock.json`?
- How can you specify custom commands in your `package.json` file and then run them in your command line?
- Should you commit your `node_modules` folder to your GitHub repository?
- What is the difference between a regular dependency and a dev dependency? Why would we want to separate them?
- What do the `--global`, `--save`, and `--save-dev` command line flags do when installing a package?
- Is `--save` still needed in newer npm versions?

## Exercise: Install and Use a Package (1 hour)

We will install a package to solve a small problem.

**Problem.** We need to print the current date and time in the format `yyyy.MM.dd HH:mm:ss` (for example, `2024.04.01 12:30:00`).

JavaScript has a `Date` object for dealing with dates, but it is pretty limited if we need to format dates. We could write a function to format the date ourselves, but this is a relatively common problem, so we might consider looking for a package that solves it.

How to look for a package? You can use:

- the npm website to search for packages by keywords
- Google search for "{problem} npm" (for example, "date formatting npm")
- AI chatbots, such as ChatGPT, Gemini, Claude, etc.

Since NPM and Google searches can result in a bit too literal suggestions, you will most often find the most appropriate packages by using AI chatbots.

Let's say we asked ChatGPT "Which npm package would you recommend for formatting dates?". We might get a few suggestions, such as [moment.js](https://www.npmjs.com/package/moment), [date-fns](https://www.npmjs.com/package/date-fns), [luxon](https://www.npmjs.com/package/luxon). We briefly look through each package's documentation. We find that Moment is a legacy package, and Luxon seems powerful but a bit too complex for our needs. We decide to go with `date-fns`. It even has a handy `format` function that does exactly what we need.

**Setup.** Build on the previous setup or create a new folder and run `npm init -y' to create a new project. Make sure to add `"type": "module"` to the `package.json` file!

Now, let's install a package.

Run `npm install date-fns`, which will install the `date-fns` package as a **dependency** in your project. Notice how the `node_modules` folder has been created and now contains the `date-fns` folder. Also, notice how the `package.json` file has been updated to list the installed package as a dependency.

**Pro tip.** You can use `npm i' instead as a shorthand for `npm install`.

Now, we can import the `date-fns` package in our project, provided we run it through Node.js. Node.js will figure out that importing something from `date-fns` means we need to import the code from the `date-fns` folder inside `node_modules`.

Create a new JavaScript file and add the following code:

```js
import { format } from 'date-fns'

const date = new Date()
const dateFormatted = format(date, 'yyyy.MM.dd HH:mm:ss')

console.log('dateFormatted', dateFormatted)
```

It should produce something like:

```
dateFormatted 2024.04.01 12:30:00
```

Try out:

- [formatDistanceToNow](https://date-fns.org/v2.30.0/docs/formatDistanceToNow) from `date-fns` to find out how much time has passed between the current date and the James Webb Space Telescope launch date (2021-12-25 12:20 UTC).
- Install a new package - `lodash`. Use the [uniq](https://lodash.com/docs/#uniq) function from `lodash-es` to get a unique list of elements between two arrays, for example, `[1, 2, 3, 5]` and `[2, 3, 4, 6]`.

Finding the right package for your needs can be daunting, and you will need some time to learn how to do it effectively. We recommend using packages that have many downloads, have been recently updated, have documentation, and have some GitHub stars. There is a fine line between installing too many packages for trivial problems and wasting time by reinventing the wheel. Remember that downloading a package from npm means trusting the package author!

**Pro tip**: You can experiment with your installed packages using the Quokka.js VS Code extension mentioned in the previous sprint. It lets you import and use installed packages in your currently opened VS Code project.

# Directions for further research (2 hours+)

- What are the practical implications of Semantic Versioning for you as a developer?
- Is it possible to modify code in the `node_modules` folder? If so, why? If not, why not?
- What are the differences between `readFile`, `readFileSync` from `fs` module and `readFile `from `fs/promises` module? Which should you generally use?
- How do environment variables work in Node.js? How can we access them in a project?
- Node is not the only JavaScript server runtime. There are other runtimes, such as Deno and Bun. What are the differences between Node, Deno, and Bun?

## Optional: Back-end terminology (2 hours)

If Node.js in the back-end is nothing new to you, you can spend some time familiarizing yourself with some back-end terminology that we will use in upcoming material. Allocate a few hours to going through the terms in [this back-end cheatsheet](https://github.com/cheatsnake/backend-cheats) to get a general idea of the terminology used in the back-end world. There is no need to remember listed commands and definitions, but try to get a general idea of what most key terms refer to. For example, there is no need to know the differences between `XML`, `JSON`, or `protobuf` RPCs, but you should know that RPC is a way of calling procedures on a remote machine. Some parts, such as Deployment, Optimization can be skipped for now.
