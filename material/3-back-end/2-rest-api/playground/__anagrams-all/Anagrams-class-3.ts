type Display = (message: string) => void

export default class Anagrams {
  wordList: string[]
  display: Display

  constructor(wordList: string[], display: Display) {
    this.wordList = wordList
    this.display = display
  }

  listAnagrams(word: string) {
    const words = this.wordList
      .filter(wordInList => this.#isAnagram(wordInList, word))

    this.#displayResults(words, word)

    return words
  }

  #isAnagram(anagram: string, word: string) {
    for (const letter of anagram) {
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
