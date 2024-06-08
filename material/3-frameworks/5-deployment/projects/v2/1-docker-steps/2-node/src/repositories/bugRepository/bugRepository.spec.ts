import { createTestDatabase } from '@tests/utils/database'
import { fakeBug, fakeProject, fakeUser } from '@server/entities/tests/fakes'
import { wrapInRollbacks } from '@tests/utils/transactions'
import { insertAll, selectAll } from '@tests/utils/records'
import { bugRepository } from '.'

const db = await wrapInRollbacks(createTestDatabase())
const repository = bugRepository(db)

// An example of repository tests.
const [userOne, userTwo] = await insertAll(db, 'user', [fakeUser(), fakeUser()])
const [projectOne, projectTwo] = await insertAll(db, 'project', [
  fakeProject({
    userId: userOne.id,
  }),
  fakeProject({
    userId: userTwo.id,
  }),
])

describe('create', () => {
  it('should create a new bug', async () => {
    // Given
    const bug = fakeBug({ projectId: projectOne.id })

    // When
    const createdBug = await repository.create(bug)

    // Then
    expect(createdBug).toMatchObject(bug)
  })
})

describe('update', async () => {
  it('should update an existing bug', async () => {
    const [bug] = await insertAll(db, 'bug', [
      fakeBug({ projectId: projectOne.id }),
    ])

    const resolvedAt = new Date()

    // When
    const updatedBug = await repository.update(bug.id, {
      name: 'Updated name',
      resolvedAt,
    })

    // Then
    expect(updatedBug).toMatchObject({
      name: 'Updated name',
      resolvedAt,
    })
  })

  it('should not update other bugs', async () => {
    // Here is an example of testing not only what should happen, but also what should not happen.

    // Given
    const [bugOne, bugTwo] = await insertAll(db, 'bug', [
      fakeBug({ projectId: projectOne.id }),
      fakeBug({ projectId: projectOne.id }),
    ])

    // When
    await repository.update(bugOne.id, {
      name: 'Updated name',
      resolvedAt: new Date(),
    })

    // Then
    const [bugTwoAfterUpdate] = await selectAll(db, 'bug', (eb) =>
      eb('id', '=', bugTwo.id)
    )
    expect(bugTwoAfterUpdate).toEqual(bugTwo)
  })

  it('should throw an error when trying to update a non-existing bug', async () => {
    // When
    await expect(
      repository.update(999, { name: 'Updated name' })
    ).rejects.toThrowError(/no result/i)
  })

  it('should throw an error when trying to update the id', async () => {
    const [bug] = await insertAll(db, 'bug', [
      fakeBug({ projectId: projectOne.id }),
    ])

    // When
    await expect(repository.update(bug.id, { id: 999 })).rejects.toThrowError(
      /id/i
    )
  })
})

describe('findById', () => {
  it('should find a bug by its id', async () => {
    // Given
    const [bugOne] = await insertAll(db, 'bug', [
      fakeBug({ projectId: projectOne.id }),
      fakeBug({ projectId: projectOne.id }),
    ])

    // When
    const foundBug = await repository.findById(bugOne.id)

    // Then
    expect(foundBug).toEqual(bugOne)
  })

  it('should return undefined if bug is not found', async () => {
    // When
    const foundBug = await repository.findById(999)

    // Then
    expect(foundBug).toBeUndefined()
  })
})

describe('findAllByProjectId', () => {
  it('should find all bugs by project id', async () => {
    // Given
    const bugs = await insertAll(db, 'bug', [
      fakeBug({ projectId: projectOne.id }),
      fakeBug({ projectId: projectTwo.id }),
      fakeBug({ projectId: projectOne.id }),
    ])

    // When
    const foundBugs = await repository.findAllByProjectId(projectOne.id)

    // Then
    expect(foundBugs).toEqual([bugs[0], bugs[2]])
  })

  it('should return an empty array if no bugs are found', async () => {
    // Given
    const projectId = 456

    // When
    const foundBugs = await repository.findAllByProjectId(projectId)

    // Then
    expect(foundBugs).toEqual([])
  })
})
