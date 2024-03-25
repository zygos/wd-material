Part 1: Packages and Build Tools

# Sprint Description

Congratulations on successfully completing your first few interactive web pages! By this point, you should have a basic understanding of HTML, CSS, and JavaScript - the meat and potatoes of web development. However, the previous sprint may have left you with several unanswered questions, such as:

- How should I organize my files?
- How should I structure my code within those files?
- Do professional developers write their code the same way, using raw HTML, CSS, and JS files?
- Should I use functions, classes, or something else?
- I've come across some libraries that don't provide a URL which I can use to include them in a script tag. How can I use them?
- I've heard about frameworks like React, Vue, and Angular. What are they and how do they work?
- Is there any way to spot potential errors in my code before I run it?
- My code looks like a bowl of spaghetti. How can I make it more readable?

In this sprint, we will will not be learning any new programming languages so we can focus on tackling these questions and some more. We will learn how to use what we already know in a more professional manner. Along the way, we will also continue to refine our skills in HTML, CSS, and JavaScript.

# Part Description

As with previous front-end sprints, we will begin by leveling up our development environment. This part delves into the essential tools and practices that drive modern web development. We will familiarize ourselves with packages, build tools, formatters, and linters that you are expected to use in your upcoming projects.

# Key learning topics & resources for this part

## Editor upgrades (1 hour)

Before we delve into modern front-end practices, we need to ensure our code editor is up to the task. We will install some tools that we will use in this and upcoming sprint parts.

1. We recommend setting up the following VS Code **extensions**:

