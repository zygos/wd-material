/**
 * Forms parameters for SQL query for a given list of insert values.
 * @returns (?, ?, ?), (?, ?, ?), ...
 */
export default function formParameters(values: unknown[][]) {
  const groups = toQuestionMarks(values)
  const groupsJoined = groups.join('), (')

  return `(${groupsJoined})`
}

function toQuestionMarks(values: unknown[][]) {
  return values.map(value => value.map(() => '?').join(', '))
}
