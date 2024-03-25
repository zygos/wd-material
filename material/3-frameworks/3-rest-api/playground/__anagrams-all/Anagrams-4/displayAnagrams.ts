type Display = (message: string) => void

export default function displayAnagrams(display: Display, word: string, anagrams: string[]) {
  display(`There are ${anagrams.length} anagrams of ${word} in the dictionary`)

  anagrams.forEach(anagram => display(anagram))
}
