type WordMatcher = (word: string, subject: string) => boolean
type Display = (message: string) => void

const matchWords = (doMatch: WordMatcher) => (list: string[], word: string) =>
  list.filter(wordInList => doMatch(word, wordInList))

const buildWordMatcher = (doMatch: WordMatcher, label: string) => ({
  getMatches: matchWords(doMatch),
  displayMatches: (display: Display, matches: string[], word: string) => {
    display(`There are ${matches.length} ${label} of ${word} in the dictionary`)
    matches.forEach(match => display(match))
  },
})

const isAnagram: WordMatcher = (word, root) => {
  for (const letter of root) {
    if (!word.includes(letter)) return false

    word = word.replace(letter, '')
  }

  return true
}

const anagrams = buildWordMatcher(isAnagram, 'anagrams')

const anagramsStrict = buildWordMatcher((word, root) => {
  return word.length === root.length && isAnagram(word, root)
}, 'strict anagrams')

const palindromes = buildWordMatcher((word, root) =>
  word === root.split('').reverse().join(''), 'palindromes')
