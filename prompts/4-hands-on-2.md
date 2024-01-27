Prompt:
"""
Technologies: HTML + CSS
Your goal is to recreate the provided design using the provided screenshots. It's important to note that you don't need pixel-perfect precision – just getting the layout right is already a worthy achievement!
"""

Hands-on:
"""
## Requirements

1. Recreate the provided design using HTML, CSS, and Bootstrap.
2. Implement 3 forms: search form at the very top, booking form in the middle, and a newsletter form at the bottom. Use appropriate field types.
3. Try to make the final result look good on both desktop and mobile screens.
4. Use the provided text snippets, SVG icons, and images as necessary.
5. Try to apply the provided "Montserrat" and "Dancing Script" fonts to match the fonts in the screenshot.

**Hints:**

- Try to minimize the feedback loop between your code and the browser. It's heavily recommended to install VS Code on your machine and to use an extension, such as [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) to see your changes in the browser after every change you make.
- Try sketching out each section on paper. What each section resembles? A grid? Or a more fluid layout that can be achieved with flexbox?
- Before trying to match the look of a particular element, try getting the rough layout right.
- Style the most visually significant elements first. For example, the header and the footer are the most visually significant elements on the page. Then move on to styling the less significant elements, such as the navigation bar and the booking form.
- Some elements are challenging to get right. If you've no idea how to work on a particular element - move on to other elements.
- If you have an idea, try to express it in words and search for it on Google or ask a chatbot for help. For example: "how to put an element on top of each other in CSS?"
- Preferably start with the mobile view first and then work your way up to a desktop view.
- You might need to wrap some of your elements in [Bootstrap containers](https://getbootstrap.com/docs/5.2/layout/containers/) to keep them centered.
- You don't need to have any interactive elements or any additional pages.
- You can use `input[type="date"]` for the date fields.

## Recommended Step-by-Step Approach

Step 1: Analyze the design provided in screenshots, split it into sections
Step 2: Rebuild the general page structure in HTML with `div` elements
Step 3: Place all the missing HTML elements
Step 4: Choose a layout for each section
Step 5: Add applicable Bootstrap classes (inputs, buttons, containers)
Step 6: Add the most visually significant styles
Step 7: Identify key layout and spacing problems in the design
Step 8: Test the page on different resolutions
Step 9: Element-level styling (major)
Step 10: Element-level styling (minor)

## Bonus Challenges

- Try to match the design as closely as possible.
- Assign links that scroll down to the "Destinations" section.
- Add a CSS transition to fade in some page elements once the page is opened.
- Try out using CSS variables for repeating values, such as font families and colors.
- Add basic form validation so that each form requires all of its fields to have a value before it can be submitted. Add a limit of 10 guests to the booking form.

## Approach to Solving the Task

Follow this approach to tackle the hands-on exercise:

- Spend up to 10 hours attempting to solve the task on your own.
- If you struggle during the first hours and find it too difficult, try seeking help from your peers or JTLs for an additional 10 hours. Spend half of this time working with someone else, whether it's a study buddy, a peer who has completed the exercise, or a JTL in an open session.
- When you are no longer making any progress on your own, take a look at the suggested solution and walk through it step-by-step. Expect to spend up to 10 more hours on the walkthrough while experimenting and learning from the provided solution.
- The suggested solution has been split into 10 steps. Try to go back to your own solution once the suggested solution clears up any obstacles you encountered.
- Note: It's expected that you won't be able to solve the task on your own. The suggested solution is there to help you learn, not to make you feel bad about yourself. However, the attempts that trial-and-error process on its own will help you learn a lot more than just reading the suggested solution.
- If you manage to reach a solution looking like the screenshot below on your own, you have already learned a lot!

![Page with images](https://imgur.com/4sCxQB2.png)
"""

---

Prompt:
"""
Technologies: JS + HTML + CSS
Develop a 4x4 Tic Tac Toe game using JavaScript, HTML and CSS with multiple player options.
"""

