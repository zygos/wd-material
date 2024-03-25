type WordMatcher = (word: string, subject: string) => boolean
type Display = (message: string) => void

export const listAnagrams = (log: Display, anagrams: string[], word: string) => {
  log(`There are ${anagrams.length} anagrams of ${word} in the dictionary`)

  anagrams.forEach(anagram => log(anagram))
}

const matchWords = (doMatch: WordMatcher) => (list: string[], word: string) =>
  list.filter(wordInList => doMatch(word, wordInList))

const isAnagram: WordMatcher = (word, root) => {
  for (const letter of root) {
    if (!word.includes(letter)) return false

    word = word.replace(letter, '')
  }

  return true
}

const isAnagramStrict: WordMatcher = (word, root) =>
  root.length === word.length && isAnagram(word, root)

export const getAnagrams = matchWords(isAnagram)
export const getAnagramsStrict = matchWords(isAnagramStrict)
