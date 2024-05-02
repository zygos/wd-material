
**Step 9. Writing an integration test**

We have tested individual parts of our system. We will write an integration test that checks everything with minimal to no mocking.

We could run it entirely in an E2E style, launching a separate process and checking the output. However, this is not necessary in our case. We can refactor our `index.ts` to make it more testable:

```ts
import { join } from 'node:path'
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
