import { join, resolve } from 'node:path'
import showAnagrams from './showAnagrams'
import { fileURLToPath } from 'node:url'

export default async function main() {
  const directory = join(fileURLToPath(import.meta.url), '..')
  const DICT = join(directory, '../words.txt')
  const WORD = 'code'

  return showAnagrams(DICT, WORD)
}

// if it is run directly, run the main function
const isRunDirectly = resolve(fileURLToPath(import.meta.url))
  .includes(resolve(process.argv[1]))

if (isRunDirectly) main()
