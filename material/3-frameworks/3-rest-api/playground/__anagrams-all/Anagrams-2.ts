type Display = (message: string) => void

export default class Anagrams {
  wordList: string[]
  display: Display

  constructor(wordList: string[], display: Display) {
    this.wordList = wordList
    this.display = display
  }

  listAnagrams(word: string) {
    const words: string[] = []

    for (const anagram of this.wordList) {
      if (this.#isAnagram(anagram, word)) {
        words.push(anagram)
      }
    }

    this.#displayResults(words, word)

    return words
  }

  #isAnagram(root: string, word: string) {
    for (const letter of root) {
      if (!word.includes(letter)) return false

      word = word.replace(letter, '')
    }

    return true
  }

  #displayResults(anagrams: string[], word: string) {
    this.display(`There are ${anagrams.length} anagrams of ${word} in the dictionary`)

    for (const anagram of anagrams) {
      this.display(anagram)
    }
  }
}
