Part 1: Packages and Build Tools

# Sprint Description

Congratulations on successfully reaching the web frameworks module! By this point, you should have a basic understanding of HTML, CSS, JavaScript, and SQL - the meat and potatoes of web development. In this module, we will explore the tools, practices, and frameworks that drive modern web development.

The previous module may have left you with several unanswered questions, such as:

- How should I organize my files?
- How should I structure my code within those files?
- Do professional developers write their code like we did in our hands-on projects, using raw HTML, CSS, and JS files?
- Should I use functions, classes, or something else?
- How can I include packages in a front-end application?
- I've heard about frameworks like React, Vue, and Angular. What are they, and how do they work?
- Is there any way to spot potential errors in my code before I run it?
- My code looks like a bowl of spaghetti. How can I make it more readable?

We will learn how to connect what we already know in a more professional setting and continue to refine our skills in HTML, CSS, and JavaScript.

# Part Description

First, we will begin by leveling up our development environment. Then, we will delve into the essential code quality tools that drive modern web development. We will familiarize ourselves with front-end packages, build tools, formatters, and linters that you are expected to use in most, if not all, upcoming projects.

# Key learning topics & resources for this part

## Editor upgrades (1 hour)

Before we delve into modern front-end practices, we must ensure our code editor is up to the task. We will install some tools that we will use in this and upcoming sprint parts.

1. We recommend setting up the following VS Code **extensions**:

