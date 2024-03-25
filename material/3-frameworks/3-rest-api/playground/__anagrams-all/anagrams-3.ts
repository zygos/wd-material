type Display = (message: string) => void

export function listAnagrams(logger: Display, anagrams: string[], word: string) {
  logger(`There are ${anagrams.length} anagrams of ${word} in the dictionary`)

  anagrams.forEach((anagram) => logger(anagram))
}

export function getAnagrams(dictionary: string[], word: string) {
  return dictionary
    .filter((wordInDictionary) => isAnagram(word, wordInDictionary))
}

export function getAnagramsStrict(dictionary: string[], word: string) {
  return dictionary
    .filter((wordInDictionary) => isAnagramStrict(word, wordInDictionary))
}

function isAnagram(word: string, root: string) {
  for (const letter of root) {
    if (!word.includes(letter)) return false

    word = word.replace(letter, '')
  }

  return true
}

function isAnagramStrict(word: string, root: string) {
  return root.length === word.length && isAnagram(word, root)
}

// type StringMatcher = (word: string, root: string) => boolean

// const getAnagramsFactory = (doesMatch: StringMatcher) => (dictionary: string[], word: string) =>
//   dictionary
//     .filter((wordInDictionary) => doesMatch(word, wordInDictionary))

// export const getAnagrams = getAnagramsFactory(isAnagram)
// export const getAnagramsStrict = getAnagramsFactory(isAnagramStrict)
