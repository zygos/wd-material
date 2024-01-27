## Linting and Formatting Tools (1 hour)

Before we start writing our own Vue code, let's setup some tools that will guide us in writing cleaner code. For that, we will use linters.

**Linting** is a process of running a program that analyzes your code for potential errors and enforces a specific coding style as you are writing it. While it may initially seem like a nuisance at first, linting is an invaluable tool that helps catch bugs and maintain consistency in your code. Given how easy it can be to make mistakes in JavaScript, linting can be a lifesaver.

{{ insert how to install eslint here }}

If you have selected **ESLint** in the project setup step, you should see an additional file in your project `.eslintrc.cjs`. This file allow you to configure ESLint for style and code quality checks. Right now you should have some basic Vue-specific rules added to ESLint configuration.

Let's open up the `main.js` and `.eslintrc.cjs` side-by-side (or in separate tabs). Add a custom rule in the `.eslintrc.cjs` file and see how it affects the linting of your code.

```js
// for compatability with older Node.js versions, eslint uses CommonJS
// modules instead of ES modules, so we need to use module.exports
/* eslint-env node */
module.exports = {
  /* ... */
  rules: {
    semi: ['error', 'never']
  }
}
```

Now, if you would add a semicolon at the end of the `import` statement in the `main.js` file, you should see:
- a red squiggly line under the semicolon
- a red `1` in the VS Code file explorer besides the `main.js` file
- a `1` in the Problems tab, which you should see besides the Terminal tab

You can also do the opposite and set the `semi` rule to `['error', 'always']` to always require semicolons. To see the complete list of built-in rules, check out the [ESLint rules documentation](...). It is possible to add even more rules to your ESLint configuration by installing additional packages, which in this context are referred to as ESLint plugins. You should already see one plugin installed and listed in your `package.json` as `eslint-plugin-vue`. It is then referred in the `.eslintrc.cjs` file as `plugin:vue/vue3-essential`. This plugin adds additional essential rules that are specific to Vue.

In general, it is recommended to use a predefined ruleset as a starting point and then add or remove rules as needed. Let's do just that.

There are many different ESLint style guides, but we will focus on using Airbnb's style guide, as it is the most common. To install it, run the following command in your project folder:

```
npm install --save-dev @vue/eslint-config-airbnb @rushstack/eslint-patch
```

Then add `'@vue/eslint-config-airbnb'` in your `.eslintrc.cjs` file as the last item in the `extends` array. This will extend the Airbnb style guide with additional rules specific to Vue.

Finally, for technical module resolution reasons, add the following line at the top of your `.eslintrc.cjs` file:

```js
require('@rushstack/eslint-patch/modern-module-resolution')
```

## Exercise: fixing linting errors (1 hour)

Copy and paste the following code into your project and see if ESLint catches any errors:

```js
{{ add code that triggers lots of various linting and style errors }}
```

Now, try to fix the errors that ESLint has caught. When the error is shown, try hovering over it to see the suggested fix. Also, you can search for the rule name online to get more information about the rule, why it is triggered, and how to fix it.

You are recommended to manually investigate why a particular rule is triggered and how to fix it. However, when you have familiarized yourself with the main rules, you can setup ESLint to automatically fix some of the errors for you. To do so, create `.vscode/settings.json` file and add the following:

```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll": true,
    "source.fixAll.eslint": true
  },
  "eslint.validate": [
    "vue",
    "javascript",
    "javascriptreact"
  ]
}
```

This will automatically fix all ESLint errors it can every time you save a file. However, it can not fix all errors. In these cases, it will show an error and you will have to manually fix it. This is a good thing, as it will help you learn the language and the frameworks you are using.

Run `npm run lint` in your project folder to see if there are any JavaScript errors left.

## Linting CSS code (1 hour)

The same way we can lint JavaScript code, we can also lint CSS code. This is where **stylelint** comes in. It is a linter for CSS code. It not only catches syntax errors, but also enforces a specific coding style.

To install stylelint, run the following commands in your project folder:

```
npm init stylelint
npm install --save-dev postcss-html stylelint-config-standard-vue
```

Now you should have a `.stylelintrc.json` file in your project. Update it to use the standard CSS style rules for Vue and CSS:

```json
{
  "extends": [
    "stylelint-config-standard-vue",
    "stylelint-config-standard"
  ]
}
```

Finally, add the configuration needed for your editor in the `.vscode/settings.json` file:

```json
{
  /* ... your previously added eslint config ... */
  "stylelint.validate": [
    "css",
    "scss",
    "vue"
  ]
}
```

Now you might notice that your code editor complains about the media query in the style part of `App.vue` component. Try to fix it.

Once that is fixed, look through the `main.css` and `base.css` files. Investigate if you have any errors. Some of these "errors" are not true errors, but rather deviations from a defined style ruleset. Nevertheless, these should be treated as errors and fixed.

Once if you are familiar with the thrown style errors, you can use VS Code Stylelint extension to fix all the fixable errors automatically. Given that you have already installed the [stylelint extension](...), update your `.vscode/settings.json` file to include:

```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll": true,
    "source.fixAll.eslint": true,
    "source.fixAll.stylelint": true
  },
  /* ... remaining config ... */
}
```
