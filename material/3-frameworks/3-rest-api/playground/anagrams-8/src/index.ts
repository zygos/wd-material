import { join } from 'path'
import showAnagrams from './showAnagrams'

export default async function main() {
  const DICT = join(__dirname, '../words.txt')
  const WORD = 'code'

  return showAnagrams(DICT, WORD)
}

// if it is run directly, run the main function
if (require.main === module) main()
