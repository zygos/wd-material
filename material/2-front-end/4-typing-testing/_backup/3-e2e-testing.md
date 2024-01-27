Part 3: End-to-End Testing

# Part description

We have learned how to test individual pieces of JS/TS code in isolation. But how do we test our entire application? How do we make sure that all the pieces work together as expected? We will learn how to test our applications in a way that simulates the user's actions and expectations as close to reality as possible. We will also explore how to use tests to drive our development process.

## End-to-end testing

While it is nice to have a suite of unit tests that test our code in isolation, we also need to ensure that our application works as expected when all the pieces are together.

End-to-End (E2E) tests automate the browser and try to simulate the user's actions and expectations as close to reality as possible. An E2E test would navigate to a page, click on some buttons, fill in some forms, and check that the page looks as expected. In a sense, it is an automation script of a manual test. It could look something like this:

```ts
test('adding a habit', async ({ page }) => {
  // lots of methods are async, as they need to wait for the browser
  // to respond to the user's actions, such as page visits, clicks and
  // so on.
  await page.goto('/habits');

  // find the button which has "Add habit" and click on it
  await page.getByRole('button', { name: 'Add habit' }).click();

  // find a field with a "Habit name" label and fill it with "Drink water."
  await page.getByLabel('Habit name').fill('Drink water');

  // find a button with "Save" text and click on it
  await page.getByRole('button', { name: 'Save' }).click();

  // find all list items that have "Drink water" text
  const habits = page.getByRole('listitem').filter({ hasText: 'Drink water' });

  // expect to have exactly one habit with matched text
  await expect(habits).toHaveCount(1);
});
```

E2E is a rather "expensive" type of test as it requires launching the browser, which is much slower than running tests inside a Node process. Nevertheless, E2E tests are much faster than manual testing, and they give us confidence that our application works as expected.

E2E tests are often used to test your application's ["happy paths"](https://en.wikipedia.org/wiki/Happy_path). E2E tests are also handy when you want to start working on a new user flow that involves multiple pages. You can write a rough E2E test that will fail at first, and then you can start working on the feature until the test passes. Once it passes, you know that you are done, and then you can refactor your code or move on to the next feature.

