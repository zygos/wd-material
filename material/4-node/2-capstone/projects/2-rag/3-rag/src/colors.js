const colors = [
  'Aqua', // #00FFFF
  'CornflowerBlue', // #6495ED
  'Coral', // #FF7F50
  'Crimson', // #DC143C
  'DarkOrchid', // #9932CC
  'DodgerBlue', // #1E90FF
  'ForestGreen', // #228B22
  'Indigo', // #4B0082
  'MidnightBlue', // #191970
  'OrangeRed', // #FF4500
  'Teal', // #008080
]

/**
 * Returns a random color from a built-in colors array while ignoring
 * provided colors in the `colorsUnavailable` array.
 * @param {string[]} colorsUsed
 * @returns {string}
 */
export function getRandomColor(colorsUnavailable = []) {
  const available = colors.filter(color => !colorsUnavailable.includes(color))

  if (!available.length) {
    throw new Error('No more colors available. Please try again later')
  }

  const index = Math.floor(Math.random() * available.length)

  return available[index]
}
