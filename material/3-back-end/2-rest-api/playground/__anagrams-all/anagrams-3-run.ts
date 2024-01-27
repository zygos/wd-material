import { readFile } from 'fs/promises'
import { listAnagrams } from './anagrams-3'

const DICT = './words.txt'

async function logAnagrams(logger: (message: string) => void, DICT: string, word: string) {
  const dictionary = (await readFile(DICT, 'utf-8')).split('\n')

  listAnagrams(logger, dictionary, word)
}

logAnagrams(console.log, DICT, 'coding')