Since E2E tests test the entire application and not individual functions, we will need to use a testing library explicitly designed for E2E testing. Most modern web applications rely on one of the 3 E2E libraries to do the heavy lifting of automating the browser:
- [Selenium](https://www.selenium.dev/), a well-known browser automation library commonly found in the industry. It has been around for a long time and is very mature. However, it is also quite tricky to use and requires more setup.
- [Cypress](https://www.cypress.io/), a more modern tool that was created to make E2E testing easier using a simpler API than Selenium.
- [Playwright](https://playwright.dev/), a relatively new tool developed by Microsoft that is catching up to Cypress due to its speed, cross-browser support, VS Code integration, and more intuitive API.

In this sprint, we will use Playwright for our E2E tests as it follows a more similar assertion API to Jest, Vitest, and Testing Library than Cypress or Selenium. Also, it is easy to set up, especially if you already use VS Code.

**Note:** We will launch web browsers from our development environment. Older WSL (Windows Subsystem Linux) versions do not support launching Linux applications with a Graphical User Interface (GUI). If you have installed WSL 2 before starting this course, you might need to update your WSL version to launch browsers from your Linux environment. See [the "Existing WSL install" section](https://learn.microsoft.com/en-us/windows/wsl/tutorials/gui-apps#existing-wsl-install) for more information.

## E2E Testing with Playwright (2 hours)

**Follow along the [first introductory video](https://www.youtube.com/watch?v=Xz6lhEzgI5I)** and make sure you have done the following:

1. Create a new project folder, for example, `playwright-demo`, and open it in VS Code.
2. Install the [Playwright extension for VS Code](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright) and use the "Install Playwright" command to install Playwright, as shown in the video. You can install all three prominent browser families (Chromium, Firefox, and WebKit). Still, if you are hard-pressed for file space or face installation issues, you can install Chromium. Ensure the JavaScript option is unchecked (to use TypeScript), and there is no need to set up GitHub Actions. Finally, opt to install the dependencies.
3. Go through the created files and folders to understand the end-to-end test structure. Notice:
  - how each test case is named and how the function that runs the test is passed
  - how the example spec goes to a website and tests that it matches some expectations
4. Run the tests in VS Code and make sure they pass. Also, try running your tests with the "Show browser" option in the test explorer sidebar. This will open a browser window and show you the tests running in real-time.

**Follow along with the [debugging video](https://www.youtube.com/watch?v=tJF7UhA59Gc)** and try out the VS Code and Playwright debugging features.

**Follow along the [Generating Playwright Tests video](https://www.youtube.com/watch?v=LM4yqrOzmFE)** and try out to write the [TODO app](https://demo.playwright.dev/todomvc/#/) tests yourself (`https://demo.playwright.dev/todomvc/#/`) side-by-side.

The video will introduce you to Playwright **locators**. Locators is a Playwright-specific term for finding elements on the page we want to interact with. Most E2E testing libraries used to rely on CSS selectors to locate HTML elements, but that often leads to brittle tests that break when the CSS class names are changed. Usually, we want our tests to fail only when the user-facing functionality of the page is changed.

Most modern front-end testing libraries encourage us to use more user-facing or styling-independent methods of locating elements we want to interact with. This allows us to write more robust tests that are less likely to break when the minor styling details are changed, or classes are renamed. To make matters simple, we recommend focusing primarily on using the following locators:

- `getByRole` relies on **accessibility roles**, which can be provided using semantic tags, such as `main`, `nav`, `button`, `a`, `ul`, `li`, etc., or by using the `role` attribute (`role="list"`, `role="status"`, ...). This is the preferred way of locating elements as it relies on the user-facing functionality of the page and guides us to write more accessible web applications. Scroll through the [ARIA roles list](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles) to understand what element roles are available.
- `getByLabel`/`getByPlaceholder`/`getByAltText`/`getByTitle` rely on the `aria-label`/`placeholder`/`alt`/`title` attributes. These are useful when the element does not have an accessibility role or when the role is not specific enough.
- `getByText` relies on the text content of the element. This is a good choice when we want our tests to break when the text content changes.
- `getByTestId` relies on us adding a `data-testid` attribute to our HTML elements. This is a good choice when an element has no accessible role, and we want to be able to change the element's text content without breaking the tests.

To learn more about locators, you can use [Playwright's documentation](https://playwright.dev/docs/locators), though there is no need to go through it now. It is best to have it open when going through exercises.

**Pro tip:** You are heavily encouraged to use a keyboard shortcut for triggering E2E test reruns. A helpful command in our case is "Run test at cursor". You can find its shortcut by opening VS Code settings ("Preferences: Open Keyboard Shortcuts" command) and search for "test cursor". If you find its keyboard binding too inconvenient, you can change it.

**Pro tip:** It is handy that we have a `toBeHidden` assertion which is the opposite of the `toBeVisible`. But not all assertions have their opposites. How would we check that an element is hidden if we did not have a `toBeHidden` assertion? In that case, we need to use `not` to get a list of inverted assertions. For example:

```ts
// this will pass if the element is NOT visible
await expect(page.getByTestId('todo-title')).not.toBeVisible();
```

**Watch the [Playwright UI mode video](https://www.youtube.com/watch?v=d0u6XhXknzU)** to learn how to use a Playwright's test tracing and time travel features. These are useful for debugging and understanding why a test fails when our VS Code debug mode is insufficient. It is perfectly fine not to use the UI mode in testing, but it can be handy when you need more visual feedback in your E2E tests.

Finally, use your remaining time to examine the provided Playwright E2E test examples in the examples folder.

**Note:** You might have noticed that E2E tests are not colocated with the source folder. This is because most E2E tests are written to test the whole application, often including multiple views. Therefore trying to colocate them with a particular component or view would not make much sense. Instead, we recommend placing E2E tests in a separate project-level folder, such as `e2e` or `tests/e2e`.

## Exercise: NASA APOD Playwright Codegen (1.5 hours)

Go back to the NASA APOD project that you have migrated to TypeScript in the TypeScript part (not the provided solution). It already has Playwright installed and configured:
- `@playwright/test` package as a dev dependency
- `playwright.config.ts` with the same cookie-cutter code as you would get by generating a new Vue project with Playwright selected as an E2E testing option
- `test:e2e` script in your `package.json` file `scripts` section: `"test:e2e": "playwright test"`
- `test-results/` and `playwright-report/` in the `.gitignore` file

Run `npm install` and start the Vite server with `npm run dev`.

Use the provided files in the `e2e` folder as your starting point to add some E2E tests. Play around generating tests using the Playwright recorder in VS Code using "Record at cursor". If needed, you can also use "Record new" to create new test files.

Test recordings will try to provide you with some sensible locators, but you might need to tweak them a bit. You might experiment with adding some `data-testid` attributes to HTML elements of some Vue components that you want to select in your tests. This is a good approach if you want to avoid relying on the text content to find an element.

**Challenge:** If you have some testing experience and this seems too easy, try to write the tests manually.

## Exercise: Test-first E2E with Playwright (2 hours)

While there is nothing wrong with using Playwright's recordings to generate tests at this stage, we want to introduce you to the test-first approach. It helps to write better tests and better implementation code.

Let's try out this approach with Playwright. We will build a bare minimal "Signup flow" with two pages:

- Signup page
- Confirmation page

Signup page should allow the users to signup by entering their details and pressing the "Signup" button. Then, the user should see a confirmation/success message on a different page.

The form will have Email and Password inputs.

Use the following steps to build the page:

1. Create a new Vue project through `npm init vue` (or `npm init vite` with the "Customize with create-vue" option). Choose to add:
- TypeScript support
- Vue Router
- Unit testing: Vitest
- End-to-end testing: Playwright
- Linting: ESLint
- Formatting: Prettier

2. Install dependencies, and run the app to ensure it works. Then, run the e2e tests in the `e2e` folder to make sure that they work.

3. (Optional) Setup your preferred linting and formatting rules. Set the `timeout` in `playwright.config.ts` to `2000` and `expect` `timeout` to `500` to speed up failing tests.

4. (Optional) Clean up the generated code by removing some boilerplate-level components.

5. As a challenge, we will practice the test-first approach. Create a new `e2e/signup.spec.ts` file. If we were writing a unit test, we would start with a minimal use case of a desired output given an input. But for an E2E test, we can lay out the entire flow. We could rewrite the essential requirements into a test:

```ts
import { test } from '@playwright/test'

test('signup flow', async ({ page }) => {
  // visitor visits to the signup page (/signup)
  // visitor enters their email and password
  // visitor clicks on the form submit button
  // visitor sees a message congratulating them
})
```

This will be our E2E test going through the entire signup flow in a happy path manner.

**Convert the comments into a valid Playwright test.** At the first stage, you can use `getByTestId` for all locators. For example, `await page.getByTestId('email').fill('email@domain.com`)`. Your test will fail, as we have not implemented any pages yet, but that is OK. We are laying out what we want to achieve before implementing it.

<details>
  <summary>Solution</summary>

```ts
import { test, expect } from '@playwright/test'

test('signup flow', async ({ page }) => {
  // visitor goes to the signup page (/signup)
  await page.goto('/signup')

  // visitor enters their email and password
  await page.getByTestId('email').fill('email@domain.com')
  await page.getByTestId('password').fill('password')

  // visitor clicks on the form submit button
  await page.getByTestId('signup-button').click()

  // visitor sees a message congratulating them
  await expect(page.getByTestId('signup-success-message')).toBeVisible()
})
```
</details>

Run the test; it should fail.

6. What could be the most straightforward implementation to pass the test? Well, we need the following:
- to create a `Signup` view with a few inputs, a button, and a success message
- make the Signup view available at the `/signup` route

**Implement a basic solution that will make the test pass.** Do not overthink it. Your first goal is to reach the green stage - passing tests. Once that is done, you can refactor the code to make it right.

<details>
  <summary>Solution</summary>

SignupView.vue
```vue
<template>
  <form>
    <input type="email" data-testid="email" />
    <input type="password" data-testid="password" />
    <button type="submit" data-testid="signup-button">Signup</button>
  </form>
  <div data-testid="signup-success-message">Congratulations, you have signed up!</div>
</template>
```
</details>

7. Now that we have a basic implementation passing our tests, we can refactor it to improve it. In our case, we could update both the test and the page template to use more user-facing locators instead of `getByTestId`. For example, we could use `getByLabel` for the fields and `getByRole` for the button. Then we could ditch some of the `data-testid` attributes.

**Replace the `getByTestId` calls with `getByLabel` (for fields) and `getByRole` (for the button) calls where applicable.**

<details>
  <summary>Solution</summary>

```ts
test('signup flow', async ({ page }) => {
  await page.goto('/signup')

  await page.getByLabel('Email').fill('email@domain.com')
  await page.getByLabel('Password').fill('password')
  await page.getByRole('button', { name: 'Signup' }).click()

  await expect(page.getByTestId('signup-success-message')).toBeVisible()
})
```
</details>

**Pro tip #1:** What locator should you use for various elements? It depends on the context. Select an element based on how much you would care if that locator changed.
- **Best practices**. To enforce best accessibility practices, use `getByLabel`, `getByRole`, or `getByPlaceholderText`.
- **Robustness**. If you want to ensure that your tests will not break if the content of an element changes, use `getByTestId`. This is great if you want to freely change the content of an element without breaking your tests.
- **Semantic CSS selectors**. Sometimes, you can use a CSS selector such as `page.locator('button[type="submit"]')` to find a submit button which would save you from adding a test ID to the button. However, this is a rare case. You should prefer accessibility-based locators or test ID locators.

**Pro tip #2:** You would often want to isolate your locators from other elements on the page that could break your tests. For example, you might have a footer form with a newsletter subscription form with a similar field to the signup form. Then Playwright would not be able to know which input is the one you want to interact with. In this case, you would like to add a `<form aria-label="Signup">` and then use `const form = page.getByRole('form', { name: 'Signup' })` to get the form and then use `form.getBy...` to get the fields and buttons inside the form. In that case, changing the footer form would keep your signup form test intact. You want your signup tests to fail only if the signup no longer works. Tests breaking for any other reason is a clear sign that your tests are not isolated enough or that you are testing fragile implementation details.

**Add the necessary labels to make the test pass.**

<details>
  <summary>Solution</summary>

```html
<form>
  <!--
    We could also use aria-label="Email" for our inputs or
    use separate labels with "for" attributes pointing to input ids.
  -->
  <label>
    Email
    <input id="email" type="email" />
  </label>

  <label>
    Password
    <input id="password" type="password" />
  </label>
</form>
```
</details>

8. We have one issue. We are not testing that the user does not see the success message before they submit the form. Update our test to ensure the user does not see the success message before submitting the form. Let the test fail.

9. Update the implementation to make our tests pass. At this point, we can move out our success message to a separate page.

**Move the success message to a separate view, to which the user is redirected on the form submit event.** Hint: use `useRouter` to get the router instance and use `router.push` on form submit to redirect the user to a different page.

10. (Optional/Advanced) Now we want to ensure that the user sees an error message if they try submitting the form with invalid or missing field values.

We would separate these tests into multiple test cases in a unit test. But in an E2E test, we can update our existing test to go through the entire flow. This will make the testing path slightly more "dirty", but that should not be a problem if we do not try to stretch this logic too far. Here is what we could test in a single E2E test:

1. typing in an email and a invalid password
2. expecting a visible error message
3. fixing the password
4. submitting the form again
5. expecting a success message

**Refine the existing test to ensure the user sees an error message if they try submitting the form with a weak (invalid) password. Do not add an implementation satisfying your updated test.**

We will not be testing all invalid password scenarios in this test as we can assume we will have some module (file) responsible for validating passwords. That module will be better suited to test all the relevant cases using a unit test file.

**Note:** Ideally, testing some component-specific behavior (i.e., displaying an error message inside a form) should be specified by a colocated integration test for the component containing the element. However, in this sprint, we will spare you the additional layer of complexity that comes with an introduction to component-level integration tests, as that would require learning a new testing library and more concepts that would be overwhelming.

## Testing Q&A (1 hour)

**What should I test?**

Right now, we recommend considering your product from the user's perspective. Would they care if a particular part broke? If yes - then test it. If no - then don't.

At this point, we are not looking to cover all possible scenarios or ensure there is no way to mess up. We are learning to use tests to enhance our development process and give us the confidence to refactor and ship our code. Another way to put it - you will be presenting your work tomorrow. What would you manually test before the presentation? If it is worth manual testing, it is worth automating.

**Should I write tests first or after I have implemented the feature?**

While ideally, we recommend writing tests first, it takes quite a bit of time to master this skill up to a point where it no longer slows you down.

Given that you are still learning to write tests, adding tests after you have implemented a feature is OK. If you have trouble writing E2E tests, using Playwright's recordings to generate tests is perfectly OK.

However, we encourage writing tests as soon as possible and not to leave it as your "finishing touch" before submitting your work.

If you are working on a new feature, you might create a minimal implementation and then add some tests that you will use to guide you to refine your implementation. That will be an acceptable compromise if you are feeling dazed by the idea of writing tests first.

**Should I test a page, component, or function?**

Test things at the level where you can isolate their effects. This principle can be inverted and used to guide you on how to write good code - write code in a way that makes it easy to isolate its effects. This makes your code more testable and easier to understand.

Ideally, you could test pages, components, and functions:
- E2E for the happy path of a user going through a particular flow inside of your application
- multiple integration tests for more intricate scenarios at the page/component level
- unit tests for files that are not coupled with user interaction

For your upcoming assignments, you will be expected to focus on a handful of E2E for the critical user flows and some unit tests for non-trivial functions that can be moved to their file and tested in isolation.

**Where should I put tests?**

If your system under test goes beyond the boundaries of any particular module, or it is supposed to test your entire system, you should put your tests in a separate root-level folder. For example, in your project root, **you can use the `e2e` folder containing your E2E tests**.

If a test is testing a module (file/folder), we recommend collocating tests with the code responsible for satisfying these tests. The most extreme application would be using [the same file for the code and the tests](https://vitest.dev/guide/in-source.html). That can work with small functions, but once you get more functionality/tests than can fit on a single screen, you should start using separate files, and that is considered the default approach in most cases. You could have the following approaches:

```
  calculateTax/ // implementation and a test file in a folder
    index.ts
    calculateTax.spec.ts
```

```
  largeModule/
    childModule/
      childModule.spec.ts // test cases for inner child module, possibly covering some edge-cases
      index.ts
    largeModule.spec.ts // test cases for large module
    index.ts
```

```
  calculateTax/
    tests/ // shared tests folder for a family of modules
      fixtures/
        payments.json
      calcualteEuTax.spec.ts
      calculateUkTax.spec.ts
      calculateUsTax.spec.ts
      calculateTax.spec.ts
    calcualteEuTax.ts
    calculateUkTax.ts
    calculateUsTax.ts
    index.ts
```

A good rule of thumb is to put things together if deleting one would make the other useless. For example, if you delete a module, you will also delete the tests for that module. That is a good sign that they should be colocated.

**Note:** Some projects locate their tests in the root `tests` folder. This is a common approach, but it creates a problem of mirroring the file names and folder structure of your `src` folder in your `tests` folder. This will discourage you from refactoring your code because you will also need to repeat these changes in the `tests` folders. Restricting your freedom to implement changes is not a good idea. Tests are supposed to empower you to make changes with confidence. On top of that, having unit tests in a root-level folder makes it harder to understand which files are tested and which are not without generating a test coverage report.

**I can not write front-end tests before my implementation because I do not know how my code will be structured or what type of CSS selectors I will use in my code.**

This is precisely what you want. While it is more complicated to get your head around writing tests beforehand, it is the approach that, more often than not, results in more robust tests that are less likely to break when you change non-critical details.

Let's say you want to build a form with some fields and a submit button. In your tests, you should not rely on semantic CSS ids, classes (`.submit-button`), or utility CSS classes (`.bg-slate-900.hover:bg-slate-700`, ...). All of these selectors are implementation details, and they are likely to change. Instead, it would be best if you relied on:

- accessibility attributes that should be used for most interactive elements (e.g., `role="listitem"`, `aria-label="Submit"`)
- data attributes for tests (e.g., `data-testid="signup-button"`)
- element's content, if it is not likely to change or you are OK with your tests breaking if it changes (e.g., `Signup`)
- semantic HTML (e.g. `button[type="submit"]`)

For example:

```js
test('signup', async ({ page }) => {
  await page.goto('/signup');

  // ❌ Bad. Relies on implementation details.
  // This would break if we changed form structure, CSS classes, field text, ...
  await page.locator('.email-field > div > input').fill('...');
  await page.getByText('I agree to the terms and conditions').click();
  await page.locator('.btn.btn-success.btn-lg').click();

  // ✔️ Better. Makes reasonable assumptions about the structure of the form.
  // This will break only if there is no email/ToC field/submit or they
  // do not work as expected.
  // form with aria-label="Signup" allows us to isolate our tests from other forms on the page
  const form = page.getByRole('form', { name: 'Signup' });
  await form.getByLabel('Email').fill('...');
  await form.getByTestId('terms-and-conditions').click(); // or a checkbox containing /terms and conditions/i
  await form.locator('button[type="submit"]').click();
});
```

**How can I make my code more testable?**

Tests are a great tool to expose poor application design. If your code is hard to test, likely, it is also hard to understand, hard to maintain, and hard to extend. If you are struggling to write tests for your code, take a step back and think about how you could improve your code. Here are some ideas:

- **Write test cases before you write your code**. This is a good practice that will help you to design better solutions.
- **Separate pure functions**. It will be easy to test if you have a function that deals only with its provided arguments and is not modifying any of them. These types of functions are known as **pure functions**, and these can grow in size as much as you need without losing the ability to test them. Once you start dealing with I/O, such as network requests, everything becomes harder to test. It would help if you tried to separate these operations into separate functions. For example, if you have a function that fetches some data, transforms it, and displays it, you could separate these into separate concerns into two functions:

  - A function/module transforming the data. This easy to test; this can get as large as you need.
  - A tiny function which deals with "the real world" - fetching data, displaying it, etc. This is hard to test, but it is also tiny.

The same principle can be applied to OOP with classes where you have some small classes dealing with the "real world" and other classes dealing with pure data manipulation.

# Directions for further research (1 hour+)

- We have been referring to accessibility roles and attributes in our tests. They can be found in your page's accessibility tree. What is an accessibility tree? How can you see it in your browser?
- What are brittle and flaky tests? How can you avoid them?
- What is a headless browser? What are the benefits of using a headless browser for testing?
- You might want to avoid dealing with various network requests in your tests, such as network requests to some external API. How could you [mock these requests](https://playwright.dev/docs/mock) in your tests?
