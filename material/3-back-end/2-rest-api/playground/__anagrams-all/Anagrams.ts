export default class Anagrams {
  #wordList: string[]

  constructor(wordList: string[]) {
    this.#wordList = wordList
  }

  getAnagrams(word: string) {
    const words: string[] = []

    for (const anagram of this.#wordList) {
      if (word === anagram) {
        words.push(anagram)
      }
    }

    return words
  }
}
