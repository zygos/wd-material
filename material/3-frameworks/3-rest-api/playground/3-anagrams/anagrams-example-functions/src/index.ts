import { join, resolve } from 'node:path'
import { readFile } from 'node:fs/promises'
import createAnagramSolver from './anagramSolver'
import { fileURLToPath } from 'node:url'

export default async function main() {
  const getDictionary = async () => {
    const directory = join(fileURLToPath(import.meta.url), '..')
    const path = join(directory, '../words.txt')
    const file = await readFile(path, 'utf-8')

    return file.split('\n')
  }

  const anagramSolver = await createAnagramSolver(getDictionary, console.log)
  const anagrams = anagramSolver.getAnagrams('code')

  anagramSolver.printAnagrams(anagrams)
}

// if it is run directly, run the main function
const isRunDirectly = resolve(fileURLToPath(import.meta.url))
  .includes(resolve(process.argv[1]))

if (isRunDirectly) main()
