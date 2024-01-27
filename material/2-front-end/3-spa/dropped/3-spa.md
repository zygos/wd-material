We will build a very simple NASA Astronomy Picture of the Day (APOD) application. The application will display the APOD for a given date. The user will be able to select a date from a calendar and the APOD for that date will be displayed.

This can be considered as a guided hands-on warm up exercise.

First of all, clean up your project:

- remove all the unnecessary files and folders in the `components` folder
- remove most of the `App.vue` contents

Now `App.vue` should look something like this:

```vue
<script setup></script>

<template>
  <header>
    <h1>NASA Astronomy Picture of the Day</h1>
  </header>

  <main>
    <!-- TODO: calendar select here -->
    <!-- TODO: image here -->
  </main>
</template>

<style scoped></style>
```

Now we will need to create a component for the calendar select. Create a new file `CalendarSelect.vue` in the `components` folder and add the following code:

---

**Note:** We generally recommend to use non-mutative patterns in Vue state management. This means that instead of mutating the state directly, prefer methods such as `map`, `filter` or JS spread notation to create a new array/object which is then assigned to the value of an existing `ref`. This is because non-mutative patterns are easier to reason about and are more transferable to other frameworks, such as React. On the other hand, mutative patterns are more performant, so you might want to use them in performance-critical situations.
