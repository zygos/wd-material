import { afterEach, describe, expect, it } from 'vitest'
import {
  type RenderResult,
  cleanup,
  getByText,
  render,
  within,
} from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import TaskManager from './TaskManager.vue'

afterEach(cleanup)

describe('without tasks', () => {
  it('displays an empty state', () => {
    const wrapper = render(TaskManager)

    wrapper.getByRole('status')
  })

  it('adds a task', async () => {
    // Arrange
    const wrapper = render(TaskManager)
    const user = userEvent.setup()

    // Act
    await addTask(user, wrapper, 'New task')

    // Assert
    const tasks = getTasks(wrapper)
    expect(tasks).toHaveLength(1)

    const taskFirst = tasks[0]
    getByText(taskFirst, 'New task')
    expect(isTaskDone(taskFirst)).toBe(false)
  })
})

describe('with tasks', async () => {
  const setup = async () => {
    // we want a shared initial scenario, so we move it
    // to a separate function inside this `describe` block.
    const user = userEvent.setup()
    const wrapper = render(TaskManager)

    await addTask(user, wrapper, 'First task')
    await addTask(user, wrapper, 'Second task')

    return { user, wrapper }
  }

  it('does not display an empty state', async () => {
    const { wrapper } = await setup()

    const status = wrapper.queryByRole('status')

    expect(status).toBeNull()
  })

  it('completes a task', async () => {
    const { user, wrapper } = await setup()
    const [taskFirst, taskSecond] = getTasks(wrapper)

    await user.click(within(taskFirst).getByRole('checkbox'))

    expect(isTaskDone(taskFirst)).toBe(true)
    expect(isTaskDone(taskSecond)).toBe(false)
  })

  it('deletes a task', async () => {
    const { user, wrapper } = await setup()
    const [taskFirst] = getTasks(wrapper)

    await user.click(within(taskFirst).getByLabelText('delete'))

    const tasks = getTasks(wrapper)

    expect(tasks.length).toBe(1)
    wrapper.getByText('Second task')
  })
})

const getTasks = (wrapper: RenderResult) => wrapper.getAllByRole('listitem')

const isTaskDone = (task: HTMLElement) => {
  const checkbox: HTMLInputElement = within(task).getByRole('checkbox')

  return checkbox.checked === true
}

async function addTask(
  user: ReturnType<typeof userEvent.setup>,
  wrapper: RenderResult,
  taskName: string,
) {
  const input = wrapper.getByRole('textbox')
  await user.type(input, taskName)

  const button = wrapper.getByRole('button', { name: 'Add' })
  await user.click(button)
}
