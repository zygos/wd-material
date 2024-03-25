/**
 * Generates a random username of the given length.
 * @param {number} length
 * @returns {string}
 */
export function getRandomUsername(length) {
  const consonants = 'bcdfghjklmnpqrstvwxyz'
  const vowels = 'aeiou'

  // 50% chance of starting with a consonant or a vowel
  let source = Math.random() > 0.5
    ? consonants
    : vowels

  let username = ''

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * source.length)
    username += source[randomIndex]

    // alternate between consonants and vowels
    source = source === consonants
      ? vowels
      : consonants
  }

  return username
}
