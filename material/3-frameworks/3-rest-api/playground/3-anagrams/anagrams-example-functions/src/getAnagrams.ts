export default function getAnagrams(dictionary: string[]) {
  const dictionaryMap = buildAnagramMap(dictionary)

  return (subject: string) => dictionaryMap
    .get(sortWord(subject))
    ?.filter(word => word !== subject)
    ?? []
}

function buildAnagramMap(dictionary: string[]) {
  const dictionaryMap = new Map<string, string[]>()

  for (const word of dictionary) {
    const wordSorted = sortWord(word)

    if (!dictionaryMap.has(wordSorted)) {
      dictionaryMap.set(wordSorted, [])
    }

    dictionaryMap.get(wordSorted)!.push(word)
  }

  return dictionaryMap
}

function sortWord(word: string) {
  return word.split('').sort().join('')
}
