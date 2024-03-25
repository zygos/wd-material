- classes are more verbose to mock - if we wanted to test a function that relies on this class and we wanted to test that function in complete isolation, we would need to provide a mock for the `Anagrams` class. Now, our tests for the parent function need to know about the `Anagrams` class structure. This would lead to a situation where we would need to go back and change our tests in multiple files in a substantial way if ever changed the `Anagrams` class.

- trying to display results in multiple ways at the same time would force us to write an additional abstraction. Example:

```ts
// let's say we have a custom logger, which writes everything to a file
// and we would like to use it AND console.log at the same time
import logger from '...'

// Now we have to either:
// 1. change our Anagrams implementation to accept multiple
// display methods in an array - we break all existing tests
const anagrams = new Anagrams(wordList, [console.log, logger.log])

// now TypeScript would complain that we did not provide a logging
// function array, so now we have to go back and change all of our
// tests to provide an array of functions.
const anagrams = new Anagrams(wordList, logMock)
// => const anagrams = new Anagrams(wordList, [logMock])

// 2. call Anagrams multiple times which requires us to perform
// the same calculations multiple times - bad for performance and
// maintainability
const anagrams = new Anagrams(wordList, console.log)
const anagrams = new Anagrams(wordList, logger.log)

// 3. write an abstraction that would allow us to use multiple
// display methods at the same time - but now our abstraction is
// introducing additional complexity
import MultiDisplay from '...' // our abstraction

const anagrams = new Anagrams(wordList, new MultiDisplay([console.log, logger.log]))

// 4. mix the internal Anagrams behaviour and additional function calls
const anagrams = new Anagrams(wordList, console.log)
const anagramsList = anagrams.listAnagrams('word')
logger.log(anagramsList)

// All of these methods are far from ideal.
```

- multiple concerns - our anagram class now handles multiple tasks - it finds anagrams and displays them. Yes, the display method is provided, which is better than having a hard-coded display method, but it is still a concern that is not directly related to finding anagrams. We would like to separate these concerns.

- our class is not truly isolated - we would need to go back and make our `wordList` and `display` properties private. Since all properties in JavaScript classes are public by default, we can not ensure that our class is truly isolated without going back and making these properties private.
- introducing a possibility for hard-to-track bugs - because there is a possible gap between calling an `Anagrams` constructor and calling `listAnagrams`, we could have a bug where we modify the `wordList` in-between these calls and now our class produces different results than expected. Example:

```ts
class Anagrams {
  // this is private due to #
  readonly #wordList: string[]

  constructor(wordList: string[]) {
    this.#wordList = wordList
  }

  countWords() {
    return this.#wordList.length
  }
}

const wordList = ['stream', 'pigeon']
const anagrams = new Anagrams(wordList)

// ... some lines of code
// one of the lines of code has the following line:
wordList.splice(0, 1)

// then, some lines later, the following line of code is executed:
console.log(anagrams.countWords()) // => 1

// we have modified wordList even though it is private!
// we have broken the encapsulation of our class
```


---

<details>
  <summary>Solution (tests)</summary>

```ts
describe('getting strict anagrams', () => {
  it('should not list anagrams that do not contain all letters in a word', () => {
    const anagrams = new Anagrams(['abc', 'bac', 'ab'], true)

    expect(anagrams.getAnagrams('abc')).toEqual(['abc', 'bac'])
  })
})
```
</details>

<details>
  <summary>Solution (implementation)</summary>

```ts
export default class Anagrams {
  isStrict: boolean
  wordList: string[]

  constructor(wordList: string[], isStrict = false) {
    this.isStrict = isStrict
    this.wordList = wordList
  }

  // ...

  #isAnagram(anagram: string, word: string) {
    if (this.isStrict && anagram.length !== word.length) return false

    for (const letter of anagram) {
      if (!word.includes(letter)) return false

      word = word.replace(letter, '')
    }

    return true
  }
}
```
</details>


---

## Optional: Dependency injection in functions returning objects (1 hour)

Let's imagine our requirements have changed and we need to optimize our anagrams for lots of queries. We could perform a simple computation vs memory trade-off and pre-process our dictionary into a Map where the key is a sorted word by letters and the value is a list of anagrams. There are quite a few ways to do this, but right now, we will focus on how to do this using an object.

We might want to end up with something like this:

```ts
type AnagramMaker = {
  getAnagrams(subject: string): string[]
  printAnagrams(anagrams: string[]): void
}
```

```ts
// Implemented as a factory function
const Anagrams = (dictionary: string[], printer: Print): AnagramMaker => {
  const dictionaryMap = buildAnagramMap(dictionary)

  return {
    getAnagrams(subject: string) {
      const sorted = sortWord(subject)
      return dictionaryMap.get(sorted) || []
    },
    printAnagrams(anagrams: string[]) {
      // ...
    },
  }
}

const anagramsViaFunction: AnagramMaker = Anagrams(['hello', 'world'])
```

```ts
// Implemented as a class
class Anagrams implements AnagramMaker {
  private dictionaryMap: Map<string, string[]>
  private dictionary: string[]

  constructor(dictionary: string[], private printer: Print) {
    this.dictionaryMap = buildAnagramMap(dictionary)
  }

  getAnagrams(subject: string) {
    const sorted = sortWord(subject)
    return this.dictionaryMap.get(sorted) || []
  }

  printAnagrams(anagrams: string[]) {
    // ...
  }
}

const anagramsViaClass: AnagramMaker = new Anagrams(['hello', 'world'])
```

From the point of view of TypeScript, both approaches result in an object that satisfies `AnagramMaker` type. There are some technical differences between the two approaches, but for services and controllers, they are mostly interchangeable.

**Note:** When would a class be an appropriate solution? If we wanted to have a long-lived object with some shared context required to encapsulate some state and behaviour. For example, a database instance is a good example where classes play to their strengths. Right now, it is OK to experiment with both approaches and see which one fits your use-case better.
