import { expect, it } from 'vitest'
import coursesAll from './fixtures/courses'
import queryCourses from '..'

it('returns all courses when query is empty', () => {
  const courses = queryCourses(coursesAll, {})

  expect(courses.length).toBe(coursesAll.length)
})

it('returns courses matching a given course level', () => {
  const query = { level: 'Advanced' }
  const courses = queryCourses(coursesAll, query)

  expect(courses.length).toBe(3)

  // we could check every element individually, but for some
  // rudamentary checks we can use the array methods as long
  // as we do not make them too complex.
  const isEveryAdvanced = courses.every(
    (item: any) => item.level === 'Advanced',
  )

  expect(isEveryAdvanced).toBe(true)
})

it('returns courses matching a given course name', () => {
  const query = { name: 'English' }
  const courses = queryCourses(coursesAll, query)

  expect(courses.length).toBe(1)
  expect(courses[0].name).toBe('English')
})

it('returns courses matching a multi-key query', () => {
  const query = { level: 'Advanced', isRemote: true }
  const courses = queryCourses(coursesAll, query)

  expect(courses.length).toBe(1)
  expect(courses[0]).toMatchObject({
    name: 'Computer Science',
    level: 'Advanced',
    grade: 98,
    language: 'English',
    isRemote: true,
  })
})

it('returns no courses when query does not match anything', () => {
  const query = { grade: 88, isRemote: false }
  const courses = queryCourses(coursesAll, query)

  expect(courses.length).toBe(0)
})

it('does not mutate courses array', () => {
  const coursesFrozen = Object.freeze(coursesAll)
  const query = { level: 'Advanced' }

  // A tecnical sanity check.
  // Checks that the courses array is not mutated
  // by passing an array that is frozen. Mutating would
  // throw an error.
  queryCourses(coursesFrozen, query)
})
