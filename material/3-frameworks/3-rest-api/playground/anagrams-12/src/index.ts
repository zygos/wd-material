import { join } from 'path'
import { readFile } from 'fs/promises'
import showAnagrams from './showAnagrams'

export default async function main() {
  const DICT = join(__dirname, '../words.txt')

  const readFileLines = async () => {
    const file = await readFile(DICT, 'utf-8')

    return file.split('\n')
  }

  return showAnagrams(readFileLines, console.log, 'code')
}

// if it is run directly, run the main function
if (require.main === module) main()
