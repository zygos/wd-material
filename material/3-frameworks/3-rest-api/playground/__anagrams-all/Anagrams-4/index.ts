import Anagrams from './Anagrams'
import displayAnagrams from './displayAnagrams'

function main() {
  const word = 'cba'
  const dictionary = ['abc', 'bac', 'trent']

  const anagrams = new Anagrams(dictionary)
  const list = anagrams.getAnagrams(word)

  displayAnagrams(console.log, word, list)
}

main()
