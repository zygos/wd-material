Part 3: Single Page Applications

# Part Description

In this section, we will delve into the world of Single Page Applications (SPA) using Vue 3. We will explore the component-based architecture, the reactivity model, and Vue directives, all while building a basic application.

# Key learning topics & resources for this part

## Single Page Applications (SPAs)

A **Single Page Application** (SPA) is a web application that loads a single HTML page and dynamically updates that page based on the user's interaction with the application. SPAs depend on JavaScript to render the page content and manage user interactions.

// MUST: updated sentence:
For frameworks like Vue and React, SPAs are one of the main methods for building applications. It is primarily used for highly interactive applications that require frequent UI updates.

## Vue Documentation (2 hours)

Begin by opening the following link and spend some time exploring the **Essentials part** of the [Vue documentation](https://vuejs.org/guide/essentials/application.html). In particular:

- Template Syntax
- Reactivity Fundamentals. We would also recommend watching this short [ref and reactive comparison](https://www.youtube.com/watch?v=OaUpEyz4zxs)
- Computed Properties
- Class and Style Bindings
- Conditional Rendering
- List Rendering
- Event Handling
- Form Input Bindings
- Lifecycle Hooks - the onMounted hook, no need to memorize the lifecycle diagram
- Watchers - the `watch` function, deep watchers and eager watchers. `watchEffect`, callback flush timing and stopping the watcher is entirely optional.
- Components Basics

Try to notice how some of these new concepts are used in your previously created Vue project.

At this stage, your focus should be on gaining a broad yet shallow understanding of the Vue framework and its core concepts. This will enable you to look up necessary information and examples when needed. You will have plenty of opportunities to revisit and practice these ideas in the upcoming exercises.

Allocate your time wisely to ensure you cover all the core topics even if that means not understanding a particular concept completely. For instance, you should be aware that Vue has a `watch` family of functions that are triggered when specified variables change. However, it's not necessary at this point to understand the differences between `watch`, `watchEffect`, or `watchPostEffect`.

## Preparing a Boilerplate (0.5 hour)

We're going to create a few simple Vue applications for our hands-on exercise.

To save time on project setup, we suggest you clean up the project from the previous part and use it as a **boilerplate** for the upcoming exercises. In this context, a boilerplate refers to a standard project setup that can be used as a starting point for other projects.

Firstly, clean up your project's `src folder`:

- Remove all unnecessary files and folders from the `components` folder.
- Clear most of the content in `App.vue`.
- Remove `#app` styling in the media query from `main.css`.

Your `App.vue` should now look something like this:

```vue
<script setup></script>

<template>
  <header>
    <h1>Hello World!</h1>
  </header>

  <main>
    <!-- content here -->
  </main>
</template>

<style scoped>
header {
  text-align: center;
}
</style>
```

Make sure your project still functions correctly, displays the header, and doesn't produce any console errors.

We suggest creating other projects in one of the following ways:

- Create a new project named `vue-exercises` using the source code of the boilerplate, and then use it for all the exercises in this part.
- Create a new project for each exercise (e.g., `vue-exercise-1`, `vue-exercise-2`, etc.) and copy the contents of this boilerplate project into each of them.

## Exercise: Handling Click Events (1 hour)

**Requirements:**

- A heading that reads `Hello World!`
- A button that, when clicked, reverses the text in the heading (e.g., `Hello World!` becomes `!dlroW olleH`)
- A button that, when clicked, appends a `!` to the end of the heading text (e.g., `!dlroW olleH` becomes `!dlroW olleH!`)

<details>
<summary>Hint</summary>

```vue
<script setup>
import { ref } from 'vue'

const message = ref('...')

function reverseMessage() {
  // You can access or modify the value of a ref via
  // its .value property.
  message.value = /* ... */
}
</script>

<template>
  <!--
    Note that we don't need to use .value inside templates because
    refs are automatically "unwrapped" in templates.
  -->
  <header>
    <h1>{{ message }}</h1>
  </header>

  <main>
    <!--
      Bind to a method or function.
      The @click syntax is a shorthand for v-on:click.
    -->
    <button @click="..." type="button">Reverse Message</button>

    <!-- This can also be an inline expression statement -->
    <button @click="..." type="button">Append "!"</button>
  </main>
</template>

<style>
button {
  display: block;
  margin-bottom: 1rem;
}
</style>
```

</details>

**[Solution](https://vuejs.org/examples/#handling-input)**

We will include more exercises from the Vue examples page. We recommend that you try to solve the exercises on your own before looking at the solutions.

The provided solution also includes a link with a click handler. By default, this link will redirect you to a new page. However, this redirection is prevented with a `prevent` modifier. You can learn more about modifiers [here](https://v3.vuejs.org/guide/events.html#event-modifiers).

## Exercise: Attribute Bindings (1 hour)

**Requirements:**

- Display three short paragraphs.
- The first paragraph should have a span with a dynamic `title` attribute. This attribute will be displayed when the mouse hovers over it.
- The second paragraph should have a dynamic `red` class, which turns the text red. When the paragraph is clicked, the class should be toggled on/off. The text should initially be red.
- The third paragraph should have a dynamic `style` `color` attribute, which determines the text color. When the paragraph is clicked, the color should alternate between green and blue. The initial text color should be green.

**[Solution](https://vuejs.org/examples/#attribute-bindings)**

## Exercise: Conditionals and Loops (1.5 hours)

**Requirements:**

- Display a list of numbers, initially showing 1, 2, and 3.
- Above the list, display four buttons labeled "Toggle List", "Push Number", "Pop Number", and "Reverse List".
- The "Toggle List" button should either show or hide the list when clicked.
- The "Push Number" button should add the next sequential number to the end of the list when clicked. You can simply assume that the next number is always `list.length + 1`.
- The "Pop Number" button should remove the last number from the list when clicked.
- The "Reverse List" button should reverse the order of the numbers in the list when clicked.
- If the list is hidden and not empty, display the text "List is not empty, but hidden."
- If the list is empty, display the text "List is empty."

**[Solution](https://vuejs.org/examples/#conditionals-and-loops)**.

## Exercise: Form Bindings (1.5 hours)

**Requirements:**

- Include a text input (`<input type="text">`)
- Incorporate a checkbox
- Add a multi-checkbox
- Use radio buttons
- Include a select dropdown
- Add a multi-select dropdown (`<select multiple>`)
- Each field group should have a heading above it
- Every checkbox field should have a label
- The value of every field should be displayed below or beside it
- The multi-checkbox and multi-select dropdown should use an array for the value

**[Solution](https://vuejs.org/examples/#form-bindings)**

## Exercise: Shopping list (1 hour)

**Requirements:**

- Create an array of groceries that includes objects with `id` and `text` properties
- Display the groceries in an ordered list (`<ol>`)
- Each grocery item should have its own component that accepts the individual `grocery` object as a prop
- The grocery item component should use the `<li>` tag

[Video on Vue key attribute](https://www.youtube.com/watch?v=yg0n19SdKzs).

**[Solution](https://vuejs.org/examples/#simple-component)**

## Exercise: Markdown Editor (2 hours)

**Requirements:**

- Design a split-screen editor with a `textarea` on the left and a preview area on the right.
- The `textarea` should be editable and use a `monospace`-type font.
- The preview area should display the rendered [Markdown](https://www.markdownguide.org/getting-started/) using the `textarea` value.
- Use a `computed` property to convert the `textarea` value to Markdown.
- (Optional) Style the preview area to resemble an editable document rather than a plain `textarea`.
- (Optional) Apply [debouncing](https://medium.com/@jamischarles/what-is-debouncing-2505c0648ff1) to the `textarea` so that the preview is not computed more than once every 100ms.
- **Hint:** Install the [marked](https://www.npmjs.com/package/marked) npm package to convert Markdown to HTML.

# Directions for further research (2 hours+):

Here are some possible directions for further research:

- What is the difference between `v-if` and `v-show`? When should you use one over the other?
- Why is `key` attribute important when using `v-for`?
- How could you create multiple pages in a Vue application?
- What is a Progressive Web App (PWA)?
