## 1. Initialize the app

Initialize the app with `npm init vite@latest`, just like our boilerplate, but this time select to add a routing with Vue Router.

```bash
npm init vite@latest

✔ Project name: … hands-on-solution
✔ Select a framework: › Vue
✔ Select a variant: › Customize with create-vue ↗
✔ Add TypeScript? … No
✔ Add JSX Support? … No
✔ Add Vue Router for Single Page Application development? … Yes
✔ Add Pinia for state management? … No
✔ Add Vitest for Unit Testing? … No
✔ Add an End-to-End Testing Solution? › No
✔ Add ESLint for code quality? … Yes
✔ Add Prettier for code formatting? … Yes
```

```bash
cd hands-on-solution
npm install
npm run dev
```

Alright, it works; let's set up our ESLint, Prettier, and Stylelint configurations. Do not forget that **Stylelint is optional**, so you can skip it if you find configuration steps too complex. Nevertheless, we will include it in our setup for demonstration purposes.

## 2. Setup ESLint, Prettier and Stylelint

Copy your ESLint, Prettier, and Stylelint configurations from your boilerplate.

```
.eslintrc.cjs
.stylelintrc.json
.prettierrc.json
```

Install missing development dependencies.

```bash
npm install --save-dev stylelint stylelint-config-standard @vue/eslint-config-airbnb postcss-html stylelint-config-standard-vue
```

## 3. Clean up the project

We can clean up our `src` directory by throwing out all the files in the `components` folder and cleaning up the `views/AboutView.vue` and `views/HomeView.vue` files to have nothing more than a "Hello World!". Finally, we review the `App.vue` file to ensure it has no unnecessary content or broken `import` statements.

## 4. Add a NASA Open API key

