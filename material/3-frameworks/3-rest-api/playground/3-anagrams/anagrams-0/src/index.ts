import { join, resolve } from 'node:path'
import fs from 'node:fs/promises'
import { fileURLToPath } from 'node:url'

const directory = join(fileURLToPath(import.meta.url), '..')
const DICT = join(directory, '../words.txt')

async function showAnagrams(subject: string) {
  // lines split by new line
  const dictionary = (await fs.readFile(DICT, 'utf-8')).split('\n')

  // collect all anagrams
  const anagrams = []

  for (const anagram of dictionary) {
    if (isAnagram(subject, anagram)) {
      anagrams.push(anagram)
    }
  }

  // print all anagrams
  console.log(`There are ${anagrams.length} anagrams in the dictionary:`)

  for (const anagram of anagrams) {
    console.log(`  - ${anagram}`)
  }
}

function isAnagram(subject: string, word: string) {
  // reject all words that have a different length
  // as we want to accept only true anagrams
  // (same length, same letters)
  if (subject.length !== word.length) return false

  // keep eliminating letters one-by-one
  for (const letter of word) {
    if (subject.includes(letter)) {
      subject = subject.replace(letter, '')
    } else {
      // if some letter is not present in the subject
      // it is NOT an anagram
      return false
    }
  }

  // if we found all same letters in the subject
  // it is an anagram
  return true
}

function main() {
  showAnagrams('code')
}

// Check if Node.js is running this file directly and not
// just being imported. If run directly - run the main function.
const isRunDirectly = resolve(fileURLToPath(import.meta.url))
  .includes(resolve(process.argv[1]))

if (isRunDirectly) {
  main()
}
