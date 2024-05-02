type Course = {
  name: string
  level: 'Beginner' | 'Intermediate' | 'Advanced'
  grade: number
  language: string
  isRemote: boolean
}

type CourseQuery = Partial<Course>

export default function queryCourses(
  courses: Course[],
  query: CourseQuery
): Course[] {
  return courses.filter((course) =>
    Object.entries(query).every(
      ([key, value]) => course[key as keyof Course] === value
    )
  )
}
