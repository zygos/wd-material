import { join } from 'path'
import fs from 'fs/promises'
import getAnagrams from './getAnagrams'

const DICT = join(__dirname, '../words.txt')

async function showAnagrams(word: string) {
  // lines split by new line
  const dictionary = (await fs.readFile(DICT, 'utf-8')).split('\n')

  // collect all anagrams
  const anagrams = getAnagrams(dictionary, word)

  // print all anagrams
  console.log(`There are ${anagrams.length} anagrams in the dictionary:`)

  for (const anagram of anagrams) {
    console.log(`  - ${anagram}`)
  }
}

export default async function main() {
  await showAnagrams('code')
}

// Node.js shortcut, that resolves to true when
// the file is executed directly, and not just imported
if (require.main === module) {
  main()
}
