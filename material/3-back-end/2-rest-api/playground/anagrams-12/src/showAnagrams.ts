import getAnagrams from './getAnagrams'
import formMessage from './formMessage'

type GetDictionary = () => string[] | Promise<string[]>
type Print = (message: string) => any

export default async function showAnagrams(
  getDictionary: GetDictionary,
  print: Print,
  word: string
) {
  const dictionary = await getDictionary()
  const anagrams = getAnagrams(dictionary, word)
  const message = formMessage(anagrams)

  print(message)
}
