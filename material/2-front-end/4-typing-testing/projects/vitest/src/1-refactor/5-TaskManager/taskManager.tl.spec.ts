import { getByText, render, screen, within } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import TaskManager from './TaskManager.vue'

describe('"TaskManager" component', () => {
  describe('without tasks', () => {
    it('displays an empty state', () => {
      render(TaskManager)

      screen.getByRole('status')
    })

    it('adds a task', async () => {
      // Arrange
      render(TaskManager)
      const user = userEvent.setup()

      // Act
      await addTask(user, 'New task')

      // Assert
      const tasks = getTasks()
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

      await addTask(user, 'First task')
      await addTask(user, 'Second task')

      return { user, wrapper }
    }

    it('does not display an empty state', async () => {
      await setup()

      const status = screen.queryByRole('status')

      expect(status).toBeNull()
    })

    it('completes a task', async () => {
      const { user } = await setup()
      const [taskFirst, taskSecond] = getTasks()

      await user.click(within(taskFirst).getByRole('checkbox'))

      expect(isTaskDone(taskFirst)).toBe(true)
      expect(isTaskDone(taskSecond)).toBe(false)
    })

    it('deletes a task', async () => {
      const { user } = await setup()
      const [taskFirst] = getTasks()

      await user.click(within(taskFirst).getByLabelText('delete'))

      const tasks = getTasks()

      expect(tasks.length).toBe(1)
      screen.getByText('Second task')
    })
  })
})

const getTasks = () => screen.getAllByRole('listitem')

const isTaskDone = (task: HTMLElement) => {
  const checkbox: HTMLInputElement = within(task).getByRole('checkbox')

  return checkbox.checked === true
}

async function addTask(
  user: ReturnType<typeof userEvent.setup>,
  taskName: string
) {
  const input = screen.getByRole('textbox')
  await user.type(input, taskName)

  const button = screen.getByRole('button', { name: 'Add' })
  await user.click(button)
}
