import { nextTick } from 'vue'
import { tasksCompleted, addTask, markIndexAsCompleted } from '.'
import { expect, it } from 'vitest'

it('allows marking task as completed', async () => {
  addTask({
    id: 1,
    completedAt: null,
  })

  markIndexAsCompleted(0)

  // wait for vue to propagate the changes
  await nextTick()

  const taskCompleted = tasksCompleted.value[0]

  expect(taskCompleted.completedAt).not.toBe(null)
})
