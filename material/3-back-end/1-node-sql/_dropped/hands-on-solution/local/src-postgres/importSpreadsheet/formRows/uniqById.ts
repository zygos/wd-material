/**
 * Returns the unique rows by id. Rows without an id are omitted. Preserves the
 * last row with a given id.
 */
export default function uniqById<T extends { id: number | null }>(rows: T[]) {
  const ids = new Set<number>()

  return rows
    .reduceRight((unique: T[], row) => {
      if (hasId(row) && !ids.has(row.id)) {
        ids.add(row.id)
        unique.push(row)
      }

      return unique
    }, [])
    .reverse()
}

function hasId<T extends { id: number | null }>(
  row: T,
): row is T & { id: number } {
  return row.id !== null
}
