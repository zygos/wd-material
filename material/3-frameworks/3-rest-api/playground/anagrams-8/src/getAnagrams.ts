export default function getAnagrams(dictionary: string[], subject: string) {
  return dictionary
    .filter((wordInDictionary) => isAnagram(subject, wordInDictionary))
}

function isAnagram(subject: string, word: string) {
  if (subject === word) return false
  if (subject.length !== word.length) return false

  for (const letter of word) {
    if (!subject.includes(letter)) return false

    subject = subject.replace(letter, '')
  }

  return true
}
