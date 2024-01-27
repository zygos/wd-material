Part 3: Test Driven Development

# Part introduction

Writing tests in the back end is even more important than writing them in the front end. If you make a mistake in the back end, it can have hard-to-undo consequences. It can lead to data loss, security breaches, and potential legal issues.

In this sprint, we have spent two parts learning how to write Express endpoints without tests. This was done to ensure you understand the basics of Express and how to write a simple API. Now that we know the basics, we will learn how to test our Node.js code.

We will also learn how to use **test doubles**, such as **mocks**, **spies**, and make our code more testable by isolating logic into **pure functions** and using **dependency injection** for our dependencies.

# Key learning topics & resources for this part

## Test-Driven Development (TDD) (0.5 hours)

- Watch: [How TDD is related to Quality of Code ("Uncle" Bob, author of Clean Code)](https://www.youtube.com/watch?v=is41fgDrqn0) (10 min)

While we have briefly introduced you to test-first development, we primarily guided you through the process of adding tests to an existing project. It is better than not having tests. At the same time, **it can be hard to see the value of tests when your application already works**. At that moment, you, as a developer, have peaked (unearned) confidence in your code. You _kind of_ know it works because you just manually tested it, and you know how it works because you just wrote it. You could write tests... or move on to the next feature. So, tests are often added as an afterthought, if at all.

This short-term thinking is dangerous and can lead to a situation where seemingly any change will break something in unexpected ways that you can't predict. You might have experienced this yourself. Sometimes, trying to fix a bug in one place breaks something in another place. Or it may break it, and you do not notice it before it is time to deploy the application or, in our case, to present your project. This is called **regression** and is a common problem in software development, which gets worse as the project grows.

So, how can we avoid this? How can we integrate testing into our regular development process? When you think about it, **we are testing our applications all the time**, but not in an automated manner. We write some code, run the application, and check if it works. We are already testing our code, just very inefficiently. And then, if we add automated tests later, we are repeating the same job twice.

It is as if we had to export data from a database to an Excel file, so we do it by hand by copying and pasting rows across sheets, rearranging them, formatting them, etc. And once we finish the task, we write a script to automate this job for us. That does not make sense. **Why didn't we write the script in the first place??**

This is where **Test-Driven Development (TDD)** comes in. TDD is a software development practice where you **write tests before you write the code satisfying those tests**. The cycle of TDD is as follows:

1. Write a test for some requirement. Run the test. It fails because the code to fulfill this requirement has yet to exist.
2. Get the test to pass as quickly as possible. This usually means writing the most straightforward implementation that will make the test pass.
3. Refactor the code while making sure that the tests still pass.

It is also known as **Red-Green-Refactor** because of the color of the test results. When a test fails, it is red. When it passes, it is green.

Another way of putting it is - **make it fail**, **make it work**, **make it right**.

There are several benefits to using TDD:
- By writing out your expectations, **you get to think about the problem** from the right point of view before you write any code. This helps you understand the problem better and develop a better solution.
- It lays out what you are trying to achieve in a **step-by-step** manner, which you can follow to arrive at a solution
- Writing tests first usually results in **better tests and implementation** than writing tests after the fact.
- **You do not have to manually test your app every time you make a change.** That saves you time in the long term (and sometimes in the short term).
- It provides specifications for your code – someone can look at the tests to understand what the code is supposed to do.
- It is an **excellent tool for learning** because you are always working in small steps with immediate feedback from your tests. This prevents you from getting stuck in a rabbit hole of trying to solve a problem that is too big all at once.

## Exercise: Anagrams (1.5 hours)

**Note on Jest/Vitest compatibility.** Jest is a long-standing testing library for JavaScript. That is the reason why quite a few tutorials online involve Jest. However, Jest requires additional setup, which we would like to avoid so we can focus on the main topic of this section - writing tests. We are using a Vitest for this module as it has the same testing API as Jest, so **Jest and Vitest tutorials are mostly interchangeable**. On top of that, Vitest runs tests quite a bit faster than Jest, which is a nice bonus when learning the TDD workflow. So, **Vitest experience is transferable to Jest and vice versa**.

We will go through a few general ideas behind testing with a simple example of a program that displays a list of [anagrams](https://en.wikipedia.org/wiki/Anagram) for a given word. We will take the long road of refactoring the initial module to make it more testable and to demonstrate some testing techniques. It compactly illustrates multiple layers that we can test.

The application right now is a simple TypeScript module containing a variable for a word. When the module is run, it:

- displays the number of anagrams for a given word from a provided dictionary
- displays every anagram for a given word

**Step 1. Review the given example.**

Open up the `anagrams-0` folder in VS Code and install dependencies.

For a small playground-like script like this, we will skip setting up a larger linting/formatting toolchain and use `tsx` and `vitest` to run our code and tests.

Look through the source code. Run `npm run start` to see the result.

How would we test this micro application in an automated manner? While we can test it in its entirety, we would not want this to be our only option, as small changes would break lots of tests, and we would have no chance of covering all test cases.

Also, testing things in their entirety does not scale. Imagine a tiny application with 5 parts, each with 10 possible input/output combinations. Each part leads into another. If we can isolate each part correctly, we could write **5 parts x 10 tests = 50 tests** to test our application thoroughly. Not great, not terrible. But what if we can not isolate it? Well, it's 10 code branches leading to 10 more code branches, and so on. So, to cover the same number of combinations, we would need to write **10x10x10x10x10 = 100,000 tests**. **By making our modules easy to test, we allow ourselves to write FEWER tests, not more.**

Our anagram application started on the wrong path - on the path to 100,000 tests. Let's work on getting it back to a more sensible path. At the moment, there is no easy way to test this tiny application in an isolated manner because:

- it is entangled with I/O (input/output) - it directly reads from the file system and prints to the console.
- there is minimal separation of concerns - the same function deals with multiple concerns, so every test testing one concern would also touch the other.

It is easy to write code like this when you are just trying to get something to work. But it is hard to maintain and test code like this once it grows beyond this tiny problem space and other parts of your application rely on it.

For this small example, we are only left with an option to do an integration test, where we are testing the entire application as a whole. We can do this by running the application and checking for the correct output. This is not ideal because:

- it couples the test to the implementation - if we change the implementation - the dictionary, the logic, or the output method - **many of our tests will break**
- **it is hard to pinpoint the source of the error** - if the test fails, we do not know if it is because of the input, the logic, or the output
- **we will tend to overlook various cases** as we are not focused on each step of the process
- **integration tests are relatively slow** - we have to run the entire application (or an outsized portion) to test a small part.

**Step 2. Add a test to separate the anagram logic.**

The first step to make this code more testable is to isolate any piece of logic not directly related to I/O - something that is **a pure function** - a function that does not have any side effects. A side effect is anything that is not directly related to the return value of a function. In our case, the side-effects are reading from the file system and printing to the console.

In our case, we could isolate everything between reading the dictionary and printing the results. We could call this function `getAnagrams`, which would return an array of anagrams for a given the word. Should our function read the dictionary provided, or should it be provided with a list of words? If we decide to change our dictionary in the future (maybe we want to use a different dictionary or a different format), we will have to change our function. Instead, we would like a function that encapsulates what it means to get a list of anagrams for any dictionary.

Let's create a new test file, which we will call `getAnagrams.spec.ts`.

```ts
import { describe, expect, it } from 'vitest'
import getAnagrams from './getAnagrams'

describe('getAnagrams', () => {
  it('should return an array of anagrams for the given word', () => {
    const dictionary = ['dusty', 'night']

    expect(getAnagrams(dictionary, 'study')).toEqual(['dusty'])
    expect(getAnagrams(dictionary, 'thing')).toEqual(['night'])
  })
})
```

You can run your test with `npm test`, configured in `package.json` to run `vitest`.

**Step 3. Write an implementation for the test.**

1. Create a `getAnagrams.ts` file.
2. Move the necessary logic from the `src/index.ts` to the new file and make your test pass.

**Step 4. Refactor your implementation.**

There is a more elegant way to return a list of anagrams that communicates what you are trying to achieve.

**Step 5. Add additional test cases to ensure you cover a few more scenarios.**

Now, we can easily test this piece of logic, so let's make sure we are covering the following scenarios:

```ts
it.todo('should return an empty array if there are no anagrams')
it.todo('should return an empty array if the dictionary is empty')
it.todo('should return an empty array if the word is empty')
it.todo('should not include partial anagrams')
it.todo('should not include the word itself')
```

The current implementation has a few bugs that you need to fix. That is great! We have found a few bugs in our application, and we can resolve them in a few minutes instead of seeing them in production, which might take A LOT more time to fix and might lead to frustration for our users. Depending on the bug's severity, it might even lead to a loss of revenue, reputation, and even legal issues.

We have covered some reasonable test cases. We could add more, but we will leave that for now. We, as developers, are quite limited in time, so we should focus on the most critical cases first. We can always add more tests later.

**Note:** Given that our `getAnagrams` function is not exposed directly to the user, we rely on TypeScript to enforce the correct usage of the function, so we do not need to perform input type validation in this function. Generally, you would like to validate your input as close to the application "surface" - close to the data source. In that case, you can be sure that the data you are working with is valid, and you do not need to worry about it in the rest of your application.

Once done, review the `anagrams-5` folder for a possible solution.

**Step 6. Extract the message-forming logic into its module.**

We have captured the general concept of getting anagrams from a dictionary in a function. We can change and test that part of our application without caring about the rest. However, we still have a decent chunk of logic not covered by our tests. Let's continue with the same approach of extracting pure logic and isolating the logic responsible for forming the message we are printing later.

We can create a new test file called `formMessage.spec.ts` and write a simple test case to generate a message for a given word and a list of anagrams. We can greedily capture the entire message that requires multiple `console.log` calls in a single string. Technically, we are slightly changing the behavior of our application, but we are doing it in a way that is irrelevant to our users. We are still displaying the same message but doing it in a easier way to test. This is only sometimes possible, and we will see how to deal with this in upcoming sections.

```ts
import { expect, it } from 'vitest';
import formMessage from './formMessage';

it('should display a message for a given list of anagrams', () => {
  const anagrams = ['dusty', 'study'];

  expect(formMessage(anagrams)).toEqual(
    `There are 2 anagrams in the dictionary:
  - dusty
  - study`);
})
```

You can run this test with `npm test formMessage`.

Write a `formMessage.ts` implementation that passes the test. Once your test passes, you can spend a few minutes refactoring your implementation to make it more readable.

You might also notice that now that our code is isolated, we can more easily see various edge cases, such as:

- what if there is only one anagram? We would have "There are 1 anagrams..." message, which is not grammatically correct.
- what if there are no anagrams? We would have "There are 0 anagrams... :" message, which ends with a colon `:` and nothing after it, which seems out of place.

Once we isolate our logic, these cases become very easy to notice. We can then add additional test cases to cover these scenarios.

**Step 7. Refactor index.ts to use our new functions.**

Once you are done, you can check the `anagrams-7` folder for a possible solution.

## Test Doubles and Mocks (1 hour)

We have managed to extract and move all pure functions from our main module into their own testable walled gardens. However, some concerns still need to be covered by our tests.

You might be tempted to skip testing such a minimal piece of I/O, where we are simply reading a file and printing the result of our pure functions to the console. It is understandable. However, we are going to do it anyway to demonstrate how to test these tricky parts because:

- we want to demonstrate a few concepts in an easy-to-understand example
- you might not have the luxury of working with a codebase that can capture its I/O in just a few lines of code
- in a different project, that particular piece of logic might be significant enough to warrant testing
- you or someone else might make a slight change that will break your application in a way that is not covered by your current tests, and you will not notice it
- you might have to test it because it is a requirement of your project

What should we do in this case?

We can address this by **mocking our function calls**. What are mocks? We generally recommend to use the definitions from Gerard Meszaros and Martin Fowler:

- **Read: [TestDouble](https://martinfowler.com/bliki/TestDouble.html)**

Colloquially, though, the term "mock" is used to refer to various types of test doubles. We will use a **spy** - a stub function that records how it was called.

**Step 8. Add a test for displaying the results.**

We have been using tests to check the return value of our functions. This is the simplest way to test a piece of logic, and it should be preferred over all others whenever our function's behavior is entirely captured by its return value.

However, sometimes, we must test logic with a side effect. In our case, we are printing the results to the console. How can we test this?

Vitest has built-in support for various types of test doubles. You can find more information about them in [Vitest documentation](https://vitest.dev/guide/mocking.html). Mocking in Vitest works much like mocking in Jest. You can use any Jest tutorial for Vitest tests. While jest uses the `jest` global variable, Vitest uses the `vi` imported variable. For example, `jest.spyOn()` becomes `vi.spyOn()`.

Write a test file `showAnagrams` which will test a new function `showAnagrams` that captures all non-specific logic from `index.ts`. `index.ts` should only contain the following:

```ts
import { join } from 'path'
import showAnagrams from './showAnagrams'

const DICT = join(__dirname, './words.txt')

// we want to use a specific dictionary and a specific word
// however, we want to test for the general case, so we will
// move all generic logic to a separate module
showAnagrams(DICT, 'coding')
```

Here is the test example (`showAnagrams.spec.ts`):

```ts
import { expect, it, vi } from 'vitest';
import showAnagrams from './showAnagrams';

// here we are overwriting the global console module
vi.stubGlobal('console', {
  // here we are creating a stub function that tracks how it was called (spy)
  log: vi.fn(),
});

it('should print a list of anagrams to the console found in the dictionary path', async () => {
  await showAnagrams('./words.txt', 'study');

  expect(console.log).toHaveBeenCalledWith('There is 1 anagram in the dictionary:\n  - dusty');
})
```

You can run this test with `npm test showAnagrams`.

Refactor your `showAnagrams.ts` to make the test pass and use `showAnagrams` in `index.ts`.

**Step 9. Isolate reading from the file system.**

We have managed to isolate the logic responsible for displaying the results. However, we are still reading from an actual file system. If we add a few more words to our dictionary file, our `showAnagrams` test will break, which is incorrect. `showAnagrams` is doing its job perfectly. We have deliberately isolated it from the actual `words.txt` file to make sure that it is not affected by the contents of the file. If `showAnagrams` does not ever mention `words.txt` in its code, it should not break if `words.txt` is changed or removed.

The fault lies at the consumer of `showAnagrams` - `index.ts` - providing the path of a no longer existing file.

We can isolate it with a `vi.mock` function. This function will allow us to provide a fake implementation for a module. We can then use this fake implementation to test our function.

```ts
// in our test file
vi.mock('fs/promises', async () => {
  // use the actual implementation of fs/promises
  const actual = await vi.importActual('fs/promises');

  // overwrite the readFile function with our fake implementation
  return {
    ...actual as any,
    readFile: async () => 'dusty\nstudy',
  }
});
```

We have isolated our test from the I/O by mocking out the file system. We can now change the contents of the file system without affecting our test.

**Step 10. Writing an integration test**

We have tested individual parts of our system. We will write an integration test that checks everything with minimal to no mocking.

We could run it entirely in an E2E style, launching a separate process and checking the output. However, this is not necessary in our case. We can refactor our `index.ts` to make it more testable:

```ts
import { join } from 'path'
import showAnagrams from './showAnagrams'

// everything this module does is within this function
export default async function main() {
  const DICT = join(__dirname, '../words.txt')
  const WORD = 'code'

  return showAnagrams(DICT, WORD)
}

// Node.js shortcut, which resolves to `true` if we call the file directly.
// If file is called directly -> run the main function
if (require.main === module) main()
```

**Task:** Write an integration test that checks the console output of the `index.ts` module. Since this is not a unit test once we deal with real I/O and it's a test of our entire application down to the last detail, we can store the test file in a separate `tests` folder at the project root. For example, `tests/printAnagrams.test.ts`. That folder should import the entire application `import printAnagrams from '../src'` and perform expectations on the side-effects (`console.log`).

You might consider having no fake implementations, including using the actual file system and the actual console. For the console, we can preserve its original implementation by attaching a spy to it:

```ts
// before your test cases
const consoleSpy = vi.spyOn(console, 'log');

// in your test case
expect(consoleSpy).toHaveBeenCalledOnce()
expect(consoleSpy).toHaveBeenCalledWith(message)
```

Once done, review the `anagrams-10` folder for a possible solution.

## Code coverage (0.5 hours)

Code coverage is a metric that measures the percentage of code that is "touched" by running tests. It is a valuable metric to check which parts of your applications lack tests. Code coverage can not tell much about your test quality, but it can point you to parts of your application that are not tested.

As an analogy, imagine a metric called "water coverage" for a washing machine. It cannot tell if your clothes got adequately washed, but it sure can tell if they got wet, and that's a good start.

We should have done a pretty good job in our simple example, but have we covered all of it?

**Step 11. Investigate your code coverage.**

Vitest has some easy instructions on how to set up code coverage. You can find them in [Vitest documentation](https://vitest.dev/guide/coverage.html).

In our case, we can run `npm i -D @vitest/coverage-v8`, add `"coverage": "vitest run --coverage"` to `package.json` `scripts` for ease-of-use and inform Vitest that we want to use the V8 coverage provider in a new `vitest.config.ts` file:

```ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    coverage: {
      provider: 'v8', // uses @bcoe/v8-coverage behind the scenes
    },
  },
})
```

Run `npm run coverage`. You should see the summary of results in your terminal.

Now, open up the generated `coverage/index.html` file. You can open it in your file browser or by right-clicking `coverage/index.html` in VS Code and selecting "Open with Live Server", given you have the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension installed.

Familiarize yourself with the interface. You can see that we have very high code coverage. You should find at least 1 line that needs to be covered. Should it be covered, or is it reasonable that it has escaped our tests?

It is a valuable metric to track, but it should not become an end in itself. Do not get the idea that maximizing a code coverage metric is the goal of testing. It is not. There are many ways to cheat the metric by simply doing an integration test that checks a single optimistic scenario. Then, you would have high test coverage, but your application would not be tested well.

Testing aims to give you the confidence to extend and change your application. If you use TDD, tests are also a tool to guide your application design while ensuring your code works as expected without sacrificing maintainability and flexibility. Code coverage is just one of the tools that can help you monitor your progress.

"When a measure becomes a target, it ceases to be a good measure" - [Goodhart's law](https://en.wikipedia.org/wiki/Goodhart%27s_law). **Instead of maximizing a metric, focus on adopting practices aligned with the underlying reason why that metric is measured.**

## Dependency injection (1 hour)

We have used a light TDD flow for our refactoring. However, mocking every dependency this way has some serious drawbacks:

- it is fragile - if we change the implementation details, we also have to change our tests. This is not ideal because our tests become just as coupled to implementation details as our code. Changing one usually requires changing the other. Ideally, we want to be free to change our code and not break our tests as long as our module does what it should.
- technical limitations when mocking modules and global variables - we can not interact with imported module-level mocks easily in our tests, which makes it hard to test some scenarios
- mocking modules and globals is a very blunt tool that often leads to lots of ugly procedural code when we want to test various scenarios with different mocks that involve sad paths, etc. Since our mocks are global, we must start involving mock resets and clears.
- we lose the ability to use mocked tools in our tests - if we mock out `console.log` and we try to use it in our tests just for debugging purposes, it would not work (if mocked), or our tests would break (if spied and we check the number of calls in our test).

We can address these issues by using **dependency injection**. Dependency injection is a technique where we provide dependencies into our functions instead of relying on global variables or module-level imports. This allows us to easily swap out dependencies in our tests without doing any "magic" behind the scenes where we are intercepting module imports.

- Watch: [Dependency Injection, The Best Pattern](https://www.youtube.com/watch?v=J1f5b4vcxCQ), a high-level overview (13 min)
- Watch: [Dependency Injection basics](https://www.youtube.com/watch?v=0X1Ns2NRfks) (22 min)
- Watch: [TDD with dependency injection in Node](https://www.youtube.com/watch?v=FkuLFKZ2vC4) (22 min)

## Exercise: Anagrams with dependency injection (2 hours)

Let's apply dependency injection to our anagram example. What should we inject?

We could inject every dependency we have, including internal and external ones. However, we generally inject dependencies we want to swap out or make our code hard to test. In our case, there are two dependencies that we should consider injecting:

- what goes in - getting the list of words
- what goes out - displaying the results

We are not touching these parts in the `formMessage` and `getAnagrams` functions because they are already isolated from side-effects. That is a good sign. We can focus on the `showAnagrams` part, which directly interacts with the file system and the console.

Instead of these interactions, we would like to inject 2 functions:

- one that could retrieve a list of words from any data source: file system, internet, database, etc.
- one that could display the result message in any way: console, request-response, writing to a file, etc.

**Step 12. Refactor the showAnagrams to use a desired interface.**

Our test currently looks something like this:

```ts
import { expect, it, vi } from 'vitest';
import showAnagrams from './showAnagrams';

// here we are overwriting the global console module
vi.stubGlobal('console', {
  // here we are creating a stub function that tracks how it was called (spy)
  log: vi.fn(),
});

vi.mock('fs/promises', async () => {
  const actual = await vi.importActual('fs/promises');

  return {
    ...actual as any,
    readFile: async () => 'dusty\nstudy',
  }
});

it('should print a list of anagrams to the console found in the dictionary path', async () => {
  await showAnagrams('./words.txt', 'study');

  expect(console.log).toHaveBeenCalledWith('There is 1 anagram in the dictionary:\n  - dusty');
})
```

We want our `showAnagrams` to no longer be responsible for choosing how it will get and display the results. Instead, it will be provided with 2 functions that it can use to get and display the results. This will make it much easier to test. Also, it will make it much easier to change the implementation details of how we get and display the results.

How would we like to use our `showAnagrams` function in an ideal world? Let's assume this function needs to be responsible for getting and displaying results, but it does not need to be responsible for choosing how to do it as we want to make it easy to swap out these parts.

We can not pass in `./words.txt` as we want it to support various strategies for getting words. What is in common with all these strategies that return a list of words? Well... they return a list of words!

So even a function like this should work:

```ts
const getDictionary = () => ['dusty', 'study']
```

What is in common with any strategy for displaying the results? They accept a string and hopefully do something with it. So this should work:

```ts
// this is not doing anything
const print = (message: string) => {}
```

We could use these functions to use these simple interfaces:

```ts
const getDictionary = () => ['dusty', 'study']
const print = (message: string) => {}

await showAnagrams(
  getDictionary,
  print,
  'study'
);
```

We have moved away from knowing what is inside of `showAnagrams`. That also means, we can ditch our module mocks. **So this entire part can be deleted**:

```ts
// here we are overwriting the global console module
vi.stubGlobal('console', {
  // here we are creating a stub function that tracks how it was called (spy)
  log: vi.fn(),
});

vi.mock('fs/promises', async () => {
  const actual = await vi.importActual('fs/promises');

  return {
    ...actual as any,
    readFile: async () => 'dusty\nstudy',
  }
});
```

Neat. Our test might look something like this:

```ts
import { expect, it, vi } from 'vitest';
import showAnagrams from './showAnagrams';

it('should print a list of anagrams to the console found in the dictionary path', async () => {
  const logger = vi.fn(); // a mock function that do not cares about inputs and returns nothing, just like our print function

  await showAnagrams(
    () => ['dusty', 'word'],
    logger,
    'study',
  );

  expect(logger).toHaveBeenCalledWith('There is 1 anagram in the dictionary:\n  - dusty');
});
```

Update your `showAnagrams.ts` to pass the tests.

**Note:** In this simple example, we could take away the responsibility of getting the list of words and displaying the result from the `showAnagrams` function. That might be a decision we would make if this were our actual application in the real world. However, we might not have this possibility in various cases where the logic is slightly more complicated, so we will work with the constraint that `showAnagrams` function needs to be responsible for getting and displaying the results.

<details>
  <summary>Click to see a hint</summary>

  ```ts
  // getting a list of words is simply any function that returns a list of words - string[].
  // We allow asynchronous functions too (file system, internet, db...). We could exclusively
  // demand all functions to be asynchronous, but in this case, we choose to make our interface
  // more permissive. You can choose to make it more strict if you want to.
  type GetDictionary = () => string[] | Promise<string[]>

  // printing is simply a function that takes a string, and we do not care about the return value
  // technical note - we might want to allow the function to return a Promise<void> to allow
  // for asynchronous error propagation, but that's not important for this example
  type Print = (message: string) => any

  export default async function showAnagrams(
    getDictionary: GetDictionary,
    print: Print,
    word: string
  ) {
    // update your current showAnagrams to use the injected functions
  }
  ```
</details>

**Step 13. Update your integration test and src/index.ts to use the new interface.**

Since `showAnagrams` is no longer responsible for picking the tools for the job, this responsibility bubbles up to its consumer/call - the `src/index.ts`. Update `index.ts` and ensure all tests pass (`npm test`).

Once done, review the `anagrams-13` folder for a possible solution.

**Step 14. Experiment with different strategies.**

Our `showAnagrams` is very flexible now. We can easily swap out the technical details of how we get and display the results. Let's try it out.

```ts
// showAnagrams.spec.ts, an additional test case:

it('should allow printing a list of anagrams from the internet', async () => {
  const logger = vi.fn();

  await showAnagrams(
    async () => {
      const response = await fetch('https://raw.githubusercontent.com/dwyl/english-words/master/words.txt');

      return (await response.text()).split('\n')
    },
    logger,
    'code',
  );

  // in this case, it is quite fine to have a wrong assertion first
  // and then adapt it to the actual output. Our unit tests
  // are robust enough that we can be confident that our function
  // is working as expected.
  expect(logger).toHaveBeenCalledWith([
    'There are 3 anagrams in the dictionary:',
    '  - coed',
    '  - deco',
    '  - ecod',
  ].join('\n'));
})
```

Here we are using actual `fetch`, but we could mock it out to make our tests faster and less flaky. We could also use a different strategy for getting the list of words, such as reading from a database. We could also write our results to a file, send them to a server, etc.

We could then copy-paste this test to new `showAnagramsFromWeb(url)`, `showAnagramsFromDatabase(database)` functions to encapsulate these strategies into an easy-to-use interface. Our single `showAnagrams` function can now handle many different scenarios. We can easily swap out the technical details of how we get and display the results. We can also quickly test it without any mocks or stubs, though we can do so if we want to. Transitioning between a unit test and an integration test is now changing the injected functions.

We also could shift around the responsibilities between our modules. For example, we could decide that we want our application's `print` part to form its message string given a list of matched anagrams. We could decide we want multiple anagram strategies - matching partial anagrams, matching multi-word anagrams, etc. No matter what we choose, our application is in a better shape to handle these changes, especially if they need to be selected at runtime.

It might seem like a lot of work for a simple example like this. That is because our main logic is elementary. However, in a real-world application, our main logic might be much more complicated, and this approach would make it much easier to test, refactor, and change. The hard part might be to develop a good interface for our dependencies and decide what should be our module's responsibility and its consumer's responsibility (caller).

## Dependency injection with objects (1 hour)

It is pretty straightforward to use dependency injection with functions. However, what if we inject a dependency for many functions, for example, for an entire module?

Let's say we have a file `user/model.ts` that contains functions necessary to work with `user` table in our database.

```ts
// we will use pseudo-code for database methods
import database from '@/database'

function createUser(user: User) {
  return db.insertInto('user').values(user)
}

function findUser(id: number) {
  return db.selectFrom('user').where({ id }).first()
}

function updateUser(id: number, userData: User) {
  return db.update('user').where({ id }).values(userData)
}
```

Let's also say that testing with mocks that intercept `@/database` module imports starts causing various issues and makes our tests harder to read and maintain.

We want to restructure our code to make it easier to test. How could we pass a database instance into these functions for easier testing?

There are various approaches, such as:

1. Passing a database instance into each function.
2. Wrapping everything inside a function which returns an object with all the functions.
3. Using a class that accepts a database instance in its constructor and exposes all the functions as methods.

Here is what each of them would look like:

```ts
// 1. Passing a database instance into each function
export function createUser(db: Database, user: User) {
  return db.insertInto('user').values(user)
}

export function findUser(db: Database, id: number) {
  return db.selectFrom('user').where({ id }).first()
}

export function updateUser(db: Database, id: number, userData: User) {
  return db.update('user').where({ id }).values(userData)
}

// usage
createUser(db, user)
```

1. This approach is relatively straightforward. However, by default, it is quite lengthy, and we will need to pass around the database instance to all required functions, which introduces additional complexity. Now, every function that wants to work with the User model needs to know that it needs to pass in a database instance, which mixes the concerns, which is not ideal. This simple approach has a few interesting advantages:

- very easy to test
- easy to refactor our code into separate modules with isolated tests as everything is ready to be moved to a separate module
- there are advanced techniques that can make this approach more elegant, such as partial application/currying, but we will not cover them now

```ts
// 2. wrapping everything inside a function which then returns
// an object with all the functions
export default (db: Database) => ({ // same as return { ... }
  createUser(user: User) {
    return db.insertInto('user').values(user)
  },

  findUser(id: number) {
    return db.selectFrom('user').where({ id }).first()
  },

  updateUser(id: number, userData: User) {
    return db.update('user').where({ id }).values(userData)
  },
})

// usage
const userModel = UserModel(db)
userModel.createUser(user)
```

2. This is called a **factory function**, and it is a common JavaScript pattern. It is just a function returning an object, but it does the job. We can easily inject a database instance, which is available for the methods we define inside the object. This technique has a few unique advantages over classes:

- it can be created asynchronously without any initialization methods
- it is easy to move functions to separate modules as nothing depends on `this` keyword
- it can destructured so we can use and pass around only the methods we need
- everything that is not returned is automatically private, so we have safe-by-default private/public separation

```ts
// 3. using a class that accepts a database instance in its
// constructor and exposes all the functions as methods
export default class UserModel {
  constructor(private db: Database) {}

  createUser(user: User) {
    return this.db.insertInto('user').values(user)
  }

  findUser(id: number) {
    return this.db.selectFrom('user').where({ id }).first()
  }

  updateUser(id: number, userData: User) {
    return this.db.update('user').where({ id }).values(userData)
  }
}

// usage
const userModel = new UserModel(db)
userModel.createUser(user)
```

3. This approach is also quite good and allows for injecting a different database instance easily. It also has a few unique advantages over factory functions:

- for high instance counts (1000s of instances), it is more performant than factory functions
- a clear and familiar structure for anyone with an OOP background
- allows the use of inheritance
- methods to check whether an object is an instance of a class and not just an object with the same type signature

All three approaches are valid and can be used in different scenarios.

There are two additional `anagrams` examples for these techniques. Both solutions use a different anagram algorithm, which performs some pre-computing for object-based design to make more sense.

- You can review code in the provided `anagrams-example-functions` folder for a factory-function-based Anagrams solution.
- You can review code in the provided `anagrams-example-classes` folder for a class-based Anagrams solution.

## Testing Express.js applications (1 hour)

We have gone through a simple example of how to test a module. When dealing with a module you can isolate, you should use the same approach.

What about Express.js applications? Express.js applications tend to have 2 types of tests:

- unit tests - tests that check the behavior of modules in isolation. Great for repositories, schemas, and layers over a 3rd party API).
- integration tests - tests that check the behavior of our application with its dependencies. This is great for testing controllers and your entire application.

In Express, unit tests can look like the ones we have written. Meanwhile, integration tests will require us to write expectations on the HTTP response. We will use a library called [supertest](https://www.npmjs.com/package/supertest) which is well-suited for testing Express.js applications.

- Watch: [Testing Node Server](https://www.youtube.com/watch?v=FKnzS_icp20) (12 min)
- Watch/Read: [Dependency Injection](https://www.sammeechward.com/dependency-injection-in-javascript) (10 min)
- Watch/Read: [Mocking a Database in Node with Jest](https://www.sammeechward.com/mocking-a-database-with-jest-in-javascript) (15 min)

## Exercise: integration tests in an Express app using TDD (3.5 hours)

We will have a warm-up for the upcoming TDD pair programming exercise.

For our warm-up, we will revisit our Express.js blog application.

Download and review the provided project template. It has some significant differences from the previous versions:

- it uses dependency injection to provide a database instance to all modules that need it;
- it has the Vitest setup and is ready to go;
- it has additional test utilities for creating test database instances and running migrations;
- for tests that require a database, it creates an in-memory SQLite database and runs all migrations on it to reach a fresh state;
- tests have `*Factory` utility that produces a basic cookie-cutter object that can be used to create a new object in the database. This allows us to easily create isolated tests that are easy to fix when our database evolves;
- tests have `*Matcher` utility, which has the same purpose as `*Factory` but is used for testing the shape of the server response.

For this project, dependency injection (DI) is propagated through the entire application. This means all modules needing a database instance will receive it as a parameter. A project with more DI would provide controllers with services, services with repositories, etc. However, this would be an overkill for our simple application.

**Task: Implement the following new requirement:**

```
To organize articles, authors want to be able to associate articles with categories. Categories have a name and an ID.

API should allow:

- creating new categories
- providing a category ID when creating an article
- setting a category ID when updating (PATCH) an article
- get a list of categories directly through /categories endpoint

There can be many categories, but an article may optionally be associated only with a single category.

Which additional cases should be tested?
```

You can use the existing tests as a guide. Feel free to copy-paste various parts and adapt them to your needs. Once you have some new tests, you can start implementing the new functionality. Start with the simplest test case and work up to more complicated ones.

# Directions for further research (1 hour+)

{{ MUST: add }}

## Optional: (Advanced) DI with function factories (1 hour)

- Watch: [Dependency Injection without classes](https://www.youtube.com/watch?v=sD94szvFqGw) (22 min)
- Watch: [Advanced Dependency Injection without classes](https://www.youtube.com/watch?v=6YBV1cKRqzU) (29 min)

JavaScript allows dependency injection with classes, function factories, and factory functions.

```ts
// function factory - function that produces a function ready for use
const displayNode = (log) => (name, value) =>
  log(`Node Name: ${name}, Node Value: ${value}`);

// does not do anything yet
const logNode = displayNode(console.log);

displayNode1('Node1', 10); // Output: Node Name: Node1, Node Value: 10

// another, more intuitive example, using currying
const greet = greeting => name => `${greeting}, ${name}!`;

const greetInEnglish = greet('Hello');
const greetInLithuanian = greet('Labas');
const greetInSwahili = greet('Habari');

greetInEnglish('Mary'); // Hello, Mary!
greetInLithuanian('Carlos'); // Labas, Carlos!
greetInSwahili('Medina'); // Habari, Medina!
```

```ts
// factory function - a function that produces an object
// within its closure
function createNode(log, name, value) { // could use => syntax
  return {
    name,
    value,
    toString() {
      log(`Node Name: ${this.name}, Node Value: ${this.value}`);
    }
  };
}

const node = createNode(console.log, 'Node1', 10);

node.toString(); // Output: Node Name: Node1, Node Value: 10
```

```ts
// class - a blueprint for creating objects
class Node {
  constructor(log, name, value) {
    this.name = name;
    this.value = value;
    this.log = log;
  }

  toString() {
    this.log(`Node Name: ${this.name}, Node Value: ${this.value}`);
  }
}

const node = new Node(console.log, 'Node1', 10);

node.toString(); // Output: Node Name: Node1, Node Value: 10
```

Which structure should you prefer? There are no hard rules. However, some guidelines can help you make a decision:

- choose the simplest structure that gets the job done given reasonable expectations for possible changes
- choose what is the most familiar to your team and what is the most idiomatic for your framework
- if a module is a singleton that does not require any instantiation - export plain functions directly - utilities, helpers, validation functions, etc.
- if your module is satisfying a small task with no state changes over time - use a higher-order function (function factory) if you need to inject a few dependencies
- if you are creating 1000s of instances in a short period of time - use classes, as they are more performant since all function definitions are reused across instances in the prototype chain. This does not apply if you are immediately disposing of the instances.
- if you want to encapsulate all module behavior with a long-lived state - prefer classes. Example - databases, connections to remote servers, etc.
- if you are creating a limited number of instances and you want to be able to have lots of flexibility while using composition over inheritance - use function factories
