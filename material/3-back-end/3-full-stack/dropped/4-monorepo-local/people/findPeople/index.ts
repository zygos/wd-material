import type { Person } from '@server/database'
import type { FindManyOptions } from 'typeorm'

// We could depend on the Repository<Person> directly, but
// here we will show an example of how to depend on an interface
// that abstracts away the some implementation details of a
// repository.
type PeopleFinder = {
  find: (options?: FindManyOptions) => Promise<Person[]>
}

export default (finder: PeopleFinder) => async () => {
  const people = await finder.find({
    relations: {
      directed: true,
      starred: true,
    },
    take: 10,
  })

  return people
}
