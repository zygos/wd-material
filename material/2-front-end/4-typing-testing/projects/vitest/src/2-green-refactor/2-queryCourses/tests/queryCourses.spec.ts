import queryCourses from '..'
import courses from './fixtures/courses'

describe('queryCourses', () => {
  it('returns courses matching a given course level', () => {
    const query = { level: 'Advanced' }
    const result = queryCourses(courses, query)

    // MUST: continue
    expect(result.length).toBe(1)
    expect(result[0].name).toBe('Math')
  })

  it('returns courses matching a given course name', () => {
    const query = { name: 'English' }
    const result = queryCourses(courses, query)

    expect(result.length).toBe(1)
    expect(result[0].name).toBe('Math')
  })

  it('returns courses by multi-key query', () => {
    const query = { level: 'Advanced', isRemote: true }
    const result = queryCourses(courses, query)

    expect(result.length).toBe(0)
  })

  it('returns no courses when query does not match anything', () => {
    const query = { grade: 88, isRemote: false }
    const result = queryCourses(courses, query)

    expect(result.length).toBe(0)
  })
})
