Part 2: Unit Testing

# Part description

In this part, we will dive into the world of JavaScript unit testing from the point of view of a developer. We will focus on practical aspects of testing and how to use tests to allow us to refactor our code to reach better solutions. At the same time, we will practice using TypeScript types that we just learned about.

# Key learning topics & resources for this part

## Automated Testing (1 hour)

Before introducing you to professional testing practices, we must ensure you understand the basics of automated testing. While you were introduced to some of these concepts in the Python module, we will need to refresh your memory and introduce some new concepts:
- [Software Testing Explained in 100 Seconds](https://www.youtube.com/watch?v=u6QfIXgjwGQ)
- [Unit testing in Javascript](https://www.youtube.com/watch?v=hz0_q1MJa2k). It will use CommonJS modules and server-side code as examples, but that should not hinder understanding the central concept.

When is it a good time to add tests to your application? There are multiple approaches:
- Test-first - write tests before you write the code. This implies that you convey the requirements for your application through tests that you fulfill by writing code that passes these tests.
- Test-after - write tests after you have written the basic implementation of a desired feature, and you want to ensure that it works in various scenarios.
- Test before refactoring - in an existing codebase that does not have tests, you might be unsure if you can safely refactor some code. In that case, you can write tests for the existing code and then refactor it. If the tests still pass, you can be more confident that you did not break anything.
- Test before fixing a bug - this is a highly recommended approach when dealing with bugs. This is because bugs tend to be caused by unexpected scenarios you did not think about while writing the code. By writing tests for the bug, you can make sure that you understand the bug and that you can reproduce it. Then you can fix the bug and make sure that this particular bug will not be a nuisance in the future. This will give you confidence that you have fixed the bug and that it will not reappear in the future.

We will practice all scenarios in this part.

## Vitest (0.5 hours)

For quite a few years, [Jest](https://jestjs.io/) has been the go-to testing package for JS applications. It is a great library, but due to its more cumbersome configuration for ES modules, we will use a more modern testing library that tries to address some of Jest's limitations - [Vitest](https://vitest.dev/).
- Vitest is built on top of Vite
- It is easier to configure
- It supports ES modules out of the box
- It runs faster
- It is designed to be a drop-in Jest replacement, so most Jest test code looks exactly the same in Vitest

Go through the [basic example of using](https://www.youtube.com/watch?v=7f-71kYhK00) (up to 5:50, everything beyond that is optional). Make sure you know how to:
- install Vitest
- add a test script to `package.json`
- write a test file and add test cases
- run tests

A test case usually consists of 2 parameters:
- A name for the test case. It usually starts with `it('...')`, so you are already guided on naming your test case. For example, `it('should add 2 numbers')` - `it should add 2 numbers`. It is also possible to use `test('adding 2 numbers')`, as `test` and `it` are equivalent. However, `it` is preferred in unit tests as it guides you to focus on your module's behavior (it does X, it does not Y, it throws Z, ...).
- a function that contains the test case logic. For example, `it('should add 2 numbers', () => { ... })`.

If you are dealing with simple functions, your test case logic might be as simple as:
```ts
it('should add 2 numbers', () => {
  expect(add(1, 2)).toBe(3)
})
```

If you are dealing with more complex test cases that need some setup before running the test case, consider using the following test case structure:
- **Arrange** - setting up the test case by creating any necessary data
- **Act** - calling the function you are testing or performing some user-like action
- **Assert** - asserting that the result is what you expect it to be

This is also known as Given-When-Then (GWT). A classic three-part act. For example:

```ts
import { it, expect } from 'vitest'

it('should return remaining available rooms', () => {
  // arrange / given
  const rooms = [
    { id: 1, name: 'Room 1' },
    { id: 2, name: 'Room 2' },
    { id: 3, name: 'Room 3' },
    { id: 4, name: 'Room 4' },
  ]
  const bookings = [{ roomId: 1 }, { id: 2, roomId: 4 }]

  // act / when
  const result = getAvailableRooms(rooms, bookings)

  // assert / then
  expect(result).toEqual([
    { id: 2, name: 'Room 2' },
    { id: 3, name: 'Room 3' },
  ])
})
```

Sometimes tests are grouped in `describe` blocks. A `describe` block does not change how your tests run but allows clustering tests for more structured test reports. A `describe` block usually consists of a general scenario name and a function containing the test cases.

For example:

```ts
describe('without tasks', () => {
  it('displays that there are no tasks', () => {
    // ...
  })

  it('allows adding a first task', () => {
    // ...
  })
})

describe('with tasks', () => {
  it('displays existing tasks', () => {
    // ...
  })
})
```

These are just functions; you can organize them as you see fit. You can use no `describe` blocks, a single `describe` block, multiple `describe` blocks, and so on. If you find your test file having more than a handful of test cases, then you might consider moving some of them to a separate file, so each of your files would be focused on a particular scenario or a family of scenarios.

In general, we recommend using `describe` blocks when you can group your test cases under some shared context. Try not to go beyond 2-levels of `describe` nesting. If a `describe` block grows to be large, move it to a separate file.

## Vitest documentation (1 hour)

The general Vitest guide provides much information on advanced topics that are unnecessary for us to know now. Many of the supported techniques are not recommended for beginners (and even experts debate which are good practices) as they can cause more problems than they solve when used prematurely. Ideally, your test suite should be simple and easy to understand. For now, you can safely ignore the vast majority of the documentation.

We recommend skimming the following parts of the [Vitest API Reference](https://vitest.dev/docs/getting-started):
- [test.todo](https://vitest.dev/api/#test-todo) - for laying out the test cases that you want to write
- [test.only](https://vitest.dev/api/#test-only) - for focusing on a single test case at a time
- [expect](https://vitest.dev/api/expect.html) - go through the names of the assertions to get a rough idea of what is available. You will likely use `not`, `toBe`, `toEqual`, `toStrictEqual`, `toContain`, `toMatchObject`, and `toThrowError`. This small set of assertions is enough to test the majority of scenarios. Most other assertions are either just convenience wrappers around these assertions or are not recommended for beginners.

Do not try to memorize any methods just yet. We will use them in practice, and you will learn them as you go.

## Exercise: Refactor (3 hours)

First, we will warm up with a few pieces of code with tests and their implementation. Unfortunately, the developers did not always follow the best practices. Your task is to refactor the implementation code to make it more readable and maintainable while ensuring that the tests still pass.

We will practice:
- reading and understanding tests
- continuously running tests
- refactoring code
- using TypeScript types
- using higher-order functions

Download the [exercise files](https://drive.google.com/file/d/1L75TkJRLdOMVR9s5q8vBWmo3OJUwtHsx/view?usp=sharing). These will be used for multiple exercises in this part.

**Task:**
1. Install dependencies - `npm install`.
2. Open up the first exercise in the `src/1-refactor` folder - `1-calculateTotalPrice`.
3. Read the colocated test file to understand what the code is supposed to do.
4. Open the terminal and run the test file for this exercise - `npm run test calculateTotalPrice`. This will run the test and **watch for any source/test changes**. Unit tests directly import our source code, so they can conveniently rerun every time we save our source or test file. This speeds up our feedback loop.
5. Open up the implementation file while your terminal has the test runner watching for changes. We recommend trying out split-screen editing in VS Code. You can do this by having your test and implementation files on different sides of the screen (split-screen). You can do this by opening both files and running the VS Code command "Move Editor into Next Group".
6. Refactor the code to make it more readable and maintainable. Add TypeScript types. Using higher-order functions would be a good idea in many cases.
7. Continuously save your changes and monitor the test results. If the tests fail, you know you broke something between your last save and now.
8. Once you are happy with your refactoring, ensure your tests are still passing.
9. Look through the provided solution if it is available.
10. Move on to the next exercise.

Try to get through as many exercises as you can.

Some exercises will introduce you to some techniques that you are not yet required to be able to implement yourself, at least not from scratch. For example, component testing and request interception in unit tests.

One exercise will introduce you to component testing with 2 component tests that try to "render" the `TaskManager` component in a browser-like environment (though not in a real browser). You will see 2 examples:
- `taskManager.vtu.spec` using `@vue/test-utils` allows us to test Vue components rapidly in isolation and is excellent if you want to test the component's API.
- `taskManager.tl.spec` using [`testing-library`](https://testing-library.com/), which does a bit more work to simulate user-like behavior and is great if you want to test the component's behavior and not its API. It makes no assumptions about the implementation of the component, and it would be possible to have a React or Angular component that would pass nearly the same tests.

**Note:** We will not go into more details about component testing and integration testing as that would spread us too thin, but we still wanted to show you an example of how it could be done. If you have time after finishing the other exercises, feel free to play with the component tests.

## Exercise: Writing tests (1 hour)

In this section, you will work on writing a few unit tests in the `2-test` folder.

**Task:**
1. Go through some provided exercises in the `src/2-test` folder.
2. Use the collocated test file and the provided implementation to understand what the code is supposed to do.
3. Add missing test cases marked with `it.skip` and `it.todo`.
4. Remove the `skip` and `todo` modifiers and run the tests.
5. If necessary, update the implementation to make the tests pass.

## Exercise: Writing an implementation using tests (2.5 hour)

Now, we will try out writing an implementation using a test-first approach. We will use the `3-test-first` folder for this exercise.

A developer before you has written a few test cases for a few some functions that need to be finished up. Your task is to finish the implementation of the functions so that the tests pass.

**Task:**
1. Go through the provided exercises in the `src/3-test-first` folder.
2. Use the collocated test file and the provided implementation to understand what the code is supposed to do.
3. Run the tests and make sure that they fail.

The last few exercises will require you to write tests and implementation yourself. We recommend experimenting with the following flow:
1. Write a test case.
2. Run the tests and make sure that they fail.
3. Implement the function to make the test pass.

This would be a very soft introduction to **Test-Driven Development (TDD)**. We will cover it in more detail later in this course. For now, we will try it out to get a feeling for it.

Watch a basic example of a [TDD cycle in JS](https://www.youtube.com/watch?v=89Pl2Uok8xc).

# Directions for further research (1 hour+)

- What makes a function or a class easy to test?
- What is a fixture in testing?
- (Optional) Look into how you could you automatically add all Vitest functions to every test file without having to import them.
- (Optional) How could you test a Vue component?
