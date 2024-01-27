Part 4: NASA APOD App with Vue Router

# Task Description

This hands-on exercise will introduce you to the concept of client-side page routing, which will enable you to build an application with multiple views (pages).

## Vue Router

To allow our application to have multiple pages, we will use the [Vue Router](https://router.vuejs.org/) package. It deeply integrates with Vue.js core to make building Single Page Applications with Vue.js a breeze.

This will introduce:

- a new `views` folder in our project which contains the page-level components
- a new `router` folder in our project which links browser URL paths to these page-level components
- two new components: `<RouterView>` to display the current page component and `<RouterLink>` which is used to navigate between them

All of these new elements will be automatically included in our project when we initialize it with Vite.

## Project Description

We will build a simple application that displays the NASA Astronomy Picture of the Day (APOD) from the [NASA Open API](https://api.nasa.gov/). The application will have two pages: a Homepage that displays the APOD for a selected day and a Favorites page that displays all the APOD images that the user has marked as favorites.

## Requirements

1. Homepage that displays the date picker and an APOD of the selected day using the NASA Open API.
2. The application should display the NASA-provided information about each APOD image.
3. The user should have the ability to add and remove an APOD image from their personal favorites.
4. The application should store the user's favorite images in the local storage.
5. The application should have a Favorites gallery page that displays all the APOD images that the user has marked as favorites.
6. User should be able to navigate to the Favorites page using a link in the navigation bar. The link should not cause a page refresh.
7. The application should work on mobile, tablet and desktop devices.
8. The application should handle and display errors when fetching an APOD image (such as failed to fetch, no API key, etc.).
9. The application should use a `.env.local` file to store the API key.

You can assume that this application will be run using `npm run dev`, and the user will provide their own API key in their own `.env.local` file.

## Recommended Step-by-Step Approach

1. Initialize the app with `npm init vite@latest`, just like your boilerplate, but this time selects to add a routing with Vue Router, ESLint, and Prettier.
2. Copy your ESLint, Prettier and Stylelint configurations from your boilerplate. Install missing development dependencies (`stylelint stylelint-config-standard @vue/eslint-config-airbnb postcss-html stylelint-config-standard-vue`) for code quality enforcement.
3. Delete all files in the `components` folder and make sure your `App` and page-level components in the `views` folder no longer contain any unnecessary content or broken `import` statements.
4. [Sign up for a NASA Open API key](https://api.nasa.gov/) and add the API key to an `.env.local` file in the project root folder.
5. In the homepage view, fetch the APOD data from the NASA Open API, and display it and its information on the Homepage.
6. Add a date picker to the Homepage that allows the user to select a date for which they want to see the APOD image.
7. Implement a feature allowing users to add and remove the APOD image from their favorites.
8. Store the user's favorite images in the local storage. Make sure that the favorites persist when the user refreshes the page.
9. Display the user's favorite images from the local storage on the Favorites page. Add a Favorites page in the `router/index.js` file.
10. Implement error handling for failed fetch attempts (for example, due to an incorrect API key or no internet connection).
11. Design and style your application.

## Hints

- Do not throw out navigation and routing code from the generated boilerplate. This can be adapted to your needs.
- Check out the [Fetching Data Vue example](https://vuejs.org/examples/#fetching-data)
- You can move out shared state and logic into separate modules and import them into your components.
- Try to detach the error handling logic from the component that displays the error message. This might involve an additional file for sharing the error state and logic (such as, error and setError).

## Bonus challenges

1. Add a loading indicator when the application fetches data from the NASA Open API.
2. Add transition and animation effects using native CSS or Vue features when users add images to their favorites or browse images.
3. Add keyboard bindings to see an image for the previous/next day and favoriting/unfavoriting an image.
4. Allow visitors to see a page with an APOD image by visiting a path for that particular date, such as `/image/2023-07-23`.
5. Use storage events to ensure that the Favorites page is updated when the user adds or removes an image from their favorites in another tab.

## Approach to Solving the Task

Follow this approach to tackle the hands-on exercise:

- Spend up to 10 hours attempting to solve the task on your own.
- If you struggle during the first hours and find it too difficult, try seeking help from your peers or JTLs for an additional 10 hours. Spend half of this time working with someone else, whether it's a study buddy, a peer who has completed the exercise, or a JTL in an open session.
- If you are still struggling, take a look at the provided solution and walk through it step-by-step. Spend up to 10 hours on the walkthrough.
- Try to go back to your own solution once the provided solution clears up any obstacles you encountered.
- We recommend checking the final provided solution, even if you have completed the task on your own, to compare approaches and potentially learn new techniques.
