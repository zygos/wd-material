type Course = {
  name: string
  level: string
  grade: number
  language: string
  isRemote: boolean
}

/**
 * Filters out courses by returning courses that match the query object.
 */
export default function queryCourses(
  courses: Course[],
  query: Partial<Course>,
): Course[] {
  return courses.filter((course) =>
    Object.entries(query).every(
      ([key, value]) => course[key as keyof Course] === value,
    ),
  )
}

// a more generic version
// function query<T>(data: Readonly<T[]>, query: Readonly<Partial<T>>): T[] {
//   return data.filter((item) =>
//     Object.entries(query).every(
//       ([key, value]) => item[key as keyof T] === value
//     )
//   )
// }
