const colors = [
  'Aqua', // #00FFFF
  'Coral', // #FF7F50
  'CornflowerBlue', // #6495ED
  'Crimson', // #DC143C
  'DarkOrchid', // #9932CC
  'DodgerBlue', // #1E90FF
  'ForestGreen', // #228B22
  'Indigo', // #4B0082
  'MidnightBlue', // #191970
  'OrangeRed', // #FF4500
  'Purple', // #800080
  'Teal', // #008080
  'Tomato', // #FF6347
  'Turquoise', // #40E0D0
  'Violet', // #EE82EE
]

/**
 * Returns a random color from a built-in HTML colors array.
 * @returns {string}
 */
export function getRandomColor() {
  const index = Math.floor(Math.random() * colors.length)

  return colors[index]
}
