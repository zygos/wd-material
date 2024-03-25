import fs from 'fs/promises'
import getAnagrams from './getAnagrams'
import formMessage from './formMessage'

export default async function showAnagrams(dictionaryPath: string, word: string) {
  const dictionary = (await fs.readFile(dictionaryPath, 'utf-8')).split('\n')

  const anagrams = getAnagrams(dictionary, word)
  const message = formMessage(anagrams)

  message.split('\n').forEach(line => console.log(line))
}
