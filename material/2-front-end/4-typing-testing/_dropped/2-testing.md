## Vitest (1 hour)

For the last few years, [Jest](https://jestjs.io/) has been the go-to testing package for JS applications. It is a great library, but due to its more convoluted configuration and support for ES modules, we are going to use a more modern testing library - [Vitest](https://vitest.dev/). It provides the same testing interface as Jest, but it is built on top of [Vite](https://vitejs.dev/), is easier to configure, supports ES modules out of the box, and is faster.

To get started with Vitest, you need to install it and set it up in your project. Follow this **[Setting up Vitest in Vue projects](...)** tutorial to understand how to setup Vitest in your project.

After setting up Vitest, you are ready to write your first test. Check out this **[Writing unit tests with Vitest](...)** tutorial to learn the basics of writing tests with Vitest.

Make sure you take note of the following:
- How to structure your tests.
- How to write assertions.
- How to run your tests.

**Pro tip.** Tests should be easy to read. Someone should be able to look at a test and understand what it's doing. To ensure this, try to make your tests as clear and simple as possible.

## Test Types

Testing does not end with unit tests. In a sense, any expectation which you have about your application can be turned into a test. While working on your projects you might have checked:

{{ MUST: rewrite this section }}
- when running a function, does it log the value you expect? - **unit test**. The goal here is to cover various edge-cases and if the test fails, you know exactly where to look for the problem.
- your code fulfills some sort of feature - **functional test**. The goal here is to check if the feature works according to business requirements.
- when clicking on a button, does it open the modal you expect? Automated browser **end-to-end tests** (E2E). The goal here is to check if the application works as a whole with all the pieces connected together.
- when you change your CSS, does it look the way you expect? - **visual regression test**. The goal here is to check if the application looks the way you expect it to look.
- opened the network tab and checked if your page is loading quickly enough? - **performance test**.
- checked if you have added the necessary accessibility attributes to your HTML? - **accessibility test**

This **[Types of tests](...)** video provides a good introduction to the different types of tests and when to use each one.

Make sure you take note of the following:
- When to use each type of test.
- The difference between these types of tests.
- The trade-offs of using different types of tests.

## Why tests

Before we start writing tests, let's first understand why we need tests in the first place.

Imagine this scenario: you are working on a large application. It is handling lots of transactions and has many features. You are tasked with updating an existing feature. You look at the code. It involves 30 or so files just for that single feature. You don't know what most of the code does. You don't know how it interacts with other parts of the application. You don't know what will break if you change something. So you add the most naive copy-paste implementation that hopefully will not break the application 🤞.

If you do this enough times, your application will become a mess where seemingly any change will break something and in unexpected ways that you can't predict.

Also, some changes, such as upgrading dependencies, can be very risky. Let's say you are using a library that is no longer maintained. You want to upgrade to a newer version of the library, but you don't know if the new version will break your application. You will have to spend a lot of time testing the application manually.

That is why most professional applications have automated tests.

From your Python module, you might have felt that writing tests after your project is already finished seems like a chore. It is hard to see the value of your tests when your application already works. At that moment you, as a developer, have peak confidence in your code. You know it works because you just manually tested it, you know how it works because you just wrote it. Why would you need tests? This unearned confidence is dangerous.

## Writing tests in your own projects (1 hour)

There are many different rules of thumb for writing tests. For your front-end capstone, we recommend to "Write tests. Not too many. Mostly integration."

In general, projects tend to rely on the **testing pyramid**. The idea is that you should have a lot of unit tests (~70%), a few integration tests (~20%), and even fewer end-to-end tests (~10%). The reason for this is that unit tests are fast to run and easy to write, while end-to-end tests are slow to run and do not provide some of the benefits of unit tests.

This pyramid is based on various assumptions around the cost of writing and maintaining tests. While most of these assumptions stand true, they have been challenged in the front-end world.

We recommend reading [this article](https://kentcdodds.com/blog/write-tests) on the use of integration tests in front-end projects.

## Exercise: Green-Refactor (1 hour)

instead of refactoring existing code, you will be writing code from scratch. You will be given a set of tests and your task is to write the code that will make the tests pass.

To mimick how TDD would work, focus on one test at a time using the `.only` modifier. Once you have a passing test, move the `.only` modifier to the next test until you fulfill them all. For example:

```ts
it.only('has the provided number of items', () => {
  //...
})
```

At the end, make sure you remove any `.only` modifiers to make sure all tests pass.

In-between each test, consider refactoring your code. You do not need to refactor your code between every test, but you should find at least one opportunity to refactor your code in most cases.

Task:
- Go through 3 exercises in the `src/green-refactor` folder.

{{ MUST: Add exercise. }}

---

The more your tests resemble the way your software is used, the more confidence they can give you.

Red-Green-Refactor

1. Refactor: 2 hours
2. Green-Refactor: 2 hours
3. Red-Green-Refactor: 2 hours
4. Testing components: 1 hour
5. E2E testing: 2 hours

---

**Mini exercise 1:** Use the "Record new" to create a new test file for a [TODO app](https://demo.playwright.dev/todomvc/#/) that creates a new item, marks it as completed, then deletes it. Run the test, make sure it passes.

**Mini exercise 2:** While we have clicked on the "delete" button, we are not checking that the item is actually deleted. How can we do that?

We would need to make sure that the todo item no longer exists. But to know that it no longer exists, we need to know how to find it.

1. Go back to the browser, create a new todo item.
2. Use the "Pick locator" feature in the Playwright testing sidebar.
3. In the browser, click on the todo item. This should produce a locator in the VS Code, such as `getByTestId('todo-title')`. You might need to copy it to the clipboard.
4. In the test, add a new line after the "delete" button is clicked and paste the locator.
5. Now, we can wrap it inside an `expect` statement to check that the element does not exist. For example: `await expect(page.getByTestId('todo-title'))`.
6. Immediately after the `expect` statement, add a dot `.` which should open up various suggestions for supported assertions. In our case we would like to make sure that the `todo-title` element is no longer visible, since we have deleted it. Playwright provides various `toBe...` assertions for this purpose. The most applicable to us would be `toBeHidden`. Add it to the end of the line and call it as a function. It should look like this:

## Automated Testing (0.5 hour)

Before we can introduce you to professional testing practices, we need to make sure that you understand the basics of automated testing. While you were introduced to some of these concepts in the Python module, watch this [short video on testing in JavaScript](https://www.youtube.com/watch?v=hz0_q1MJa2k) to refresh your memory and familiarize yourself with the testing in JS. The example uses CommonJS modules and server-side code as examples, but that should not get in the way of understanding the core concepts.

----

In the previous TypeScript part, you had a few exercises on Codewars. There you were provided with a set of requirements and a set of tests which you had to make pass. Then, once your tests pass, you might change a few things in your code to make it more readable or efficient. This is a very common way of writing code and it is called **Test Driven Development (TDD)**.


<!--
## Code katas (1 hour)

Revisit a few [CodeWars exercises](https://www.codewars.com/kata/search/typescript?q=&r%5B%5D=-7&r%5B%5D=-8&r%5B%5D=-6&beta=false&order_by=satisfaction_percent%20desc%2Ctotal_completed%20desc) with the following goals in mind:
- check if you can add more tests in the existing sample tests by following given examples
- after solving a kata, try to refactor it to optimize it for some particular goal (e.g. readability, performance, conciseness, etc.)
-->


## Test types

Right now we have practiced **unit tests** for our functions and **integration tests** for our components.

Unit in unit tests can be any self-contained piece of code which can be tested in isolation. Meanwhile, integration tests rely on something outside of your code, for example, a database or a web browser. In our case, we are testing how our components work when they are rendered in a simulated DOM with user interactions. So these tests might fail not because of the logic inside of the component, but because of the way it interacts works inside the DOM. If it could fail solely because of the input to output processing (for example, pure side-effect-free function) - then it is a unit test.

The final type of tests we will be looking at are **end-to-end (E2E) tests**. These are tests that simulate a user interacting with your application in a real browser with all of its quirks that might get missed if we were using browser APIs in the integration tests.

E2E tests are usually written from the perspective of the user. For example, "when I click on this button, I expect to see a modal window with a form". These tests are much slower than unit tests and integration tests because they have to start up the entire application and simulate a user interacting with it. However, they are also the most realistic because they are testing the application in the same way that a user would use it.

---

## Double Loop TDD (0.5 hours)

There are some issues with relying on E2E tests for most things. E2E tests are:
- slow
- require more setup to reach some tricky states
- do not tell you exactly where you have a problem

E2E tests can be used to make sure that all the parts work together in the end. They are great for testing happy paths such as signup, login, full checkout flow, etc. But we should not rely on them to test all the edge cases and all the possible scenarios.

For more nuanced edge cases and application states we should prefer to use narrower integration tests or unit tests. These tests are much faster and if they fail, they tell us exactly where the problem is.

In a larger application, we could structure our tests in the following way:
- E2E test for the main sign up flow - happy path
- Integration component test for various signup form states (empty fields, invalid fields, required fields, etc.) - component-specific logic and "sad" paths
- Unit tests for modules that can be written as pure functions or classes without side-effects.

The exact distribution of these tests depends on the project and the team. For the longest time unit tests were considered the most important type of tests. But in recent years, [some front-end developers](https://kentcdodds.com/blog/write-tests) have started to advocate integration or even E2E tests as they provide more confidence that the application works as expected from the user's point of view. The general idea is that we should prefer faster and more focused tests when they are sufficient to cover the scenario.

How can we use TDD to drive our development when we have multiple types of tests?
- We can start with an E2E test to make sure that the main flow works. Since any feature worth E2E testing would require multiple separate components and functions to work together, we should break down the feature into smaller steps.
- Then we work on each step separately. Each step would be tested with an appropriate type of test. A possible structure:

```
e2e/
  signup.spec.js // entire signup flow(s), possibly with multiple pages
src/
  views/
    SignupView/
      SignupForm/
        isPasswordValid/
          index.ts
          isPasswordValid.spec.ts // testing that the function works as expected
        SignupForm.vue
        SignupForm.spec.ts // testing that errors are displayed in various cases
      SignupView.vue
```

This is called a double-loop TDD. We start with a high-level "acceptance test" which is entirely focused on the user's point of view. If we can not make the test pass, we break down the feature into smaller steps and we work on each step separately with a more focused test.

## Exercise: Adding a unit test (1 hour)

Since we want to get our high-level E2E test to pass, we need some logic to validate the password. Let's pause the outer E2E TDD loop and tackle the password validation logic with a unit test.

Create a unit test file `isPasswordValid.spec.ts` function inside of your Signup view folder. Add a single test case for some invalid password. Make sure that the test fails. Then, implement a function in a `isPasswordValid.ts` file. Make the test pass. Add more test cases, make them fail, make them pass, refactor. Once you think you have covered the necessary cases, you are done with the function and you have successfully closed the inner TDD loop.

Go back to your E2E test loop and plug in your new function, check what you need to do to make the test pass (add an error message?). Implement the remaining functionality and make the E2E test pass.

## Test-Driven Development (TDD) (1 hour)

You were introduced to tests from the point of view of adding tests to an existing project. That is a good practice to follow. At the same time, while the benefits of tests are clear, **it can be hard to see the value of tests when your application already works**. At that moment you, as a developer, have peak (unearned) confidence in your code. You know it works because you just manually tested it and you know how it works because you just wrote it. You could write tests... or you could move on to the next feature. So, quite often, tests are added as an afterthought, if at all.

This short-term thinking is dangerous and can lead to a situation where seemingly any change will break something in unexpected ways that you can't predict. You might have experienced this yourself. Sometimes trying to fix a bug in one place breaks something in another place. Or maybe it breaks it and you do not notice it before it is time to deploy the application, or in our case, to present your project. This is called **regression** and it is a common problem in software development, which tends to get worse as the project grows.

So, how can we avoid this? How can we integrate testing into our regular development process? Well, when you think about it, **we are testing our applications all the time**, but not in an automated manner. We write some code, we run the application, we check if it works. We are already testing our code, just very inefficiently. And then if we add automated tests later, we are repeating the same job twice.

It is as if we had to a task of exporting data from a database to an Excel file, so we do it by hand by copy pasting rows across sheets, rearrainging them, formatting them, etc. And once we are finished with the task, we write a script to automate this job for us. That does not make sense. Why didn't we just write the script in the first place??

This is where **Test-Driven Development (TDD)** comes in. TDD is a software development technique where you **write tests before you write the code satisfying those tests**. The cycle of TDD is as follows:

1. Write a test for some requirement. Run the test. It fails because the code to fulfill this requirement does not exist yet.
2. Get the test to pass as quickly as possible. This usually means writing the simplest implementation that will make the test pass.
3. Refactor the code the while making sure that the tests still pass.

It is also known as **Red-Green-Refactor** because of the color of the test results. When a test fails, it is red. When it passes, it is green.

Another way of putting it is - **make it fail**, **make it work**, **make it right**.

There are several benefits to using TDD:
- By writing out your expectations you get to think about the problem you are trying to solve before you write any code. This helps you to better understand the problem and come up with a better solution.
- It lays out what you are trying to achieve in a step-by-step manner which you can follow to arrive at a solution
- Writing tests first usually results in a better test and a better implementation than trying to write tests after the fact.
- It saves you time in the long-term (and sometimes in the short term). You don't have to manually test your code every time you make a change. You can just run your tests and see if they pass.
- It provides specification for your code – someone can look at the tests to understand what the code is supposed to do.
- It is a great tool for learning because you are always working in small steps with immediate feedback from your tests. This prevents you from getting stuck in a rabbit hole of trying to solve a problem that is too big all at once.

Here are a few short videos that introduce TDD:
- [How TDD leads to application design](https://www.youtube.com/watch?v=ln4WnxX-wrw)
- [How TDD is related to Quality of Code](https://www.youtube.com/watch?v=is41fgDrqn0)
<!-- - [TDD in JS](https://www.youtube.com/watch?v=89Pl2Uok8xc) - TDD cycle example -->

**Note:** you do not need to reproduce the shown code examples. They are just there to illustrate the concepts and the TDD workflow.

## Exercise: Red-Green-Refactor (2 hours)

Now, that you have seen some examples of test examples, it is time to try it out the TDD flow yourself. You will learn the entire RED-GREEN-REFACTOR cycle by going through a few exercises.

**Task:**
1. Go the the first exercise in `src/2-tdd` folder.
2. Start with a single, basic test case. Write the test, run it, see it fail.
3. Write the simplest implementation that will make the test pass.
4. Refactor the code while making sure that the tests still pass.
5. Move on to writing the next test case by adding more scenarios.
6. Repeat steps 2-5 until you are happy with your solution for that exercise.
7. Move on to the next exercise.

**Note:**
- Do not worry about testing "right"
- Do not test try to test everything - test what you need to move the development forward. That might mean just 1 - 3 tests.

**Tips:**
- Use `it.only('...')` to focus on a single test case at a time. Once you get it working, remove the `.only` part to run all tests and check if you broke something.
- Test the "contract" of the function. What are its inputs and outputs? That is what you should test.
- Write tests from the perspective of the user. Do not test implementation details. Imagine "what if I would rename every variable, CSS class, would the test still pass?"
- Write a single test, make it pass as quickly as possible, consider refactoring, move on to the next test.
- Most tests tend to follow a pattern of Arrange-Act-Assert. First, you set up the test by creating any necessary data. Then you act by calling the function you are testing or by performing some user-like action. Finally, you assert that the result is what you expect it to be.
- If some of your tests share a similar scenario, you can group them together inside an inner describe block. If the describe block becomes a bit too long or complex for your liking, you can move it to a separate file. It is OK to have a few test files for a single unit.
- If you have shared setups, consider having a setup function to avoid repeating yourself, though this is only recommended when you have 3+ tests that share the same setup. You can put it in the describe block that uses this particular setup, at the end of your test file or in a separate file depending on the setup's complexity.

---

## Q&A

**How should I name test files?**

For unit tests, try to match the name of the unit you are testing, which nearly always maps to the name of a particular file/folder. Name it in the `*.test.js` or `*.spec.js` convention. While many teams pick one or the other, it is possible to use both to communicate different things. `someFunction.test.js` might be used to indicate that you are testing the module after you have already written the implementation.

`myOtherFunction.spec.js` might be used to indicate that the test file is a **specification** of the module - the primary source of truth on what the module is supposed to do and what criteria it should satisfy.

**Should I test child components / child functions?**

We should try to (in order of priority):

  - cover our functionality in tests
  - test requirements at an appropriate level of abstraction
  - avoid testing the same thing twice

We could start off with a spec for a page where the user can sign up for a service. We build the page. It satisfies the high-level tests. But there are various edge-cases or possible branches in the code which we want to test. If these cases are entirely tied to the child form component, we could cover these cases in the child component's tests. If there are many possible edge-cases in the particular field of the form, we could cover these cases in the field's tests. If there are many possible edge-cases in the particular validation function, we could cover these cases in the validation function's tests.

At the high-level we are testing high-level requirements and "happy paths" - a standard cookie-cutter scenarios. The deeper we go into lower-level components and functions, the more edge-cases we cover.

So if our phone validation function has 20 tests for various country code edge-cases, we should not repeat these scenarios in the field, form or page component. These components should have tests that a validation function can not cover - for example, the field might be responsible for showing a validation error message.

You might have noticed that some things actually do get tested a few times. For example, an E2E test, a page-level test, and a form component test might all rely on the submit button working. While some developers might recommend to use test mocks to make sure we are never testing the same thing twice, in practice, that often can cause more problems than it solves. In this situation, it would be fine if all these tests fail if the submit button stops working. Though your tests should not be littered with these kinds of overlaps.

## (Optional/Advanced) TDD and Application Design (1 hour)

- Here is a bonus video on [TDD and Good Design](https://www.youtube.com/watch?v=KyFVA4Spcgg) that covers some of the ideas beyond what is needed for this sprint, but it can help you to understand the bigger picture of how testing and application design fit together.
