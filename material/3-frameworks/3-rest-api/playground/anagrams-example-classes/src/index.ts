import { join } from 'path'
import { readFile } from 'fs/promises'
import AnagramSolver from './AnagramSolver'

export default async function main() {
  const getDictionary = async () => {
    const path = join(__dirname, '../words.txt')
    const file = await readFile(path, 'utf-8')

    return file.split('\n')
  }

  const anagramSolver = new AnagramSolver(console.log)
  await anagramSolver.loadDictionary(getDictionary)

  const anagrams = anagramSolver.getAnagrams('code')

  anagramSolver.printAnagrams(anagrams)
}

// if it is run directly, run the main function
if (require.main === module) main()
