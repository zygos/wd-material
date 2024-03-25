import { join } from 'path'
import fs from 'fs/promises'
import getAnagrams from './getAnagrams'
import formMessage from './formMessage'

const DICT = join(__dirname, '../words.txt')

async function showAnagrams(word: string) {
  const dictionary = (await fs.readFile(DICT, 'utf-8')).split('\n')
  const anagrams = getAnagrams(dictionary, word)
  const message = formMessage(anagrams)

  message.split('\n').forEach(line => console.log(line))
}

export default async function main() {
  await showAnagrams('code')
}

// Node.js shortcut, that resolves to true when
// the file is executed directly, and not just imported
if (require.main === module) main()
