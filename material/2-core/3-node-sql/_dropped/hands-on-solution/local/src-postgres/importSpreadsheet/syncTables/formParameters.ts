import { ParametersType } from '../../database'

/**
 * Forms parameters for SQL query for a given list of insert values.
 */
export default function formParameters(
  parametersType: ParametersType,
  values: unknown[][],
) {
  const joined =
    parametersType === 'questionMark'
      ? withQuestionMark(values)
      : withDollarSign(values)

  return `(${joined})`
}

/**
 * Parameters for SQL query using question mark.
 * @param values
 * @returns (?,?,?), (?,?,?), ...
 */
function withQuestionMark(values: unknown[][]) {
  return values.map(value => value.map(() => '?').join(', ')).join('), (')
}

/**
 * Parameters for SQL query using dollar sign syntax.
 * @param values
 * @returns ($1,$2,$3), ($4,$5,$6), ...
 */
function withDollarSign(values: unknown[][]) {
  return values
    .map((_, index) =>
      values[0]
        .map((__, i) => `$${index * values[0].length + i + 1}`)
        .join(', '),
    )
    .join('), (')
}
