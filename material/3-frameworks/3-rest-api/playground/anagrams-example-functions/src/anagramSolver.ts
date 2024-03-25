import formMessage from './formMessage'
import buildGetAnagrams from './getAnagrams'

type Print = (message: string) => any
type GetDictionary = () => string[] | Promise<string[]>

/**
 * This is an example of a function that uses dependency injection.
 * We provide the dependencies as parameters, so that we can easily
 * replace them with mocks in our tests.
 * The function uses these dependencies directly or passes them to
 * other functions that are then returned in an object.
 * We could move more behavior into this function, but we chose to
 * keep it more decomposed and to show how function factories work
 * (see buildGetAnagrams).
 */
export default async function anagramSolver(
  getDictionary: GetDictionary,
  print: Print,
) {
  // we perform an async operation to load the dictionary
  const dictionary = await getDictionary()

  // then, we return an object with the functions we need
  return {
    getAnagrams: buildGetAnagrams(dictionary),
    printAnagrams: (anagrams: string[]) => print(formMessage(anagrams)),
  }
}
