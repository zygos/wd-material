Part 2: Front-end frameworks and introduction to Vue

# Part Description

In this section, we will delve deeper into code organization, component-based architecture, and our first front-end framework - Vue.

# Key learning topics & resources for this part

## Colocation (1 hour)

In your previous assignments, you likely spent some time contemplating where to place your code and how to organize it.

In this sprint, we will introduce the concept of **colocation**, an approach to code organization that simplifies reasoning and maintenance. To understand this concept, start by reading these articles:

- [Code colocation is king](https://koenvangilst.nl/blog/code-colocation-is-king)
- [Colocation](https://kentcdodds.com/blog/colocation)

In practical terms, colocation involves organizing your code by grouping together all the code related to a specific feature or behavior. This implies that instead of:

```
styles/
  header.css
  main.css
  footer.css
scripts/
  navigation.js
  api.js
index.html
```

You would have (_assuming we can import HTML files into other HTML files_):

```
header/
  header.html
  header.css
  header.js
main/
  main.html
  main.css
  main.js
footer/
  footer.html
  footer.css
  footer.js
```

This concept can be applied indefinitely. For instance, our `header` folder could contain:

```
header/
  logo/
    logo.html
    logo.css
    logo.js
  navigation/
    navigation.html
    navigation.css
    navigation/
      index.js
      navigationApi.js
  header.html
  header.css
  header.js
```

Note that colocation doesn't simply mean having every file in the same folder. It means **grouping together files that implement a header and separating them from other files**. The structure suggests that these files are **interacting with each other**, mostly in a parent-child relationship.

From the parent folder, we would simply see:

```
header
```

And if we decide to see how the `header` is implemented, only then we would see an additional layer of files and folders:

```
header/
  logo
  navigation
  header.html
  header.css
  header.js
```

But even now, we are not concerned with how the `logo` and `navigation` components are implemented. We are **gradually introduced to complexity** as we delve deeper into the folder structure.

It's important to note that this file structure isn't merely for organizing files. It also implies that nothing outside of the `header` folder should use the files within the `header` folder, except for the main file, in this case, `header.html`. From the outside, for example, from an imaginary `homepage.html`, we should only be dealing with `header.html`. This is often indicated by naming a main file inside a folder as `index`. For example:

```
header/
  logo/
  navigation/
  index.html // instead of header.html
  header.css
  header.js
```

This indicates that the `header/index.html` file is the only file that should be imported from the `header` folder. Then, `header/index.html` is responsible for dealing with files inside its own folder.

In front-end development, this type of styling and logic grouping is called a **component**. A component is a (mostly) self-contained unit of code that can be reused and composed with other components to create a larger application.

This is similar to how we generally organize things in the real world. For instance, in a room, we **group things together by their use and shared interaction**, not by the method of their creation. Chairs are grouped with a table, not because they are made of wood, but because they are used together. If we decided to move the table, we would almost certainly move the chairs with it. While every analogy has its limits, it is a good way to start thinking about organizing code.

You might be wondering whether this rule of thumb conflicts with the **separation of concerns** and **single responsibility principle**. You might think so if you focus on implementation details, such as the programming/markup language. In that case, we are mixing JS, HTML, and CSS. But if you consider it from the perspective of a particular component, there is no contradiction. Quite the opposite, our particular file or folder has a single responsibility, and from the outside, we are not concerned with how that responsibility is executed.

Front-end development has been moving in this direction for some time now.

**Note:** Some front-end CSS frameworks, such as [Tailwind CSS](https://tailwindcss.com/), take structure/style colocation to an extreme by practically using inline styles. For a component-based application, this is a valid approach. Despite that, it is still a minority approach that requires some additional learning overhead, and we will not be advocating its use this sprint.

## Front-end Frameworks

In your previous assignments, you may have faced some challenges in integrating JS, HTML, and CSS. For instance, your JS might have referenced CSS selectors, which were then used to fetch an HTML document. Alternatively, you might have used JS to generate new HTML, but then you would have had to consider how to update it when certain variables changed.

These are complex issues to address and they are not the primary concerns that front-end developers prefer to focus on. Ideally, our attention should be on the behavior of our applications, not on the intricacies of making JS, HTML, and CSS work in harmony.

Throughout the 2010s, both companies and individual web developers have endeavored to solve these problems by creating various JS libraries. It didn't take long for these libraries to evolve into comprehensive frameworks. These not only address the aforementioned issues, but also offer a structure for organizing your code.

## Vue 3

In this module, we will be using Vue as our front-end framework for several reasons:

- It has a relatively gentle learning curve, leveraging native HTML and CSS syntax.
- It is one of the three most widely adopted front-end frameworks.
- Its reactivity model can be applied to many other frameworks.
- It offers excellent documentation for both beginners and advanced users.

Vue takes the concept of colocation a step further by using Single File Component (SFC) `vue` files. Each of these files contains can contain 3 key parts:

- script (logic, JavaScript/TypeScript)
- template (markup, HTML)
- style (styling, CSS/SCSS)

Yes, that means it is possible to write HTML, CSS, and JavaScript in a single file. This has become the standard for front-end frameworks. Vue in this regard is one of the more structured frameworks, as it provides a clear separation between these three parts.

Each `vue` file includes the HTML, CSS, and JavaScript necessary for that component:

```vue
<script setup>
const name = 'Jane Doe'
</script>

<template>
  <div class="name">
    <h1>Hello, my name is {{ name }}!</h1>
  </div>
</template>

<style scoped>
.name {
  color: blue;
}
</style>
```

In Vue, our component file tree could look like this:

```
- components/
  - Header/
    - Header.vue (or index.vue)
    - Logo.vue
    - Navigation/
      - Navigation.vue (or index.vue)
      - someFancyLogic.js
  - Main.vue
  - Footer.vue
```

While front-end frameworks may differ in their component implementation, the general concept remains the same. Vue and Svelte use Single File Components, while React uses HTML render functions in JS (JSX) and various CSS-in-JS patterns to achieve similar results.

## Exercise: Essential Vue Concepts (3 hours)

Follow this step-by-step [Vue 3 tutorial](https://vuejs.org/tutorial/) to familiarize yourself with the core concepts of Vue 3. Ensure that the tutorial is set to Composition API and SFC (Single File Components) mode, as this is the recommended way of writing new Vue applications.

**Note on Vue versions**

In our projects we will be using:

- Vite, which is the most popular bundler for new projects, though that was not the case ~1 year ago
- Vue 3, which is the latest version of Vue
- Composition API, which is the recommended way of writing new Vue applications (as opposed to the class-like Options API)
- script setup syntax, which is a new syntax for the Composition API

// MUST: updated
Most resources we provide will be up-to-date, but some resources might be included some references to the older ways of doing things, yet they provided a good explanation of the underlying concepts so we have decided to include them. So some resources are selected purely for teaching a particular concept and not necessarily as an exact-match step-by-step guide on how to use them in your projects.

This is a common problem in a fast-evolving field such as web development. Any framework that has been around for more than ~5 years will have some deprecated legacy features and thus outdated resources.

// MUST: updated
Given how rapidly web development evolves, it is important to learn how to find the most up-to-date resources. In our case, you can include additional hints in your search query, such as "Vue 3", "Vite" and "Composition API". When using AI assistance, try to include similar hints in your prompts.

## Exercise: Initialize a Vue Project Using Vite (2 hours)

Next, we'll return to our code editor and create a minimal Vue project using Vite. Execute the following command:

```bash
npm init vite@latest
```

This time, choose Vue and its JavaScript template without any additional features. Run the `npm install` and `npm run dev` commands to ensure that the project is functioning correctly.

Compare the newly created Vue project with the vanilla JavaScript project:

- How does the file structure of the Vue project compare with that of the vanilla JavaScript project we have previously worked on?
- Open the Vue `main.js` and `App.vue` files and compare them with the vanilla JavaScript `main.js` file. What structural differences can you identify?

Spend some time familiarizing yourself with this minimal Vue project. Use what you learned in the previous exercise to understand how various files are being imported and utilized. Don't worry about understanding the underlying mechanics of these new concepts or feeling comfortable using them just yet. Instead, focus on familiarizing yourself with the syntax and the general structure of the project and each component. We will be revisiting and honing these skills for the remainder of the sprint.

**Mini exercise**: Just like in the vanilla JS exercises, try implementing the following modifications:

- Create three buttons: increment (+1), decrement (-1), and reset (0).
- At first, attempt to implement these counter changes as one-liners inside HTML.
- Then, try implementing counter changes through a new function `setCount`.

**Mini exercise 2**: While in general, we could leave the counter logic inside our component and for a small component it would be the right thing to do, we will try out some refactoring to get a feel for how we can organize our code if we had a larger component.

Let's pretend that our component grows, possibly by including many refs for various different design elements. We might want to move the counter's logic from the component into a separate file to keep things organized.

- Create a new file `counter.js` just besides your component. This will be used to encapsulate everything we need to have a counter.
- Move the `count` variable and the `setCount` function to the new `counter.js` file. Export both of them.
- Import the `count` and `setCount` into your component.
- Ensure your component still works as expected.

Now we have encapsulated our counter **state** (the `count` variable) and **behavior** (the `setCount` function) into its own file.

**State** in rough terms is just a fancy word for the data that can change over time. So a constant such as number pi (π) would not be generally referred to as state, but a number that can change over time, such as the number of unread messages in your inbox, would be. In Vue, we would always use the `ref` (or `reactive`) function to create state, which allows Vue to track its changes over time and update the UI accordingly.

**Note:** why aren't we using classes? Classes and class-like objects used to be the standard way of writing components for most web frameworks, including Vue and React. However, in the last few years, the front-end community has been moving away from classes and towards functions. This is because functions require less setup code, are more flexible, easier to test and easier to compose (do you remember "Composition over Inheritance" from your Python module?).

**Mini exercise 3**:

Now our counter state lives inside its own file. This allows us to share the counter with other components. We could import it into another component and have a shared counter. This is a viable approach to having shared state. However, this is not always what we want.

Let's say you want to reuse this counter logic and have multiple independent counters. The issue is that if we reuse the same imported `count` variable, both of our counters would display the same number as they refer to the same counter state `const count = ref(0)`.

In this case, we will try making the counter logic reusable. How could we do that? We can leverage the fact that variables declared inside of a function are scoped to that function. This means that if we call the function twice, we will have two separate variables. For example:

```js
function createObject() {
  return {}
}

const obj1 = createObject()
const obj2 = createObject()

obj1 === obj2 // false
```

If we would change one object, the other would not be affected. This sounds just about what we need.

We can apply the same principle to our counter. We would then have a function that creates a new counter, which "lives" inside the scope that the function created.

// MUST: updated
We would then be able to use it in our component like so:

```js
// HelloWorld.vue
import counter from './counter.js'

/* defineProps... */

const { count, setCount } = counter()
```

Try to implement the `counter.js` file so the above code works with our counter.

When you have a solution, you can compare it with the one below.

<details>
  <summary>Solution</summary>

```js
// counter.js
import { ref } from 'vue'

export default function counter() {
  const count = ref(0)

  function setCounter(value) {
    count.value = value
  }

  return { count, setCounter }
}
```

</details>

**Mini exercise 4**: Finally, to tidy up the code and overall file structure, we can do a few more things:

1. To follow front-end conventions, we can rename the `counter` function and its file to `useCounter`. The `use` prefix indicates that this function is a **Vue composable**. Instead of simply containing logic for a counter, it is a function that creates new state and behaviour each time it is called. This is a convention that is used in Vue, React (React Hooks) and many other front-end frameworks.
2. Currently, our `useCounter` is only used by the `HelloWorld.vue` component. This is a good opportunity to **colocate** the `HelloWorld.vue` with its exclusive dependencies. Colocation does not simply means keeping relevant dependencies together, it also means separating them out from other code. We can do this by considering `HelloWorld` no longer as a single file, but as a folder. It would be in the same place where there previously was a single file. This folder would contain:

- The `HelloWorld.vue` component.
- The `useCounter.js` file for the `useCounter` function.

We import and interact only with the `HelloWorld.vue` file, while the `HelloWorld.vue` imports and interacts with other files in its own folder. To leave no doubts which file is responsible for the entire folder, some developers rename the entry-point file in every folder to `index`, for example `HelloWorld/index.vue`.

If our `useCounter.js` grows and becomes hard to manage as a single file, it also could become a folder of files where the core "exported" `useCounter` function is in the `useCounter/index.js` file and supporting functions are in other files inside the `useCounter` folder.

Try out moving the component and the counter logic into a folder.

3. (Optional) If we wanted to reuse the `useCounter` function in another component, by convention, we could create a new folder called `composables` in our `src` folder which would contain all of our shared composables. Though, do not try to eagerly make everything reusable before you have a clear need for it. We should stick to colocation for as long as possible and move things out only when we need to reuse them.

## Exercise: Create a Vue Project with Linting and Formatting (2 hours)

In this exercise, we will set up a new Vue 3 project that we'll use for subsequent exercises.

First, navigate to your shared projects folder in your terminal. Run the following command, just as you did in the previous exercise:

```bash
npm init vite@latest
```

When prompted, select `Vue` and then `Customize with create-vue`. We recommend choosing the following options:

- TypeScript: `No`
- JSX: `No`
- Vue Router: `No`
- Pinia state management: `No`
- Vitest unit testing: `No`
- End-to-End testing: `No`
- ESLint: **`Yes`**
- Prettier: **`Yes`**

Once the project is created, review the files and folders and compare them with the minimal Vue project you created in the previous exercise. Identify the differences and the new files and folders.

Next, we'll set up linting and formatting for our Vue project, using what you've learned from the previous exercises.

- **Install ESLint ruleset:** Install the `@vue/eslint-config-airbnb` package as a dev dependency.
- **Update your ESLint configuration:** Add the installed package to the `extends` array in the `.eslintrc.cjs` file, as specified in [the package's documentation](https://www.npmjs.com/package/@vue/eslint-config-airbnb). Ensure the `prettier` config remains at the end of the array, so it can disable formatting rules that Prettier will handle.
- **Update your Prettier configuration:** Modify the `.prettierrc.json` file according to your preference. You can use the same configuration as in the previous exercise.
- **Install stylelint ruleset:** Run `npm init stylelint` and `npm install --save-dev postcss-html stylelint-config-standard-vue` to install the styling rules for Vue files.
- **Update your stylelint configuration:** The `extends` array in the `.stylelintrc.json` file should include `stylelint-config-standard-vue` and `stylelint-config-standard`.
- **Update your project editor settings:** If you haven't configured your editor to automatically format your code upon saving, you can do so now by following the instructions in the project's `.vscode/settings.json` file provided in the previous sprint part.
- **Add style linting to your package scripts:** Add `"lint:style": "npx stylelint \"**/*.(s?css|vue)\"",` to the `scripts` object in your `package.json` file. This will allow you to run `npm run lint:style` to lint all of your styles in CSS and Vue files.

Once all these steps are completed, run the following commands:

- `npm run format` to reformat all of your code according to your Prettier configuration.
- `npm run lint` to check for any errors. Fix any errors that are found.
- `npm run lint:style` to check for any errors in your styles. There might be quite a few. Fix them all. If you have configured your editor to format your code on save, most reported errors should be automatically fixed when you save the file.

# Directions for further research (1 hour):

Here are some possible directions for further research:

- Look through your previous projects and try to identify which parts could be split up into components.
- Could you apply the concept of colocation to your previous JavaScript assignment?
- What does `scoped` mean in the context of Vue styles?