We can now [sign up for a NASA Open API key](https://api.nasa.gov/) and add the API key to an `.env` file in the project root folder.

Let's search online for "vue 3 vite env file". This should lead us to [this Vite documentation page](https://vitejs.dev/guide/env-and-mode.html).

Now, let's add our API key to the `.env.local` file. We use `.env.local` instead of `.env` because we do not want to commit our API key to the repository. It is not committed because there is a `.gitignore` file in the project root folder that specifies all `*.local` files to be ignored.

By convention, we prefix our environment variables in uppercase.

Our `.env.local` could look something like this:

```env
NASA_API_KEY=1234567890
```

## 5. Fetch and display the APOD data from the NASA Open API

In the `HomeView.vue`, we can perform a `fetch` request to the NASA Open API using the `NASA_API_KEY` environment variable. The same [Vite Env Variables documentation page](https://vitejs.dev/guide/env-and-mode.html) also shows us how to access the environment variables in our code.

```vue
<script setup>
const apiKey = import.meta.env.NASA_API_KEY

const request = await fetch(
  `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`
)

const data = await request.json()

console.log(data)
</script>

<template>Hello world!</template>
```

Interestingly, we get an error in the console that we have a missing API key. If we log it, it is `undefined`. So there is an issue between our `.env.local` file and our code.

If we look at the [Vite Env Variables documentation page](https://vitejs.dev/guide/env-and-mode.html) again, we can see that we need to prefix our environment variables with `VITE_` in order to access them in our code.

**Note.** **Everything you add in the front-end application is public.** In any production environment, we would not expose our API key in the client-side code. Instead, we would have a server-side application that would make the API request on behalf of the client. But for a learning exercise, this is fine. We can add a `TODO: make API key secret` comment to remind us to do this in the future.

Let's change the `.env.local` file to use `VITE_NASA_API_KEY` instead of `NASA_API_KEY`.

```env
VITE_NASA_API_KEY=1234567890
```

Now, we can see the APOD data in our project.

```js
const apiKey = import.meta.env.VITE_NASA_API_KEY

const request = await fetch(
  `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`
)

const data = await request.json()

console.log(data)
```

Our page might get an error. If we refresh it, we can see the APOD data in the console.

If we want to use it in our template, we would need to wrap it inside a `ref`. Also, let's rename it to `apod` instead of `data` to make it more descriptive.

```vue
<script setup>
import { ref } from 'vue'

const apiKey = import.meta.env.VITE_NASA_API_KEY
const apod = ref(null)

const request = await fetch(
  `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`
)

apod.value = await request.json()
</script>

<template>
  <main>{{ apod }}</main>
</template>
```

OK, we do not see the `apod` in our template. Is it because it is an object? After some experimenting, we found out that this issue arises because we are our component is being rendered before the `apod` is populated with data. We can fix this by importing a lifecycle hook called `unmounted` from Vue and using it to fetch the data.

This should not only fix this issue but also the issue that required us to reload the page to log the data.

```vue
<script setup>
import { ref, onMounted } from 'vue'

const apiKey = import.meta.env.VITE_NASA_API_KEY
const apod = ref(null)

onMounted(async () => {
  const request = await fetch(
    `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`
  )

  apod.value = await request.json()
})
</script>

<template>
  <main>{{ apod }}</main>
</template>
```

Great, this works!

We should now display it as an image with some information. We can use some semantic HTML tags to do this.

```html
<template>
  <main>
    <div class="apod">
      <div class="image">
        <img :src="apod.url" :alt="apod.title" />
      </div>
      <div class="details">
        <strong class="title">{{ apod.title }}</strong>
        <time :datetime="apod.date">{{ apod.date }}</time>
        <p class="explanation">{{ apod.explanation }}</p>
      </div>
    </div>
  </main>
</template>
```

This might work if we have already loaded the page once. But if we refresh the page, we get an error `Cannot read properties of null (reading 'url')`. This is because we are trying to access the `URL` property of `apod` before it has been populated with data. To fix this, we can use a `v-if` directive to only render the `img` element if `apod` is not `null`.

```html
<div v-if="apod" class="apod">
  <!-- content -->
</div>
```

This works because before our `apod` is populated with data, it is `null`, and `null` is a falsy value in JavaScript. So the `v-if` directive will not render the `div` element until `apod` is populated with data.

## 6. Add a date picker

Instead of using the current date, we can allow the user to select a date for which they want to see the APOD image. First, let's prepare our request to accept a date as a query parameter.

```js
//Create a new Date reference
const date = ref(new Date())

onMounted(async () => {
  // the API requires the date in ISO format (YYYY-MM-DD)
  // Date has a built-in method to convert it to ISO format
  // but it provides the time as well, so we need to slice it off
  const dateIso = date.value.toISOString().slice(0, 10)
  const request = await fetch(
    `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${dateIso}`
  )

  apod.value = await request.json()
})
```

Now, let's add a date picker to our template. We can use the `v-model` directive to bind the `date` to the `input` element. We can display the date right below the `input` element to see that it is working.

```html
<div class="date-picker">
  <label for="date">Date</label>
  <input id="date" type="date" v-model="date" />
  {{ date }}
</div>
```

While this works, we still need to pass it to the API request. Given that, we want to make a new request every time the date changes, we can use a `watch` lifecycle hook instead of `mounted`.

```js
watch(date, async () => {
  const dateIso = date.value.toISOString().slice(0, 10)
  const request = await fetch(
    `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${dateIso}`
  )

  apod.value = await request.json()
})
```

There are 2 problems with this.

First, on the initial load, the `watch` hook will not be triggered. If we look through [Vue Watchers documentation](https://vuejs.org/guide/essentials/watchers.html), we will find that we can pass an options object as the second argument in the `watch` function with an `immediate: true` option.

Second, our date seems to break. That is because our date picker input returns a string, but we rely on it being a `Date` object. There are multiple ways of how to address this:

- do not use a Date object
- use a computed property to convert the string to a Date object
- intercept the date picker value setter and convert its value to a Date object

Given that we will always require an ISO string, we can just ditch the Date object and use a string instead.

```js
const date = ref(new Date().toISOString().slice(0, 10))

watch(
  date,
  async () => {
    const request = await fetch(
      `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date.value}`
    )

    apod.value = await request.json()
  },
  { immediate: true }
)
```

**Note:** You should use `watch` when you want to perform an asynchronous operation, or you want to change state beyond your reactive properties. If you just want to change a reactive property based on another property, you should use a `computed` property instead.

## 7. Favorite images

This feature seems to require:

1. a way to mark an image as favorite
2. a way to check if an image is one of the favorites
3. a way to store the favorites

Since we can have multiple favorites, we can use an array to store them.

```js
const favorites = ref([])

function isFavorite(apod) {
  return favorites.value.includes(apod)
}

function toggleFavorite(apod) {
  if (isFavorite(apod)) {
    favorites.value = favorites.value.splice(favorites.value.indexOf(apod), 1)
  } else {
    favorites.value = favorites.value.push(apod)
  }
}
```

As we will want to make visual changes when our favorites change, we are wrapping our favorites in a `ref` to allow Vue to track changes to it.

Our file seems to be getting a bit crowded, and if we think about it, we will need to access our favorites from multiple pages. Let's move all these functions to a separate file, `favorites.js`.

```js
const favorites = ref([])

export function isFavorite(apod) {
  /* ... */
}

export function toggleFavorite(apod) {
  /* ... */
}
```

We are not exporting the `favorites` array because we do not want to allow other files to interact with it directly. This is similar to how we would not `class` "consumers" to interact with some of its properties directly as that would require each consumer (file which imports it) to know about the implementation details, such as the fact that `favorites` is implemented as an `Array`. We might decide to use a different data structure in the future, such as a `Set`, and that type of change should not require us to change all the files that interact with it.

Now, we can import these functions in our `HomeView.vue` file and use them to mark an image as a favorite.

```js
import { isFavorite, toggleFavorite } from './favorites'
```

Though, given this describes a shared state, we should consider moving it outside of the `views` folder. By convention, we can create a new `store` folder and move the `favorites.js` file there.

Now our imports would look like this:

```js
import { isFavorite, toggleFavorite } from '../store/favorites'
```

**Note:** If the favorites would be used only on a single page, it would be preferable to keep it very close to the page-level component. Preferably converting our `HomeView.vue` file to a folder which contains the view `index.vue` (or `HomeView.vue`) file and the `favorites.js` file.

Now, we can add some rudimentary buttons that allow us to mark an image as a favorite. We could look up some SVG icons online or a Vue package that provides them, but prototyping, we can just use an emoji.

```html
<div class="image">
  <button class="favorite" type="button">❤️</button>
  <img :src="apod.url" :alt="apod.title" />
</div>
```

I have added the `favorite` element inside of an image as I would like to add it to a corner of an image, but this is a design decision. We could also add it outside of the image.

This element should:

- have different styling based on whether the image is a favorite or not
- toggle the favorite status when clicked

```html
<div class="image">
  <button
    class="favorite"
    type="button"
    :class="{ active: isFavorite(apod) }"
    @click="toggleFavorite(apod)"
  >
    ❤️
  </button>
  <img :src="apod.url" :alt="apod.title" />
</div>
```

For this, I have decided to add an `active` class to the button when the image is a favorite. This allows us to style it differently.

If we add some styling to the `active` class, we can test it out.

```css
.favorite {
  display: block;
  font-size: 2rem;
  opacity: 0.6;
}

.favorite.active {
  opacity: 1;
}
```

Now, our button changes its opacity based on whether the image is a favorite or not.

## 8. Persist favorites in local storage

Now our `favorites` are always set to an empty array when we refresh the page. But we want to store them in the local storage. But just storing them in the local storage is not enough. We also need to retrieve them from the local storage when the page loads. If we find something in `localStorage`, we should use that. Otherwise, we should use an empty array, just like we do now.

We can choose whether we are storing entire `apod` objects or just their `date` properties. If we would expect to have a lot of favorites or the records behind the dates could change over time, it could be preferable to store just the `date` properties and then load the `apod` objects from the API when we need them. But in our case, we can save a lot of time on API requests by storing the entire `apod` objects.

```js
import { ref, watch } from 'vue'

const FAVORITES_KEY = 'favorites'
const favorites = ref(getStoredFavorites())

function getStoredFavorites() {
  const favoritesStored = localStorage.getItem(FAVORITES_KEY)

  return favoritesStored ? JSON.parse(favoritesStored) : []
}

watch(favorites, favoritesUpdated => {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favoritesUpdated))
})

export function isFavorite(apod) {
  /* ... */
}

export function toggleFavorite(apod) {
  /* ... */
}
```

We quickly noticed that the `watch` function does not get triggered when we add or remove an item from the `favorites` array.

After some digging, we found out that this is because `ref` mutations do not trigger `watch` functions. We can address this in a few ways:

- use `reactive` instead of `ref`
- use a deep watcher with `{ deep: true }` option
- use reassignment instead of a value mutation

All of these ways have their own pros and cons. The first two options would require Vue to track the reactivity of all properties of every item inside of the `favorites` array. This would become a performance issue if we had a lot of items in the array. The third option would introduce additional array allocations in memory, but this is a lot "cheaper" performance-wise than tracking the reactivity of all properties of every item inside of the `favorites` array.

Thus, we will rewrite our `toggleFavorite` function to use reassignment instead of an Array mutation.

```js
export function toggleFavorite(apod) {
  if (isFavorite(apod)) {
    favorites.value = favorites.value.filter(
      favorite => favorite.date !== apod.date
    )
  } else {
    favorites.value = [...favorites.value, apod]
  }
}
```

Great, this adds and removes items from the `favorites` array and stores them in the local storage.

But if we refresh the page, our heart emoji does not have the correct class anymore.

If we check our Local Storage in the Application tab in the browser's Developer Tools, the record is clearly in the `localStorage`. But it does not seem to satisfy our `favorite` function. It is a very simple function, so we might be able to spot the issue right away.

```js
export function isFavorite(apod) {
  return favorites.value.includes(apod)
}
```

How does `includes` work? It uses strict equality to compare the items.

The issue is that we are comparing objects. And objects are compared by reference. So even though an object with the same properties as our current `apod` object exists in the `favorites` array, it is technically not the same object. This explains why our application works if we do not refresh the page - the `apod` object is the same object as the one in the `favorites` array. But if we refresh the page, we get a new object from the `localStorage`.

Thus, we need to compare the objects by some unique property instead of their object reference. In our case, as every image has a 1:1 relationship with the date - every date has a single image, we can use the `date` property.

But how should we perform the comparison? We can not use `includes` anymore as it simply accepts an object. But we can use higher-order functions, such as `some`.

```js
export function isFavorite(apod) {
  return favorites.value.some(favorite => favorite.date === apod.date)
}
```

**Note:** If we were processing large amounts of data (10,000s of items), we would need to consider the performance of our solution. We could introduce some intermediate data structure, such as a `Set` of dates, to speed up the lookup. Technically, we could already use a `Set` in the current solution, and you are welcome to try it out, but to keep matters simple, we will stick to an Array.

## 9. Favorites page

Now is the time to familiarize ourselves with the Vue Router. Up to this point, we have ignored the floating navigation bar in our application. It contains a link to the About page, which we will not need. But we can use it as a template for our Favorites page.

Let's rename it and clean it up so the `src/views/FavoritesView.vue` file looks like this:

```html
<template>
  <div>
    <h1>Favorites</h1>
    <!-- a list of favorites -->
  </div>
</template>
```

Now, we should see an error in the terminal that we have a missing route as we have renamed the already existing route. Let's fix this by updating the `src/router/index.js` file.

```js
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/favorites',
      name: 'favorites',
      // route level code-splitting
      //This generates a separate chunk for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/FavoritesView.vue'),
    },
  ],
})

export default router
```

This file defines two things:

- the way we want to handle the browser history, in this situation, we specify the `createWebHistory` function, which uses the [HTML5 History API](https://developer.mozilla.org/en-US/docs/Web/API/History_API) to manipulate the browser history, so it looks like we are navigating between pages, even though we are not
- the list of routes

Our `HomeView` is directly imported. But why is our `FavoritesView` imported through a function? Well, we are showing off a bit of Vue Router's functionality here. We are using **[code splitting](https://vitejs.dev/guide/features.html#async-chunk-loading-optimization)** to split our application into multiple code chunks. Now, only the `HomeView` is loaded in the main JavaScript code chunk. The `FavoritesView` is loaded only when the user navigates to the `/favorites` path. This is a performance optimization, as the user does not need to download the code for the `FavoritesView` until they actually want to see it. Vite automatically handles this for us, so we do not need to worry about it. For a tiny application like ours, this is not necessary, but for larger applications, this can significantly improve the initial load time.

Now we just need to rename some links in the `src/App.vue` file to fix our navigation.

```html
<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/favorites">Favorites</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>
```

**Note:** we are using the `<RouterLink>` component instead of the `<a>` element to navigate between pages. This is because the `<a>` element would cause a full page reload, which is not what we want. The `<RouterLink>` component comes with the Vue Router package, and it automatically displays the correct URL in the browser's address bar and loads the correct page without a full page reload.

**Pro tip:** When our routes become dynamic, we should prefer using named routes, such as `<RouterLink to="{ name: 'favorites' }">Favorites</RouterLink>`. This allows us to change the URL of the route without having to update all the links in our application. It also allows us to pass additional parameters to the route, such as `<RouterLink :to="{ name: 'image', params: { date: apod.date } }">` that will resolve to `/image/2023-07-23` for example.

Great, now we can navigate between the pages. But our Favorites page is empty. Let's fix this by displaying the favorites.

```html
<template>
  <main>
    <h1>Favorites</h1>
    ...
  </main></template
>
```

Wait a minute 🤔. We already have some code that displays the favorites. We can just copy it over, right?

Well, this is a good time to consider what should be shared between the pages and what should be page-specific. We can do one of the following:

A. Take the image code from the `HomeView`, **move it to a component, and use it on both pages**.

This is a good approach if we want our favorites to look the same as the images on the homepage, AND we expect both pages to have the same image styling in the future. While this follows the rule of thumb **"Don't Repeat Yourself" (DRY)**, we should not blindly follow it every opportunity we can. After all, the homepage and the favorites view are not necessarily meant to look the same. We might want to have a different layout, different image size, different image styling, etc. This could be somewhat resolved by using [container queries](https://caniuse.com/?search=container%20query), but their browser support is still not overwhelming (we would like 95%+). We could also use a separate CSS class for styling elements depending on which page they are displayed, but that is not necessarily a good idea either. And if we ever decide to change the component logic based on the page they are displayed on, we would need to do some sort of prop passing, or even worse - [prop drilling](https://blog.sathyamolagoda.me/avoid-props-drilling) or some sort of [context injection](https://vuejs.org/guide/components/provide-inject.html). Every solution would introduce additional complexity to our application.

B. Use a **separate component just for the FavoritesView**.

This is a good approach if we expect the images on the favorites page to look and possibly act slightly differently. In that case, we likely have some code duplication, but it can be worth it if it empowers us to develop each component independently. On the other hand, this approach introduces additional complexity as now we might need to deal with some shared styling and logic across multiple components.

This is a problem front-end developers have to address daily. There is no one-size-fits-all solution. It is up to us to decide which approach is the best for our particular situation. In this case, **we will go with the second approach**, but whether it is the best approach depends entirely on how you (or your team/shareholders) model that particular problem.

We will need to create a new component. **Where should we put it**? In a small project, we are quite flexible to do it however we want. But for learning purposes, we should consider only one of the following options:

- use the `components` folder in the `src` folder
- colocate it with the `FavoritesView` in the `src/views` folder

The first option is preferable if we expect to use the component in multiple places. The second option is preferable if we expect to use the component only in the `FavoritesView`. In our case, we will go with the second option.

Let's update our views structure to look like this:

```
- views/
  - HomeView.vue
  - FavoritesView
    - FavoritesView.vue
    - FavoriteImage.vue
```

This would require us to update our `src/router/index.js` file to point to the `FavoritesView.vue`:

```js
{
  path: '/favorites',
  name: 'favorites',
  component: () => import('../views/FavoritesView/FavoritesView.vue'),
}
```

Now, let's build our Favorites page.

```vue
<script setup>
import FavoriteImage from './FavoriteImage.vue'
</script>

<template>
  <main>
    <h1>Favorites</h1>
    <FavoriteImage
      v-for="apod in favoritesList"
      :key="apod.date"
      :apod="apod"
    />
  </main>
</template>
```

This creates a list of `FavoriteImage` components. We can pass the `apod` object to the component as a prop and use its date as a unique key.

**Note:** We could use the name `favorite` instead of `apod` for the prop, but given that we are using the exactly same data structure for displaying favorites as displaying APODs on the homepage, we can communicate that by using the same name for the prop.

We still have a few things missing:

- we need to get the list of favorites
- we need to create the `FavoriteImage` component

First, let's get the list of favorites. We can import the `favorites` array from the `../../store/favorites.js` file.

The issue is we are not exporting our favorites list from the `favorites.js` file. We are only exporting the `isFavorite` and `toggleFavorite` functions. We could export the `favorites` array as well, and that would work just fine, but that would allow other files to interact with it directly, which is not exactly what we want. We would like that **if there is a bug with favorites, we only need to look at the `favorites.js`** file. But that requires the `favorites.js` to be the only one that interacts with the `favorites` array.

Luckily, Vue provides a `read-only` function that will create a read-only proxy of the `favorites` array. This means that we can provide the array to other files, and we will know that they will not be able to mutate it directly. Neat.

```js
// favorites.js
//Don't forget to add readonly to the vue import statement
export const favoritesList = readonly(favorites)
```

And for the `FavoriteImage` component, we can create a new file `src/views/FavoritesView/FavoriteImage.vue` with the following content:

```vue
<script setup>
import { isFavorite, toggleFavorite } from '../../store/favorites'

defineProps({
  apod: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <!-- For now, we are reusing the same layout from the HomeView -->
</template>
```

The `defineProps` function allows us to accept the `apod` property passed to the component.

Alright, this should work. We can see the favorites in the Favorites page. While we are at it, let's add an empty state to the Favorites page.

```vue
<template>
  <main>
    <h1>Favorites</h1>
    <FavoriteImage
      v-for="apod in favoritesList"
      :key="apod.date"
      :apod="apod"
    />
    <div v-if="!favoritesList.length">You have no favorites yet.</div>
  </main>
</template>
```

## 10. Error handling

Right now, our application has no error handling. We should cover the most likely causes of errors, such as:

- the API request failing
- `JSON.parse`/`stringify` failing
- `localStorage` failing

You might have noticed that we are primarily focused on covering the external dependencies. This is because these are the most likely to fail. In the future, you will be introduced to the concept of front-end testing, which will allow us to be more confident in our code. But no matter how much we test our code, we can never be sure that the external dependencies that interact with outside services or browser-level APIs will not fail. Thus, we should always consider how to handle these failures.

Let's start with the API request in the `HomeView.vue`:

```js
watch(
  date,
  async () => {
    try {
      const request = await fetch(
        `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date.value}`
      )

      apod.value = await request.json()
    } catch (error) {
      /* what should we do with this? */
    }
  },
  { immediate: true }
)
```

How should we handle this error? `console.error`? Well, our user is not expected to open their console to check for errors. If a website you visited on your mobile phone would not work as intended, would you try to enable the development mode in your phone, connect it to your computer, and check the console? Probably not. You would just leave the website and possibly never come back. Thus, we should handle this error in a way that is informative to the user.

So should we do an alert? Well, alerts are annoying. So should we display it in an HTML element? Probably. But our decision on how the errors are displayed should not be made here. We might decide to change how we handle our errors in the future:

- we could decide to display them in a modal
- we could decide to attempt to retry the request
- we could notify our backend about the error
- we could use an external service, such as Sentry or Bugsnag, to track the errors

We will be catching errors in at least a few places, and we would not like to update every single one of them if we decide to change how we handle errors. After all, most likely, we want to use a unified way of handling errors across our application.

Thus we should separate the error-handling logic from the error-handling presentation. Given it will be used across multiple files, we should create a separate file for it that will be imported in the files that need it. This looks a lot like our `favorites.js` file. We can create a `src/store/error.js` file with the following content:

```js
import { readonly, ref } from 'vue'

const error = ref(null)

export const errorCurrent = readonly(error)

export function setError(errorObject) {
  error.value = errorObject
}
```

Just like the last time, we have our state `error`, a way how to access it without modifying it directly, and a separate function that allows us to modify it.

Now, we can import this file in our `HomeView.vue` file and use it to display the error.

```js
try {
  const request = await fetch(/*... */)

  apod.value = await request.json()
} catch (error) {
  setError(
    new Error('Could not fetch the picture of the day. Please try again.', {
      cause: error,
    })
  )
}
```

Here we are also introducing a new concept - **error chaining**. We are creating a new `Error` object and passing the original error as the [cause property](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/cause). This allows us to present a user-friendly error message while preserving the original error for debugging and potential reporting purposes.

We also can add a different way of handling errors for `getStoredFavorites`.

```js
function getStoredFavorites() {
  try {
    const favoritesStored = localStorage.getItem(FAVORITES_KEY)

    return favoritesStored ? JSON.parse(favoritesStored) : []
  } catch (error) {
    return []
  }
}
```

In this situation, getting an error from `localStorage` or `JSON.parse` is not something we would expect. It could only happen in extremely rare situations, such as the user having disabled `localStorage` or a very low-level browser bug. In these situations, we might not want our application to crash. Thus, we reset the favorites to an empty array.

**Note:** In practice, we still might want to report these errors to our backend or an external service and possibly inform the user that their local data got corrupted and was reset.

Also, just like in the localStorage.getItem is wrapped in a try-catch block, we should wrap the `localStorage.setItem` in a try-catch block as well, but the code is quite rudimentary, so we will skip it here.

To **display our errors**, we can create a new component. We would like to have this behavior for every page in our application, so it can be used in the `src/App.vue` file. Given it is an App-level component, we can create it in the `src/components` folder.

We would like to:

- display the error message
- allow the user to dismiss the error message

This is achieved with already familiar techniques, so we will not go into details here. You can check the `src/components/ErrorToast.vue` file for the implementation.

## 11. Design

To make our application look a bit nicer, we can add some styling. This time, we will not rely on any CSS frameworks, but we will write our own CSS.

It is important to note that we should try to make each component as self-contained as possible. Vue allows us to do this by using [scoped styles](https://dev.to/cooty/the-skinny-on-css-in-vue-single-file-components-29de). This means that the styles defined in the `<style>` tag will only apply to the elements in the template of the component. This allows us to not think too much about the names of the classes we use in our components, as they will not clash with the classes used in other components. This gets slightly more complicated if we introduce slots, but we will cross that bridge when we get there.

At this point, we can some styling to our components. You can check each component for the CSS rules. The provided styling and UX are nothing to write home about as the focus of this tutorial is on the Vue concepts.

At the very end, a few extra small refinements were added:

- `watchEffect` instead of `watch` as it matches what we need
- `FavoriteButton` component for the heart icon
- a JSDoc for `getStoredFavorites` to get better type inference, even if it's JS
- a few small last-minute refactorings according to personal preferences
