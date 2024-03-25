import { readFile } from 'fs/promises'

const DICT = './words.txt'

const showAnagrams = async (word: string) => {
  const words = (await readFile(DICT, 'utf-8')).split('\n')
  const anagrams: any[] = []

  for (const anagram of words) {
    if (isAnagram(word, anagram)) {
      anagrams.push(anagram)
    }
  }

  console.log(`There are ${anagrams.length} anagrams of ${word} in the dictionary.`)

  for (const anagram of anagrams) {
    console.log(anagram)
  }
}

const isAnagram = (root: string, word: string) => {
  for (const letter of word) {
    if (root.includes(letter)) {
      root = root.replace(letter, '')
    } else {
      return false
    }
  }

  return true
}

showAnagrams('coding')