- (Required) [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- (Required) [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- (Required) [Stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint)
- (Required) [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)
- (Recommended) [vscode-icons](https://marketplace.visualstudio.com/items?itemName=vscode-icons-team.vscode-icons)
- (Recommended) [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin)

2. We also recommend configuring your editor font to use font **ligatures**. Ligatures are special characters that combine multiple characters into a single glyph, making your code easier to visually scan. Not all fonts support ligatures. Here's a tutorial on how to setup ligatures for [VS Code and Fira Code font](https://github.com/tonsky/FiraCode/wiki/VS-Code-Instructions). You can also use other fonts, such as [JetBrains Mono](https://www.jetbrains.com/lp/mono/), [Cascadia Code](https://github.com/microsoft/cascadia-code), or any other developer-friendly font that supports ligatures. Feel free to play around with font family, size and weight to find the best fit for you.

3. Finally, if you have some time left, check out some [VS Code themes](https://vscodethemes.com/?language=javascript) and find one that provides a clearer visual distinction between different code elements. You can change the preview language in the top-right corner. In general, we recommend themes that have a use different colors for JS variables, their properties and for CSS units. Examples of such themes: One Dark Pro, Palenight, Panda Syntax and many others.

## Introduction to JavaScript Packages (2 hours)

You are already familiar with packages through your work with Python. JavaScript packages are similar in that they are reusable pieces of code that can be shared and used in other projects.

As these packages are generally run through Node.js, they are managed through a package manager called `npm`. `npm` is a command-line tool that allows you to install, update, and remove packages from your project. You might come across other alternative package managers like `pnpm` or `yarn`, but `npm` is the most popular one as it comes bundled with Node.js. So, if you have Node.js installed, you already have `npm`.

> Open your terminal and run `npm -v` to check if you have `npm` installed on your machine. This command will display your `npm` version, which should not be confused with your Node.js version.

**Note:** Try to use the VS Code terminal for these commands. Using an external terminal interface is fine, but we prefer that you learn to use the VS Code terminal as it integrates well with the VS Code editor and its debugging tools. Also, if you are running Windows and have WSL installed, ensure your terminal is selected to use WSL (Ubuntu) as its default shell. This can be seen in the terminal's top right corner. You might need to change the default shell in your VS Code settings to keep this setting persistent.

To get a good overview of `npm` and JS packages, watch this [npm tutorial](https://www.youtube.com/watch?v=P3aKRdUyr0s). This video is in the context of writing Sass, so the particular tools, such as Gulp and Chalk are not relevant to us. However, the video does a great job of explaining the basics of `npm` and `package.json`.

Use the video and online resources to investigate the following:

- What is semantic versioning?
- When working with packages, should you primarily install packages locally or globally?
- What does the `^` in front of the package version mean? What are other supported versioning operators?
- What is the difference between `package.json` and `package-lock.json`?
- How can you specify custom commands in your `package.json` file and then run them in your command line?
- Should you commit your `node_modules` folder to your GitHub repository?
- What is the difference between a regular dependency and a dev dependency? Why would we want to separate them?
- When installing a package, what do the `--global`, `--save`, and `--save-dev` command line flags do?
- Is `--save` still needed in newer versions of `npm`?

## Exercise: Install and Use a Package (1 hour)

Create a new folder for this exercise, navigate to that folder (`cd folder-name`) and run `npm init` in your terminal. After a few guided steps, it will create a `package.json` file in your project folder. This file will contain information about your project and its dependencies.

We will try out installing a few packages:

- `lodash-es` (ES Module version of `lodash`) is a utility library that provides many useful functions for working with arrays, objects, strings, etc. Some of these functions are already included in the native JavaScript objects, but `lodash-es` can be used to fill in the gaps for some common use cases.
- `date-fns` is a date utility library that provides many useful functions for working with dates that are not included in the native JavaScript `Date` object.

Run `npm install lodash-es date-fns` which will install the `lodash-es` and `date-fns` packages as dependencies in your project. Notice how the `node_modules` folder has been created and populated with the installed packages. Also, notice how the `package.json` file has been updated with the installed packages.

Now these packages are available for you to use in your code, given you run it through Node.js. Create a new JavaScript file and add the following code:

```js
import { format } from 'date-fns'
import { intersection } from 'lodash-es'

const date = new Date()
const dateFormatted = format(date, 'yyyy.MM.dd')

console.log('dateFormatted', dateFormatted)

const words = ['hello', 'earth', 'hello', 'mars']
const planets = ['venus', 'earth', 'mars']

const planetsMentioned = intersection(words, planets)

console.log('planetsMentioned', planetsMentioned)
```

Try running your code with `node`, for example `node index.js` in your terminal. You should encounter an error. This is because Node.js by default uses CommonJS modules. To switch it to ES modules, you need to add `"type": "module"` to your `package.json` file. Now, try running your code again. It should produce the following output:

```
dateFormatted 2023.07.21
planetsMentioned ['earth', 'mars']
```

Try out:

- [uniq](https://lodash.com/docs/#uniq) from `lodash-es` to get a unique list of `words`
- [formatDistanceToNow](https://date-fns.org/v2.30.0/docs/formatDistanceToNow) from `date-fns` to get the duration between `date` and James Webb Space Telescope launch date (2021-12-25 12:20 UTC).

The JavaScript ecosystem is vast and there are many packages that can help you solve common problems. You can find many of them on [npmjs.com](https://www.npmjs.com/). Often, you can search for a package by using npm's site search or simply by searching online "{wanted solution} npm". For example, "schema validation npm". This could lead you to a package like `ajv` for JSON schema validation or `zod` for TypeScript schema validation. It can be a daunting task to find the right package for your needs and you will need some time to learn how to do it effectively. Prefer using packages that have been recently updated, have documentation, have a large number of downloads and GitHub stars and are written in TypeScript or provide type definitions.

**Pro tip**: You can experiment with your installed packages using the Quokka.js VS Code extension that we mentioned in the previous sprint. It allows you to import packages and use installed packages in your currently opened VS Code project.

**Pro tip #2:** Generally, you will want to tightly control the type and number of packages you install in your project. This is because many packages come with their dependencies, which can quickly add up and bloat your project, especially if it's imported into your application code, which must then be downloaded by the user. So, before installing a package, ask yourself if you really need it. You might need some time to learn how to strike a balance between bloating your project with unnecessary packages and wasting your time reinventing the wheel by writing your code to solve a problem that a package has already solved.

**Pro tip #3:** It's advisable to import only the necessary parts when using packages in your project. For instance, instead of importing the entire `lodash-es` library, you can import just the `uniq` function by using `import { uniq } from 'lodash-es'`. This allows our bundler to trace the dependencies and include only the required parts. This process is known as **tree-shaking**, as the bundler "shakes-off" the parts of the library that are not needed.

## Build Tools (0.5 hours)

We have already imported packages into our code and used Node to execute it. However, you may be wondering, **how do we run code with packages in a web browser**?

The simplest method would be to directly link package files in the HTML file. For instance, you've seen this in the HTML/CSS assignment where a Bootstrap CSS file link was provided in the HTML file. The same can be done for JS files. While this works well for small projects, it becomes increasingly difficult to manage as the project expands and requires 10s or even 100s of packages.

This is where build tools come into the picture.

Build tools are essential in modern web development. They can be thought of as a set of programs that process our code and assets, transforming them into a format that the browser can deal more easily with.

This allows us to distinguish our development environment from the live production environment. Why is this beneficial?

- We can effortlessly use packages installed through `npm`.
- We can utilize the latest JavaScript features without worrying about browser compatibility, as the build tool can include "rewriting" (transpiling) our code to a JavaScript version supported by older browsers.
- We can use languages that can be transpiled to web-native languages, such as SCSS for CSS and TypeScript for JavaScript.
- We can optimize our assets and bundle our code into a few minified files to improve page load times.
- We can add extra steps to our build process, like compressing images, generating favicons, etc.

For a long time, the most popular build tool for JavaScript was [Webpack](https://webpack.js.org/). However, Webpack can be complex and challenging to configure. Plus, it has some performance drawbacks when working with large projects.

To overcome these issues, a new generation of build tools has emerged that take advantage of the latest browser features. One that has gained significant traction and the one we will be using in this module is called **Vite**. Initially, it started as a build tool for a front-end framework Vue, but it has since evolved into a versatile build tool that is very popular with most JavaScript front-end frameworks.

## Exercise: Create a JavaScript Project with Vite (1.5 hours)

Begin by watching and following this [Vite tutorial from the creator himself](https://www.youtube.com/watch?v=DkGV5F4XnfQ).

**Note:** Use `npm init vite@latest` instead of `npm init @vitejs/app`. Run this inside your projects folder. This command will create a new folder with the name of your project. Navigate to this folder and install the dependencies using `npm install`.

After creating a new vanilla JavaScript project, explore the generated files. Pay attention to the following:

- Importing non-JS files
- JavaScript generating the HTML content
- The setup and usage of the counter

**Mini Exercise 1:**
Test the development server by running `npm run dev` in your terminal. This command will start the development server, which is similar to the `VS Code` Live Server extension, but with some additional features that we will discuss later. Try modifying the code and observe how the page updates automatically.

Use the Developer Tools to inspect the HTML elements. It should include the dynamically generated HTML content. Then, open up the page source (`Ctrl/Cmd + U`) and note that the visual HTML content is not present. This is because the HTML content is generated by JavaScript and is not present in the original HTML file. Your HTML is generated on the fly by your browser executing the JavaScript code.

**Mini Exercise 2:**
Terminate the server and run `npm run build`. You should see that a `dist` folder has been created. This is the production build of your project that would be deployed to the client, for example, a web server on some hosting service.

Observe how:

- `index.html` no longer references ES modules
- Most files are now named with hashes - this is to ensure that the browser uniquely caches each file
- The JS and CSS code has been minified and optimized
- All JS code is now bundled into a single file to reduce the number of requests
- Files from the `public` folder have been copied directly to the `dist` folder

**Mini Exercise 3:**
Run `npm run preview` to see the production build in action. This command will start a local server that serves the production build.

**Mini Exercise 4:**

- Move your development JS, CSS, and SVG files to a new `src` folder
- Update the file paths so the project still works when running a server with `npm run dev`; follow the terminal error messages to fix the paths
- Add two additional buttons: one to decrement the counter and one to reset the counter to 0
- Use JS to hide the reset and decrement buttons when the counter is 0

## Introduction to Formatting & Linting Tools (1.5 hours)

Before we delve into learning about a front-end framework, it would be beneficial to have some tools that can check our code for errors, guide us towards best practices, and enforce a consistent coding style. This is where **formatting** and **linting** come into play.

**Formatting** is the process of automatically restructuring your code to adhere to a specific coding style. It is particularly useful in maintaining a consistent coding style across your project, which is especially handy when working in a team as it can help avoid unnecessary debates about code formatting. We will be using **Prettier** as our formatting tool.

**Linting** is the process of running a program that analyzes your code for potential issues and sometimes, style inconsistencies. If applied strictly, it will consider any deviation from the rules as an error. While it may seem bothersome at first, linting is an invaluable tool that helps detect bugs and potential issues in your code. Considering how easy it is to make mistakes in JavaScript, linting can be a lifesaver. We will be using **ESLint** as our linting tool.

**Note:** Linting and formatting errors do not always indicate that your code is broken. They are there to help you write better, more consistent code. However, sometimes they can highlight a real issue, such as a typo or a missing variable. Therefore, it's important to take them seriously. They hold you accountable to the rules you have set for yourself and your team.

In our configuration, we will primarily rely on the **Airbnb JavaScript Style Guide**, which is the most popular JS style and rule guide. However, if you're already familiar with these tools, feel free to explore other configurations, such as **[StandardJS](https://standardjs.com/)**. You can compare the two configurations [here](https://gist.github.com/dave-burke/09676ebe95f0e9edcf900fa8e353a53c).

**Prettier config**

Assuming you have already installed the necessary Prettier extension in your code editor, you can create a `.prettierrc` file in your project folder and add the following configuration:

```json
{
  "singleQuote": true,
  "arrowParens": "avoid",
  "semi": true
}
```

We have added 3 rule overrides to align with the AirBnB style guide:

- `singleQuote` enforces the use of single quotes for strings (a general JS industry standard)
- `arrowParens` enforces the use of parentheses around arrow function parameters only when there is more than one parameter
- `semi` enforces the use of semicolons at the end of statements

If you prefer a **semicolon-free style**, set `semi` value from `true` to `false`. Some popular configurations such as [StandardJS](https://www.npmjs.com/package/eslint-config-standard) primarily use a semicolon-less style, so this is a matter of preference.

Generally, it is recommended to have a project-level configuration file for each project. You can also add your style rules to your global Prettier configuration. You can do so by adding the following settings to your VS Code settings (command "Preferences: Open User Settings (JSON)"). For example:

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "prettier.semi": true,
  "prettier.singleQuote": true,
  "prettier.arrowParens": "avoid"
}
```

You can add `"prettier.requireConfig": true` if you want to prevent Prettier from formatting code when there is no `.prettierrc` file in a project folder.

**ESLint config**

You can install ESLint and some necessary style rules by running the following command in your terminal from your project folder:

```bash
npm install eslint eslint-config-airbnb-base eslint-plugin-import eslint-config-prettier --save-dev
```

This command installs 4 packages as development dependencies:

- `eslint` is the main ESLint package
- `eslint-config-airbnb-base` is a set of rules based on the Airbnb JavaScript style guide. More rulesets are available, but this one is a good starting point.
- `eslint-config-prettier` is a ruleset that disables all formatting rules that might conflict with Prettier.
- `eslint-plugin-import` is a plugin that adds additional rules for import/export syntax

To apply these rules to your project, you need to create an ESLint configuration file. Do this by creating a `.eslintrc.cjs` file in your project folder and adding the following:

```js
// here we are using CommonJS modules instead of ES modules
module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['airbnb-base', 'prettier'],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'no-param-reassign': 'off',
  },
}
```

While all the details of this configuration are not important right now, note the following:

- we are extending the `airbnb-base` and `prettier` rulesets, which we installed earlier
- we have some configuration to ensure the rules are primarily targeted to the browser environment
- we have disabled the `no-param-reassign` rule, which in this mini project would require us to use less readable code

## Exercise: Correcting Formatting and Linting Errors (1 hour)

If ESLint has been set up correctly, upon opening the `main.js` and `counter.js` files, you should observe the following:

- A red squiggly line under certain statements.
- A number displayed in the Problems tab, which is located next to the Terminal tab.
- A number in the VS Code sidebar file explorer next to some JS files.

If you don't see these indications, try reloading the VS Code window for the settings to take effect. You can do this by selecting "Developer: Reload Window".

These numbers represent the total errors detected. The red squiggly line shows the location of the error in the file. Hover over the squiggly line to view the error message. You'll also see additional commands such as "View Problem" and "Quick Fix". These commands can help you understand and rectify the error. Clicking on the rule name will take you to the documentation for that specific rule. To ensure the popup does not disappear, you might need to hold down the `Alt/Option` key on your keyboard.

Due to the way Vite allows us to import public assets, you might encounter a false alarm due to an absolute import path. If this happens, you can disable this error for that specific line:

```js
// eslint-disable-next-line import/no-unresolved, import/no-absolute-path
import viteLogo from '/vite.svg'
```

**Note:** It's generally not recommended to disable rules. However, in this case, we are disabling it for a single line that was incorrectly flagged due to a discrepancy in how Vite and ESLint resolve absolute paths (those starting with a `/` symbol). We will address this particular issue more comprehensively later on.

Take the time to examine each issue and understand why it's being flagged. Then, try to fix each error. If you're having trouble, you can use the "Quick Fix" command to automatically correct an error.

## Setting Up Automatic Error Correction

Once you have a good grasp of the main rules, you can configure ESLint and Prettier to automatically correct errors every time you save a file. This not only saves you time but also aids in improving your coding skills.

- To apply linting to all projects: Modify your VS Code settings (use the VS Code command "Preferences: Open Settings (JSON)")
- To apply linting to this specific project: Create a `.vscode` folder in your project folder and add a `settings.json` file in that folder

You can use the following configuration:

```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll": true,
    "source.fixAll.eslint": true,
    "source.fixAll.stylelint": true
  },
  "editor.formatOnSave": true,
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact",
    "vue"
  ],
  "stylelint.validate": ["css", "scss", "vue"]
}
```

This configuration includes:

- Automatic correction of all fixable errors upon saving
- Automatic formatting of all files upon saving
- Ensuring that our plugins are compatible with JavaScript, TypeScript, React, and Vue files

While this configuration will attempt to correct most issues, it cannot resolve all of them because some issues do not have an unambiguous solution. In such cases, it will display an error, and you will have to manually correct it. This should help you to learn various JS and CSS edge-cases.

Now, try to modify the code indentation, semicolons, spaces around function parameters, using 'var' for variable assignments, etc., and observe how Prettier/ESLint automatically corrects them for you on saving the file. If this doesn't work, try reloading the VS Code window for the settings to take effect (use the command "Developer: Reload Window").

You may have noticed that we have also set up Stylelint in advance. What is Stylint? Glad you asked...

## How to Format and Lint CSS Code

Just as we can lint JavaScript code, we can also lint CSS code. This is where **Stylelint** becomes useful. It's a linter designed specifically for CSS/SCSS code, with a primary focus on identifying syntax errors.

To initialize Stylelint, execute the following command in your project folder:

```
npm init stylelint
```

Upon doing this, you should now have a `.stylelintrc.json` file in your project. Similar to ESLint, Stylelint can be configured to follow a specific set of rules.

For this course, we'll use the default [stylelint-config-standard](https://github.com/stylelint/stylelint-config-standard) ruleset. This should be included in your `package.json` `devDependencies` and also in your `.stylelintrc.json` file:

```json
{
  "extends": ["stylelint-config-standard"]
}
```

## Exercise: Linting CSS Code (1 hour)

Now, let's open the CSS file in our project and examine the errors that have been flagged. You can choose to either fix these errors manually or rely on our automatic error fixing setup, which should be activated when the file is saved.

Next, try copying some of the CSS files from your previous projects and observe how Stylelint and Prettier respond to them. Investigate the errors and attempt to resolve them.

This concludes the first part of the course, which covers linting for a basic JavaScript project and CSS.

# Directions for further research (2 hours+):

Here are some potential areas for further research:

- What are the practical implications of Semantic Versioning for you as a developer?
- Is it possible to modify code in the `node_modules` folder? If so, why? If not, why not?
- Can you explain the differences between development builds and production builds?
- How would you go about preparing a Vite project for production?
- Why do some companies implement a company-wide ESLint configuration?
- (Optional) Could you explain how to use SCSS instead of CSS in your Vite project?
- (Optional) Could you demonstrate how to use TypeScript instead of JavaScript in your Vite project?
- (Optional) If you wish to use a style framework, such as Bootstrap or Tailwind CSS, how would you integrate it into your Vite project?

## (Optional) Set up custom ESLint and Stylelint rules (1 hour+)

While we have provided you with a set of recommended ESLint and Stylelint rules, you can adopt additional rules to further enhance your code quality. You can do this by installing additional ESLint and Stylelint plugins and rulesets. Here are some resources to get you started:

- [Built-in ESLint rules](https://eslint.org/docs/rules/)
- [List of various ESLint plugins and configs](https://github.com/dustinspecker/awesome-eslint)
- [Shopify ESLint plugins](https://www.npmjs.com/package/@shopify/eslint-plugin)
- [Rules to restrict code complexity](https://www.npmjs.com/package/eslint-plugin-sonarjs)
- [GitHub's ESLint rules](https://github.com/github/eslint-plugin-github)
- [Lots of powerful ESLint rules](https://www.npmjs.com/package/eslint-plugin-unicorn)
- [List of Stylelint rules and configs](https://github.com/stylelint/awesome-stylelint)
- Quite often, libraries will have their own official or community-maintained ESLint, Prettier and/or Stylelint plugins. For example, Vue has its own ESLint plugins which will be introduced in the next part of this sprint. Though, you are encouraged to use additional framework-tuned rules if you decide to use additional frameworks, such as [Tailwind](https://tailwindcss.com/blog/automatic-class-sorting-with-prettier).

You can come back to this section later on as you gain more experience with ESLint and Stylelint.
