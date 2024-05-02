import { join, resolve } from 'node:path'
import fs from 'node:fs/promises'
import getAnagrams from './getAnagrams'
import formMessage from './formMessage'
import { fileURLToPath } from 'node:url'

const directory = join(fileURLToPath(import.meta.url), '..')
const DICT = join(directory, '../words.txt')

async function showAnagrams(word: string) {
  const dictionary = (await fs.readFile(DICT, 'utf-8')).split('\n')
  const anagrams = getAnagrams(dictionary, word)
  const message = formMessage(anagrams)

  message.split('\n').forEach(line => console.log(line))
}

export default async function main() {
  await showAnagrams('code')
}

// Check if Node.js is running this file directly and not
// just being imported. If run directly - run the main function.
const isRunDirectly = resolve(fileURLToPath(import.meta.url))
  .includes(resolve(process.argv[1]))

if (isRunDirectly) main()