Hands-on:
"""
# Task Description

Develop a 4x4 Tic Tac Toe game using JavaScript, HTML and CSS with multiple player options.

## Requirements

1. 4x4, 4 in a row/column/diagonal to win
2. Human vs. Human (on the same machine, taking turns)
3. Display the winner (or draw)
4. Highlight the winning cells
5. Do not allow placing a symbol when the game has ended
6. Allow to restart the game by clicking a button
7. At least minimally style the game board
8. The game should work on mobile devices
9. Human vs. "AI" (random guessing)
10. AI player should make moves with a 500ms delay
11. Display who's turn it is
12. There are no external JS dependencies (no JS libraries)

How you decide to implement these features is up to you. There is a lot of room left to choose different UI and JS approaches.

## Recommended Step-by-Step Approach

1. Build a basic 3x3 game UI with HTML and CSS
2. Allow adding an X with an event listener and then add an O with to a random cell
3. Handle the end of the game
4. Implement the remaining features of the needed to play a 3x3 game
5. Upgrade the board to 4x4
6. Add a delay before AI makes a move
7. Add a Human vs Human mode
8. Split the code into modules
9. Migrate player logic into separate objects/classes
10. (Bonus) Implement player and symbol selection
11. (Bonus) Implement the remaining core features
12. (Bonus) Consider the ease of change
13. (Bonus) Improve the UX and address possible issues
14. (Bonus) Refactor the code

If you are already familiar with JavaScript, try to start off by designing the game with separate modules by thinking what type of logic you can encapsulate. This will save you some time on the bonus challenges. Since many of you are just introduced to JavaScript, we recommend starting with a simpler approach and then refactoring the code into multiple files. Later on, you will be expected to design your code with modules at an earlier stage than what is recommended here.

## Hints

- Recommended approach is structured in a way that allows you to write a working solution without thinking about design patterns and just focus on stringing JavaScript code together. Once you have a working solution, you can refactor it to use classes and modules.
- Consider debugging with [VS Code and a browser](https://www.syncfusion.com/blogs/post/javascript-debugging-with-vs-code-and-chrome.aspx).
- Try to create a minimal UI first and then add the logic. Add bells and whistles later.
- Do not use `document` apart from the your main script file, ideally only in a single function. Try passing specific DOM elements to functions instead.
- You can use `event.target.closest('.my-selector')` to find the closest parent element (including current element) matching the selector.

It is OK to struggle implementing some of the requirements. In fact, this task should expose you to some of the challenges of building a web application.

## Bonus challenges

1. The game should work with every combination of player types (Human vs. Human, Human vs. AI, AI vs. AI)
2. An additional AI player option - GPT AI using fetch
3. Allow players to choose their symbols
4. Configurable list of player symbols
5. Configurable number of consecutive symbols (X, O) required to win
6. Configurable number of players as a variable
7. Configurable board size

Configurable here means that it can be changed through a variable or a function parameter, preferrably in a configuration object or file.

For modules, try using an approach that you are less familiar with - functions with closures or classes.

The final version of the provided solution implements all of the bonus challenges.

## Approach to Solving the Task

Follow this approach to tackle the hands-on exercise:

- Spend up to 10 hours attempting to solve the task on your own.
- If you struggle during the first hours and find it too difficult, try seeking help from your peers or JTLs for an additional 10 hours. Spend half of this time working with someone else, whether it's a study buddy, a peer who has completed the exercise, or a JTL in an open session.
- When you are no longer making any progress on your own, take a look at the suggested solution and walk through it step-by-step. Expect to spend up to 10 more hours on the walkthrough while experimenting and learning from the provided solution. The first 7 steps in the solution are built with a very straightforward approach without any design patterns. The remaining steps introduce modules, classes and other abstraction that make the code more flexible and easier to maintain.
- Try to go back to your own solution once the suggested solution clears up any obstacles you encountered.
- Note: The suggested solution presents a single possible way of solving the task. There are many other ways to solve it with their own pros and cons.
- We recommend checking the final suggested solution even if you have completed the task on your own.
"""

---

Prompt:
"""
Technologies: Vue 3 + Vue Router
This hands-on exercise will introduce you to the concept of client-side page routing, which will enable you to build an application with multiple views (pages).
"""

Hands-on:
"""
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
"""

Prompt:
"""
Technologies: Node.js + PostgreSQL
A company storing their data in spreadsheets wants to migrate to a database. The task is to parse the CSV file and store the data in a database. The task involves designing a database schema, creating tables, inserting data and querying data.
"""