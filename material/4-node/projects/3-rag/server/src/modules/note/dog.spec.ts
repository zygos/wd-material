import router from '.'

const find = vi.fn(() => [{ id: 1, name: 'Lassie' }])
const fakeDog = () => ({ id: 1, name: 'Lassie' })
const fakeDogs = (count: number) => Array.from({ length: count }, fakeDog)

const { create, findAll } = router.createCaller({
  db: {
    getRepository: () => ({
      save: () => ({ id: 1, name: 'Lassie' }),
      find,
    }),
  } as any,
})

it('should create a dog', async () => {
  const dog = await create({})
  expect(dog).toEqual({ id: 1, name: 'Lassie' })
})

it('should find all dogs', async () => {
  const dogs = await findAll()
  find.mockResolvedValueOnce(fakeDogs(20))
  expect(dogs).toEqual([{ id: 1, name: 'Lassie' }])
})
