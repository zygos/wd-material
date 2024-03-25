Part 2: Hands-on: Query builders, Configuration and Validation

# Part introduction

{{ MUST: add }}

# Key learning topics & resources for this part

## Why tests?

Writing tests in the back-end is even more important than writing them in the front-end. Why? Because the back-end is where the business logic of your application lives. If you make a mistake in the back-end, it can have hard-to-undo consequences. It can lead to data loss, security breaches, and other problems.

## Test-Driven Development (TDD) (0.5 hours)

- Watch: [How TDD is related to Quality of Code ("Uncle" Bob, author of Clean Code)](https://www.youtube.com/watch?v=is41fgDrqn0) (10 min)

While we have briefly introduced you to test-first development, we primarily guided you through the process of adding tests to an existing project. That is a good practice to follow. At the same time, while the benefits of tests are clear, **it can be hard to see the value of tests when your application already works**. At that moment you, as a developer, have peak (unearned) confidence in your code. You _kind of_ know it works because you just manually tested it and you know how it works because you just wrote it. You could write tests... or you could move on to the next feature. So, quite often, tests are added as an afterthought, if at all.

This short-term thinking is dangerous and can lead to a situation where seemingly any change will break something in unexpected ways that you can't predict. You might have experienced this yourself. Sometimes trying to fix a bug in one place breaks something in another place. Or maybe it breaks it and you do not notice it before it is time to deploy the application, or in our case, to present your project. This is called **regression** and it is a common problem in software development, which tends to get worse as the project grows.

So, how can we avoid this? How can we integrate testing into our regular development process? Well, when you think about it, **we are testing our applications all the time**, but not in an automated manner. We write some code, we run the application, we check if it works. We are already testing our code, just very inefficiently. And then if we add automated tests later, we are repeating the same job twice.

It is as if we had to a task of exporting data from a database to an Excel file, so we do it by hand by copy pasting rows across sheets, rearrainging them, formatting them, etc. And once we are finished with the task, we write a script to automate this job for us. That does not make sense. Why didn't we just write the script in the first place??

This is where **Test-Driven Development (TDD)** comes in. TDD is a software development practice where you **write tests before you write the code satisfying those tests**. The cycle of TDD is as follows:

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

**Note on code coverage:** Code coverage is a metric that measures the percentage of code that is "touched" by running tests. It is a useful metric to track, but it should not become an end in itself. Code coverage alone can not tell you if you have tested your code well. Do not get the idea that maximizing a code coverage metric is the goal of testing. It is not. The goal of testing is to guide your application design while make sure that your code works as expected without sacrificing maintainability and flexibility. Code coverage is just one of the tools that can help you monitor your progress. "When a measure becomes a target, it ceases to be a good measure" - [Goodhart's law](https://en.wikipedia.org/wiki/Goodhart%27s_law). Instead of trying to maximize a metric, focus on adopting practices that are aligned with the underlying reason why that metric is measured.

## Exercise: Anagrams (2 hours)

{{ MUST: revise anagrams }}
{{ start first with functions, then move on to classes }}

We will go through a few general ideas behind TDD with a simple example of a program that displays a list of [anagrams](https://en.wikipedia.org/wiki/Anagram) for a given word. We will remember how to **write a class in TypeScript** and how to write tests for it. We will also learn how to use a **mock function** and **dependency injection** to test **side-effects**.

- Watch: [How TDD leads to application design](https://www.youtube.com/watch?v=ln4WnxX-wrw). **We have provided some timestamp-based notes with a few exercises. Make sure you read the appropriate note/exercise at a given timestamp. Alternatively, you can watch the entire video and then come back to the notes.**

We will explore some ideas on how to write testable code and how to use TDD to guide the design of your application. The presenter commits to a class called `Anagrams` and then writes tests for it that guide the implementation of the class. This approach leads to some over-engineering, but that is understandable because the presenter is trying to demonstrate a few concepts at once for an easy-to-understand problem.

For this section, we will stick to the original implementation as much as possible.

---

**6:53:** 1. In the video, you will be shown a few examples of a simple program that counts the number of anagrams in a list of words.

These video provides examples written in Python and we will provide the first few examples in TypeScript to get you started.

For our TypeScript version, let's perform a minimal setup:

```bash
# folder
mkdir anagrams
cd anagrams

npm init -y
npm i -D tsx @tsconfig/node18 @types/node vitest

# list of popular words, we will use this as our
# dictionary instead of relying on OS-specific dictionaries
wget https://raw.githubusercontent.com/dolph/dictionary/c65f04b0b5b27a981f437b940cf62fe71320d5ec/popular.txt -O words.txt

code tsconfig.json
```

`tsconfig.json`:

```json
{
  "extends": ["@tsconfig/node18/tsconfig.json"],

  "compilerOptions": {
    "strict": true,
  }
}
```

For a small playground-like script like this, we will skip setting up our a larger toolchain and just use `tsx` and `vitest` to run our code and tests.

Here is the first code example shown in the video:

```ts
import { readFile } from 'fs/promises'

const DICT = './words.txt'

const showAnagrams = async (word: string) => {
  const words = (await readFile(DICT, 'utf-8')).split('\n')
  const anagrams: any[] = []

  for (const anagram of words) {
    if (isAnagram(word, anagram)) {
      anagrams.push(anagram)
    }
  }

  console.log(`There are ${anagrams.length} anagrams of ${word} in the dictionary.`)

  for (const anagram of anagrams) {
    console.log(anagram)
  }
}

const isAnagram = (root: string, word: string) => {
  for (const letter of word) {
    if (root.includes(letter)) {
      root = root.replace(letter, '')
    } else {
      return false
    }
  }

  return true
}

showAnagrams('coding')
```

We could name it `anagramsFirst.ts` and run this code with `npx tsx anagramsFirst`.

---

2. **12:03:**. Here is the first test case (`Anagrams.spec.ts`):

```ts
import { it, expect } from 'vitest'
import Anagrams from './Anagrams'

it('should list same word as anagram', () => {
  const anagrams = new Anagrams(['testword'])

  expect(anagrams.listAnagrams('testword')).toContain('testword')
})
```

---

3. **13:00:** Here is the first step in the Anagrams class implementation (we are calling `Anagrams.ts`):

```ts
export default class Anagrams {
  wordList: string[]

  constructor(wordList: string[]) {
    this.wordList = wordList
  }

  listAnagrams(word: string) {
    const words: string[] = []

    for (const anagram of this.wordList) {
      if (word === anagram) {
        words.push(anagram)
      }
    }

    return words
  }
}

```

We can run the test with `npx vitest`.

---

4. **13:52:** Here you will be introduced to using **a mock function** to test the display of the results.

Right now, our `Anagrams` class has a **side-effect** - it prints the results to the console. Side effect is any effect that is not directly related to the return value of a function.

We would like to test that the results are displayed correctly, but we do not want to print anything to the console. Instead, we will design our `Anagrams` class to accept a method for displaying the results.

In our application, that might mean using `new Anagrams(['testword'], console.log)` to display the results in the console. But in our tests, we can use a different function - a mock function. In this case, we are technically using a spy stub, which is just a dummy function that records how it was called. We can then use this information to make assertions about how the function was called.

You might have heard of it as **dependency injection** and if we wanted to use multiple display methods, we might even call it as a **strategy pattern** where we can swap out the display method at runtime.

Now, this might sound a bit overwhelming and we generally agree that this is a bit too much for a simple program like this. Not only due to the complexity of the code, but also because use of OOP patterns early on can lead to over-engineering and poor design.

Later on, we will show you a simpler way of arriving at the same result. But for now, we are sticking to the original implementation.

Here are tests that you will need to pass:

```ts
import { it, expect, vi } from 'vitest'
import Anagrams from './Anagrams'

// technically, this is a spy stub
const displayMock = () => vi.fn()

it('should list same word as anagram', () => {
  const anagrams = new Anagrams(['testword'], displayMock())

  expect(anagrams.listAnagrams('testword')).toContain('testword')
})

it('should reject words that add new letters', () => {
  const anagrams = new Anagrams(['testword', 'test'], displayMock())

  expect(anagrams.listAnagrams('test')).not.toContain('testword')
})

it('should list all anagrams', () => {
  const anagrams = new Anagrams(['abc', 'bac'], displayMock())

  expect(anagrams.listAnagrams('abc')).toEqual(['abc', 'bac'])
})

it('should display results', () => {
  const display = displayMock()
  const anagrams = new Anagrams(['abc', 'bac', 'trent'], display)

  anagrams.listAnagrams('cba')

  expect(display.mock.calls).toEqual([
    ['There are 2 anagrams of cba in the dictionary'],
    ['abc'],
    ['bac'],
  ])
})
```

**Task:** Implement a class that satisfies these tests. Try to write the class without looking at the video. If you get stuck, you can look at the video for guidance.

<details>
  <summary>Click to see the implementation</summary>

This solution sticks to the original implementation as much as possible.

```ts
type Display = (message: string) => void

export default class Anagrams {
  wordList: string[]
  display: Display

  constructor(wordList: string[], display: Display) {
    this.wordList = wordList
    this.display = display
  }

  listAnagrams(word: string) {
    const words: string[] = []

    for (const anagram of this.wordList) {
      if (this.#isAnagram(anagram, word)) {
        words.push(anagram)
      }
    }

    this.#displayResults(words, word)

    return words
  }

  // we are using # for private methods, which
  // is built-in in JavaScript syntax. This means that
  // it is enforced at runtime, unlike TypeScript's
  // "private" methods.
  #isAnagram(anagram: string, word: string) {
    for (const letter of anagram) {
      if (word.includes(letter)) {
        word = word.replace(letter, '')
      } else {
        return false
      }
    }

    return true
  }

  #displayResults(anagrams: string[], word: string) {
    this.display(`There are ${anagrams.length} anagrams of ${word} in the dictionary`)

    for (const anagram of anagrams) {
      this.display(anagram)
    }
  }
}

```
</details>

## Anagrams: Revisited

For a problem like this, using classes is an overkill. In general, we recommend using the simplest solution that is easy to extend in the future.

Right now, the `Anagrams` class has a few design issues:

- we can not get a list of anagrams without calling the display method (side-effect). Usually, we would like to separate the data manipulation part of our application from the side-effects. Separation does not mean putting them in separate functions/methods. Separation means that we can run the data-only part of our application without ever calling or touching the side-effect part of our application. Right now, we are always calling `displayResults` when we call `listAnagrams`.
- difficult to test - even to test the correct listing logic, we must provide a mock function for displaying the results. This is because the display logic is tightly coupled with the listing logic. If we think about it, why would we ever need introducing mocks to test a simple array filtering logic? We should be able to test the listing logic without ever touching the display logic. Moreover, adding ability to display results should not require us to go back and change every test that does not involve displaying results. Right now, all of our tests for anagrams are required to provide a mock function for displaying results, no matter if they are testing the display logic or not.

There are quite a few more technical issues that stem from the initial design decision to include display logic in the `Anagrams` class. We will not go into them here as they are not within the scope of this section.

## Exercise: Improved anagrams (1 hour)

We will try to address some of the issues with the current implementation of the `Anagrams`.

First, let's start with a general clean up.

**Task 1:** Simplify the `listAnagrams` method and, optionally, `#isAnagram` method. `listAnagrams` can use a `filter` and `#isAnagram` can be slightly simplified by using an early return. There are also some other ways to implement `#isAnagram` but we will leave that for now.

Since we are only refactoring and not introducing any new behaviour, we do not need to write any new tests. We can just run the existing tests to make sure that we did not break anything.

<details>
  <summary>Solution</summary>

```ts
// ...
listAnagrams(word: string) {
  const words = this.wordList
    .filter(wordInList => this.#isAnagram(wordInList, word))

  this.#displayResults(words, word)

  return words
}

#isAnagram(anagram: string, word: string) {
  for (const letter of anagram) {
    if (!word.includes(letter)) return false

    word = word.replace(letter, '')
  }

  return true
}
```
</details>

**Task 2:** Decouple display logic from the listing logic - we should be able to get anagrams in a list without displaying them. This might require an isolated method `getAnagrams` that returns anagrams as an array.

**Task 3**: We would like to isolate all logic related to getting anagrams from the dictionary.

**Task 4:** Allow to specify whether an anagram should be strict or not. Strict anagrams are anagrams that have the same number of letters as the original word. For example, `abc` is a strict anagram of `cba`, but `ab` is not.

## Exercise: Anagram functions (1 hour)

We have seen how to write a class in TypeScript and how to write tests for it. Now, we will try to write a solution for the same problem using functions instead of classes. Functions tend to force a clearer separation of concerns and tend to be easier to test.

**Task:** Implement a solution for the same anagrams problem in TDD manner, using functions instead of classes.

You want a solution that allows you to do the following:

- get a list of anagrams without displaying them
- display a list of anagrams with the same message as the original implementation
- it should satisfy the same test cases as the original class, though you should adapt the tests so they are calling functions instead of class methods

You might find that you need to completely decouple `listAnagrams` from `getAnagrams`.

<details>
  <summary>Solution (tests)</summary>

```ts
import { describe, it, expect, vi } from 'vitest'
import { listAnagrams, getAnagrams, getAnagramsStrict } from './anagrams-3'

describe('getAnagrams', () => {
  it('should list same word as anagram', () => {
    const results = getAnagrams(['testword'], 'testword')

    expect(results).toContain('testword')
  })

  it('should reject words that add new letters', () => {
    const results = getAnagrams(['testword', 'test'], 'test')

    expect(results).not.toContain('testword')
  })

  it('should list all anagrams', () => {
    const results = getAnagrams(['abc', 'bac'], 'abc')

    expect(results).toEqual(['abc', 'bac'])
  })

  it('should list anagrams that do not include every letter', () => {
    const results = getAnagrams(['abc', 'bac', 'ab'], 'abc')

    expect(results).toEqual(['abc', 'bac', 'ab'])
  })
})

describe('getAnagramsStrict', () => {
  it('should not list anagrams that do not contain all letters in a word', () => {
    const results = getAnagramsStrict(['abc', 'bac', 'ab'], 'abc')

    expect(results).toEqual(['abc', 'bac'])
  })
})

describe('listAnagrams', () => {
  it('should display results', () => {
    const logMock = vi.fn()

    const anagrams = getAnagrams(['abc', 'bac', 'trent'], 'cba')

    listAnagrams(logMock, anagrams, 'cba')

    expect(logMock.mock.calls).toEqual([
      ['There are 2 anagrams of cba in the dictionary'],
      ['abc'],
      ['bac'],
    ])
  })
})

```
</details>

<details>
  <summary>Solution (implementation)</summary>

```ts
type Display = (message: string) => void

export function listAnagrams(logger: Display, anagrams: string[], word: string) {
  logger(`There are ${anagrams.length} anagrams of ${word} in the dictionary`)

  anagrams.forEach((anagram) => logger(anagram))
}

export function getAnagrams(dictionary: string[], word: string) {
  return dictionary
    .filter((wordInDictionary) => isAnagram(word, wordInDictionary))
}

export function getAnagramsStrict(dictionary: string[], word: string) {
  return dictionary
    .filter((wordInDictionary) => isAnagramStrict(word, wordInDictionary))
}

function isAnagram(word: string, root: string) {
  for (const letter of root) {
    if (!word.includes(letter)) return false

    word = word.replace(letter, '')
  }

  return true
}

function isAnagramStrict(word: string, root: string) {
  return root.length === word.length && isAnagram(word, root)
}
```
</details>

We might consider abstracting our anagrams logic even more, though that is not necessary and in some regards sacrifices readability for brevity.

<details>
  <summary>Solution (implementation)</summary>

```ts
type WordMatcher = (word: string, subject: string) => boolean
type Display = (message: string) => void

export const listAnagrams = (log: Display, anagrams: string[], word: string) => {
  log(`There are ${anagrams.length} anagrams of ${word} in the dictionary`)

  anagrams.forEach(anagram => log(anagram))
}

const matchWords = (doMatch: WordMatcher) => (list: string[], word: string) =>
  list.filter(wordInList => doMatch(word, wordInList))

const isAnagram: WordMatcher = (word, root) => {
  for (const letter of root) {
    if (!word.includes(letter)) return false

    word = word.replace(letter, '')
  }

  return true
}

const isAnagramStrict: WordMatcher = (word, root) =>
  root.length === word.length && isAnagram(word, root)

export const getAnagrams = matchWords(isAnagram)
export const getAnagramsStrict = matchWords(isAnagramStrict)
```
</details>

**Note:** When would a class be an appropriate solution? If we wanted to have a long-lived object, then we might consider using a class or a factory function. There are some alternative solutions that would perform some pre-calculations on our word list to improve lookup performance, but we will not cover them in this section.

## Testing Express.js applications

{{ MUST: move to the first testing }}

**Note on Jest/Vitest compatibility.** Jest is a long-standing testing library for JavaScript. That is the reason why most tutorials online you will find involve Jest. However, Jest requires additional setup which we would like to avoid so we can focuson the main topic of this section - writing good tests. This is why we are using a Vitest for this module. Vitest offers the same testing API, so Jest and Vitest tutorials are mostly interchangeable. On top of that, Vitest runs tests quite a bit faster than Jest, which is a nice bonus when learning the TDD workflow. So, in short, Vitest experience is transferable to Jest and vice versa.

We will continue on from our previous Express.js blog application. We will add a new requirement:

```
To organize articles, authors want to be able to associate articles with categories. API should allow:

- creating new categories
- associating an article with a single category
- get a list of categories directly through /categories endpoint

There can be many categories, but an article may be associated only with a single category. Articles can have no category associated with them.
```

How would we approach this requirement? We would need 3 new endpoints:

- `POST /categories` - create a new category

# Directions for further research (1 hour+)

{{ MUST: add }}
