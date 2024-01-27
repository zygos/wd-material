type Display = (message: string) => void

export default class Anagrams {
  wordList: string[]

  constructor(wordList: string[]) {
    this.wordList = wordList
  }

  listAnagrams(word: string, display: Display) {
    const words = this.getAnagrams(word)

    display(`There are ${words.length} anagrams of ${word} in the dictionary`)

    for (const anagram of words) {
      display(anagram)
    }

    return words
  }

  getAnagrams(word: string) {
    return this.wordList
      .filter(wordInList => this.#isAnagram(wordInList, word))
  }

  #isAnagram(anagram: string, word: string) {
    for (const letter of anagram) {
      if (!word.includes(letter)) return false

      word = word.replace(letter, '')
    }

    return true
  }
}
