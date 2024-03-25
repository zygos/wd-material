export default class Anagrams {
  wordList: string[]

  constructor(wordList: string[]) {
    this.wordList = wordList
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
