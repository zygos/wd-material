import formMessage from './formMessage'

type Print = (message: string) => any
type GetDictionary = () => string[] | Promise<string[]>

/**
 * We could have provided the print function in the printAnagrams method,
 * but we chose to inject it in the constructor to showcase the situation
 * where we do not want to allow the print function to be configured
 * after the object has been created.
 * For a dependency is needed only for a single method, you should provide
 * the dependency as an argument to the method where it is needed.
 * However, there are cases where it makes sense to inject them in the
 * constructor.
 */
export default class AnagramSolver {
  private dictionary: Map<string, string[]> | null = null

  constructor(private print: Print) {}

  async loadDictionary(getDictionary: GetDictionary) {
    this.dictionary = buildAnagramMap(await getDictionary());
  }

  getAnagrams(subject: string): string[] {
    if (!this.dictionary) throw new Error('Dictionary has not been loaded');

    const sortedWord = sortWord(subject);

    return this.dictionary
      .get(sortedWord)
      ?.filter(word => word !== subject) ?? [];
  }

  printAnagrams(anagrams: string[]) {
    const message = formMessage(anagrams);
    this.print(message);
  }
}

/**
 * Instead of using an array, we transform the dictionary into a map
 * where the keys are the sorted words and the values are arrays of
 * words that are anagrams of the key.
 * This is an expensive one-time operation, but it allows us to
 * perform the anagram search faster, which is useful if we are running
 * a server that needs to respond to requests quickly and we can afford
 * to spend some time on the initialization.
 */
function buildAnagramMap(dictionary: string[]) {
  const dictionaryMap = new Map<string, string[]>()

  for (const word of dictionary) {
    const wordSorted = sortWord(word)

    if (!dictionaryMap.has(wordSorted)) {
      dictionaryMap.set(wordSorted, [])
    }

    dictionaryMap.get(wordSorted)!.push(word)
  }

  return dictionaryMap
}

function sortWord(word: string) {
  return word.split('').sort().join('')
}