- (Required) [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- (Required) [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- (Required) [Vue](https://marketplace.visualstudio.com/items?itemName=Vue.volar)
- (Recommended) [vscode-icons](https://marketplace.visualstudio.com/items?itemName=vscode-icons-team.vscode-icons)
- (Optional) [Stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint)

2. We suggest configuring your editor font to use font **ligatures**. Ligatures are special characters that combine multiple characters into a single glyph, making your code easier to scan visually. Not all fonts support ligatures. Here's a tutorial on setting up ligatures for [VS Code and Fira Code font](https://github.com/tonsky/FiraCode/wiki/VS-Code-Instructions). You can also use other fonts, such as [JetBrains Mono](https://www.jetbrains.com/lp/mono/), [Cascadia Code](https://github.com/microsoft/cascadia-code), or any other developer-friendly font that supports ligatures. Feel free to play around with font family, size, and weight to find the best fit. If you have a few minutes to spare, you can play the [coding font tournament](https://www.codingfont.com/) to find the best font.

3. Finally, if you have time left, check out some [VS Code themes](https://vscodethemes.com/?language=javascript) and find one that provides a clearer visual distinction between different code elements. You can change the preview language in the top-right corner. In general, we recommend themes that use different colors for JS variables, their properties, and CSS units. Examples of such themes are One Dark Pro, GitHub Dark, Palenight, Panda Syntax, and many others.

## Build Tools (0.5 hours)

We have already learned how to use packages in Node. However, **how do we run code with packages in a web browser**?

The simplest method would be directly linking package files in the HTML file. For instance, you've seen this in the HTML/CSS assignment where a Bootstrap CSS file link was provided in the HTML file. The same can be done for JS files. While this works well for small projects, it becomes increasingly difficult to manage as the project expands and requires 10s or even 100s of packages.

Alternatively, we could import them from our `node_modules` folder. However, this is problematic for two reasons:

- The browser does not know how to access the `node_modules` folder. Node is clever enough to interpret a given package name, let's say `import { format } from 'date-fns'` as `import { format } from '../node_modules/date-fns'`, but the browser has no such mechanism.
- quite often, packages depend on other packages, which depend on others, and so on. The browser would need to download them one by one, which would be very slow.

To address this issue, web developers use various **build tools**. Build tools are essential in modern web development. They can be thought of as programs that process our code and assets, transforming them into a structure that the browser can handle more efficiently.

In the most basic sense, build tools transform the following:

```js
import { format } from 'date-fns'

const formatted = format(new Date(), 'yyyy-MM-dd')
console.log('formatted', formatted)
```

into:

```js
// import statement replaced with the actual code from the package
function format(date, formatStr, options) {
  // ... 100s of lines of code from date-fns package
}

const formatted = format(new Date(), 'yyyy-MM-dd')
console.log('formatted', formatted)
```

Of course, this is a simplification, but it gives you an idea of what build tools do.

Nowadays, build tools perform many pre-processing tasks that transform our code into a format that is optimized for the web. They can also bundle our code into a single file, optimize images, and much more.

This introduces a distinction between source code and the code that is actually run in the browser. The source code is the code we write and it is written in a way that is easy for us to understand and maintain. Meanwhile, the code that is run in the browser is optimized for performance and efficiency - stripped of comments, whitespace, and bundled into a single file.

Why is this source code and "production" code distinction important and what do build tools enable us to do?

- We can effortlessly use packages installed through `npm`.
- We can utilize the latest JavaScript features without worrying about browser compatibility, as the build tool can "rewrite" (transpile) our code to a JavaScript version supported by older browsers.
- We can use higher-level languages that can be transpiled to web-native languages, such as SCSS for CSS and TypeScript for JavaScript.
- We can optimize our assets for smaller file sizes by removing JavaScript comments, whitespace, compressing images, etc.
- We can bundle our code into a few files that include everything needed for the application to run, reducing the number of requests the browser needs to make. Otherwise, the browser must make many round trips to the server to fetch each file individually.
- We can add extra steps to our build process, like compressing images, generating icons for different devices, etc.

For a long time, the most popular build tool for JavaScript was [Webpack](https://webpack.js.org/). However, Webpack can be complex and challenging to configure. Plus, it has some performance drawbacks when working with large projects.

To overcome these issues, a new generation of build tools has emerged that take advantage of the latest browser features. One that has gained significant traction and will be used in this module is called **Vite**. Initially, it started as a development server for a Vue front-end framework. Nowadays, it is used in most JavaScript front-end frameworks.

**Note.** Vite is technically a server, not a build tool. It uses [esbuild](https://esbuild.github.io/) and [Rollup](https://rollupjs.org/) under the hood to build our code.

**Pro tip #1:** Generally, you will want to tightly control the type and number of packages you install on your front end. Each dependency you import in your frontend source code will be added to your **bundle** - a single JS file that contains all the code necessary to see your website. The larger the bundle, the longer it will take to download and run your website. This is especially important for mobile users with slower internet connections. Therefore, you should be mindful of the packages you install. You might need some time to balance between bloating your project with unnecessary packages and wasting your time reinventing the wheel by writing your code to solve a problem that a package has already solved. You can use [bundlephobia](https://bundlephobia.com/) to check the size of a package before installing it.

**Pro tip #2:** It's advisable to import only the necessary parts when using packages in your project. For instance, instead of importing the entire `date-fns` package, you can import just the `format` function by using `import { format } from 'date-fns'`. This allows our build tools to throw out all the package parts we don't use. This process is known as **tree-shaking**, as the bundler "shakes-off" the unnecessary parts of the package.

## Exercise: Create a JavaScript Project with Vite (1.5 hours)

Begin by watching and following this [Vite tutorial from the creator himself](https://www.youtube.com/watch?v=DkGV5F4XnfQ).

**Note.** Use `npm init vite@latest` instead of `npm init @vitejs/app`. Run this inside your projects folder. This command will create a new folder with the name of your project. Navigate to this folder and install the dependencies using `npm install`.

After creating a new vanilla JavaScript project, explore the generated files. Pay attention to the following:

- Importing non-JS files
- JavaScript generating the HTML content
- The setup and usage of the counter

**Mini Exercise 1:**

Test the development server by running `npm run dev` in your terminal. This command will start the **development server**, similar to the `VS Code` Live Server extension, but with some additional features we will discuss later. Try modifying the code and observe how the page updates automatically.

Use the Developer Tools to inspect the HTML elements. It should include the dynamically generated HTML content. Then, open up the page source (`Ctrl/Cmd + U`) and note that the visual HTML elements are absent. This is because JavaScript generates the HTML content and is not present in the original HTML file. Your HTML is generated on the fly by your browser executing the JavaScript code.

**Mini Exercise 2:**

Terminate the Vite development server and run `npm run build`. You should see that a `dist` folder has been created. This is the **production build** of your project that is optimized for performance.

Observe how:

- The JS and CSS code has been **minified**. While it looks like a mess, this is done to reduce the file size and improve loading times.
- All JS code is now bundled into a single file to reduce the number of requests
- Files from the `public` folder have been copied directly to the `dist` folder. All files inside of `dist` will be accessible to the web browser.

**Mini Exercise 3:**

Run `npm run preview` to see the production build in action. This command will start a local server that serves the production build, very similar to the VS Code Live Server extension.

**Mini Exercise 4:**

- Move your development JS, CSS, and SVG files to a new `src` folder
- Update the file paths so the project still works when running a server with `npm run dev`; follow the terminal error messages to fix the paths
- Add two additional buttons: one to decrement the counter and one to reset the counter to 0
- Use JS to hide the reset and decrement buttons when the counter reaches 0. We want to prevent the counter from going below 0.

## Introduction to Formatting & Linting Tools (1.5 hours)

Before we learn about front-end frameworks, it would be beneficial to have some tools to check our code for errors, guide us toward best practices, and enforce a consistent coding style. This is where **formatting** and **linting** come into play.

**Formatter** automatically restructures your code to adhere to a specific coding style. It is handy for maintaining a consistent coding style across your project. It is also convenient when working in a team, as it can help avoid unnecessary debates about code formatting. We will be using **Prettier**, the most popular code formatter in the JavaScript community.

**Linting** analyzes your code for potential issues and, sometimes, style inconsistencies. If applied strictly, it will consider any deviation from the rules an error. While it may seem bothersome initially, linting is an invaluable tool that helps detect bugs and potential issues in your code. Considering how easy it is to make mistakes in JavaScript, linting can be a lifesaver. We will use **ESLint** as our linting tool, the gold standard for JavaScript linting.

**Note: Linting and formatting errors do not indicate that your code is broken**. They are there to help you write better, more consistent code. Sometimes, they can highlight real issues, such as typos or missing variables. Therefore, it's important to take them seriously. They hold you accountable to the rules you have set for yourself and your team. Some linting and formatting rules are subjective and are there to enforce a consistent coding style across your project.

Our configuration will primarily rely on the **Airbnb JavaScript Style Guide**, the most popular JS style and rule guide. However, if you're already familiar with these tools, feel free to explore other configurations.

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

If you prefer a Python-like **semicolon-free style**, set the `semi` value from `true` to `false`. Some popular configurations, such as [StandardJS](https://www.npmjs.com/package/eslint-config-standard), primarily use a semicolon-less style, so this is a matter of preference.

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
npm i -D eslint@8 eslint-config-airbnb-base@15 eslint-plugin-import@2 eslint-config-prettier@3
```

**Note.** To make sure that packages are compatible, we are providing the package versions in the install command.

This command installs 4 packages as development dependencies:

- `eslint` is the main ESLint package.
- `eslint-config-airbnb-base` is a set of rules based on the Airbnb JavaScript style guide. More rulesets are available, but this one is a good starting point.
- `eslint-config-prettier` is a ruleset that disables all formatting rules that might conflict with Prettier.
- `eslint-plugin-import` is a plugin that adds additional rules for import/export syntax.

To apply these rules to your project, you need to create an ESLint configuration file. Do this by creating a `.eslintrc.cjs` file in your project folder and adding the following:

```js
// Here we are using CommonJS modules instead of ES modules.
// That is also the reason why we are using .cjs file extension.
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
    sourceType: 'module',
  },
  rules: {
    'no-param-reassign': 'off',
  },
}
```

**Attention.** Make sure not to miss the first dot in the filename!

While all the details of this configuration are not important right now, note the following:

- we are extending the `airbnb-base` and `prettier` rulesets, which we installed earlier
- we have some configuration to ensure the rules are primarily targeted to the browser environment
- we have disabled the `no-param-reassign` rule, which in this mini project would require us to write more unnecessary code.

## Exercise: Correcting Formatting and Linting Errors (1 hour)

If ESLint has been set up correctly, upon opening the `main.js` and `counter.js` files, you should observe the following:

- A red squiggly line under certain statements.
- A number displayed in the Problems tab, which is located next to the Terminal tab.
- A number in the VS Code sidebar file explorer next to some JS files.

If you don't see these indications, try reloading the VS Code window so the settings take effect. You can do this by selecting "Developer: Reload Window".

These numbers represent the total errors detected. The red squiggly line shows the location of the error in the file. Hover over the squiggly line to view the error message. You'll also see additional commands such as "View Problem" and "Quick Fix". These commands can help you understand and rectify the error. Clicking on the rule name will take you to the documentation for that specific rule. You might need to hold down the `Alt/Option` key on your keyboard to ensure the popup does not disappear.

Due to the way Vite allows us to import public assets, you might encounter a false alarm due to an absolute import path. If this happens, you can disable this error for that specific line:

```js
// eslint-disable-next-line import/no-unresolved, import/no-absolute-path
import viteLogo from '/vite.svg'
```

**Note:** It's generally not recommended to disable rules. However, in this case, we are deactivating it for a single line that was incorrectly flagged due to a discrepancy in how Vite and ESLint resolve absolute paths (those starting with a `/` symbol). We will address this particular issue more comprehensively later on.

Take the time to examine each issue and understand why it's being flagged. Then, try to fix each error. If you're having trouble, you can use the "Quick Fix" command to correct an error automatically.

## Setting Up Automatic Error Correction

Once you have a good grasp of the main rules, you can configure ESLint and Prettier to correct errors every time you save a file automatically. This not only saves you time but also aids in improving your coding skills.

- To apply linting to all projects: Modify your VS Code settings (use the VS Code command "Preferences: Open Settings (JSON)")
- To apply linting to this specific project: Create a `.vscode` folder in your project folder and add a `settings.json` file in that folder

You can use the following configuration:

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll": "explicit",
    "source.fixAll.eslint": "explicit"
  },
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact",
    "vue"
  ]
}
```

This configuration includes:

- Automatic correction of all fixable errors upon saving
- Automatic formatting of all files upon saving
- Ensuring that our plugins are compatible with JavaScript, TypeScript, React, and Vue files

While this configuration will attempt to correct most issues, it cannot resolve all of them because some issues do not have an unambiguous solution. In such cases, it will display an error, and you will have to correct it manually. This should help you learn various JS and CSS edge cases.

Now, try to modify the code indentation, semicolons, spaces around function parameters, using 'var' for variable assignments, etc., and observe how Prettier/ESLint automatically corrects them for you on saving the file. If this doesn't work, try reloading the VS Code window so the settings take effect (use the command "Developer: Reload Window").

## Setting Up Commands for Fixing All Linting Errors (0.5 hours)

While automatic error correction is convenient in your code editor, sometimes it's useful to have a command that can check all your files for errors and fix them, if possible. This is especially useful when you want to check your code before committing it to a repository. This way, you can ensure that your code is clean and error-free before sharing it with others.

To set up this command, add the following scripts to your `package.json` `scripts` section:

```json
{
  "format": "prettier --write *.js",
  "lint": "eslint . --ext .js --fix --ignore-path .gitignore"
}
```

These commands will trigger the provided `node_modules/.bin` files for Prettier and ESLint, which were installed as part of the project setup. These files read the provided command line options, such as `--write` or `--fix` to apply the necessary changes to your files. In our case we are just specifying that we want to format and lint all `.js` files. The precise wording of these commands is not important as these are just properties specified by the package authors.

If you would run `npm run format` or `npm run lint` in your terminal, you would see that Prettier and ESLint would check and fix all JS files in your project. From now on, we will expect you to run these commands before submitting your projects!

# Directions for further research (2 hours+):

Here are some potential areas for further research:

- Can you explain the differences between development builds and production builds?
- How would you go about preparing a Vite project for production?
- Why do some companies implement a company-wide ESLint configuration?
- (Optional) How would you use SCSS instead of CSS in your Vite project?
- (Optional) If you wish to use a style framework like Bootstrap or Tailwind CSS, how would you integrate it into your Vite project?

## (Optional) Linting CSS Code (1 hour)

Just as we can lint JavaScript code, we can also lint CSS code. **Stylelint** is a linting package designed specifically for CSS/SCSS code, primarily focusing on identifying various malpractices and enforcing a consistent coding style.

To initialize Stylelint, execute the following command in your project folder:

```sh
npm init stylelint
```

Upon doing this, you should now have a `.stylelintrc.json` file in your project. Like ESLint, Stylelint can be configured to follow a specific set of rules.

We'll use the default [stylelint-config-standard](https://github.com/stylelint/stylelint-config-standard) ruleset for this course. This should be included in your `package.json` `devDependencies` and also in your `.stylelintrc.json` file:

```json
{
  "extends": ["stylelint-config-standard"]
}
```

In your `.vscode/settings.json` file, add the following configuration to enable Stylelint checking for errors on-the-fly as you are writing CSS/SCSS code:

```json
{
  "stylelint.validate": ["css", "scss", "vue"]
}
```

Now, let's open the CSS file in our project and examine the flagged errors. You can choose to fix these errors manually or rely on our automatic error fixing setup, which should be activated when the file is saved.

Next, try copying some of the CSS files from your previous projects and observe how Stylelint and Prettier respond to them. Investigate the errors and attempt to resolve them.

## (Optional, Advanced) Explore custom ESLint and Stylelint rules (1 hour+)

While we have provided you with recommended linting rules, you can adopt additional rules to enhance your code quality further. You can do this by installing additional ESLint and Stylelint plugins and rulesets. Here are some resources to get you started:

- [Built-in ESLint rules](https://eslint.org/docs/rules/)
- [List of various ESLint plugins and configs](https://github.com/dustinspecker/awesome-eslint)
- [Shopify ESLint plugins](https://www.npmjs.com/package/@shopify/eslint-plugin)
- [Rules to restrict code complexity](https://www.npmjs.com/package/eslint-plugin-sonarjs)
- [GitHub's ESLint rules](https://github.com/github/eslint-plugin-github)
- [Lots of powerful ESLint rules](https://www.npmjs.com/package/eslint-plugin-unicorn)
- [List of Stylelint rules and configs](https://github.com/stylelint/awesome-stylelint)
- Quite often, libraries will have their official or community-maintained ESLint, Prettier, and Stylelint plugins. For example, Vue has its own ESLint plugins, which will be introduced in the next part of this sprint. However, you are encouraged to use additional framework-tuned rules if you decide to use additional frameworks, such as [Tailwind](https://tailwindcss.com/blog/automatic-class-sorting-with-prettier).

You can return to this section later as you gain more experience with linting tools.
