import { createCallerFactory } from '@server/trpc'
import router from '.'

const createCaller = createCallerFactory(router)
const { create, findAll } = createCaller({
  db: {
    getRepository: () => ({
      save: () => ({ id: 1, name: 'Lassie' }),
      find: () => [{ id: 1, name: 'Lassie' }],
    }),
  } as any,
})

it('should create a dog', async () => {
  const dog = await create({})

  expect(dog).toEqual({ id: 1, name: 'Lassie' })
})

it('should find all dogs', async () => {
  const dogs = await findAll()

  expect(dogs).toEqual([{ id: 1, name: 'Lassie' }])
})
