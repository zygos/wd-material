/**
 * Forms a display message for a list of anagrams.
 * @param anagrams
 * @returns a display message for a list of anagrams
 */
export default function formMessage(anagrams: string[]) {
  const count = anagrams.length

  if (count === 0) {
    return 'There are no anagrams in the dictionary.'
  } else if (count === 1) {
    return `There is 1 anagram in the dictionary:\n  - ${anagrams[0]}`
  } else {
    return [
      `There are ${count} anagrams in the dictionary:`,
      ...anagrams.map(anagram => `  - ${anagram}`)
    ].join('\n')
  }
}