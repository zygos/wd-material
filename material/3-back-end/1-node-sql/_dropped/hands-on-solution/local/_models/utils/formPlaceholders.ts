export default (values: unknown[][]) => {
  const joined = values
    .map(value => value.map(() => '?').join(', '))
    .join('), (')

  return `(${joined})`
}
