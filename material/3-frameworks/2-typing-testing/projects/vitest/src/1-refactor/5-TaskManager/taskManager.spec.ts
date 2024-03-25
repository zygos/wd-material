import { ariaLabel, role } from '../utils/selectors'
import { mount } from '@vue/test-utils'
import type { DOMWrapper, VueWrapper } from '@vue/test-utils'
import TaskManager from './TaskManager.vue'

describe('"TaskManager" component', () => {
  describe('without tasks', () => {
    it('displays an empty state', () => {
      const wrapper = mount(TaskManager)

      expect(wrapper.find(role('status')).exists()).toBe(true)
    })

    it('adds a task', async () => {
      // Arrange
      const wrapper = mount(TaskManager)

      // Act
      await addTask(wrapper, 'New task')

      // Assert
      expect(findTasks(wrapper)).toHaveLength(1)
      expect(getTaskName(wrapper)).toBe('New task')
    })
  })

  describe('with tasks', async () => {
    const setupWrapper = async () => {
      // we want a shared initial scenario, so we move it
      // to a separate function inside this `describe` block.
      const wrapper = mount(TaskManager)

      await addTask(wrapper, 'First task')
      await addTask(wrapper, 'Second task')

      return wrapper
    }

    it('does not display an empty state', async () => {
      const wrapper = await setupWrapper()
      expect(wrapper.find(role('status')).exists()).toBe(false)
    })

    it('completes a task', async () => {
      const wrapper = await setupWrapper()
      const [taskFirst, taskSecond] = findTasks(wrapper)

      await taskFirst.find('input[type="checkbox"]').setValue(true)

      expect(isDone(taskFirst)).toBe(true)
      expect(isDone(taskSecond)).toBe(false)
    })

    it('deletes a task', async () => {
      const wrapper = await setupWrapper()
      const [taskFirst] = findTasks(wrapper)

      await taskFirst.find(ariaLabel('delete')).trigger('click')

      const tasks = findTasks(wrapper)
      expect(tasks.length).toBe(1)

      // now first task is the "Second task"
      expect(getTaskName(tasks[0])).toBe('Second task')
    })
  })
})

const findTasks = (wrapper: VueWrapper) => wrapper.findAll(role('listitem'))

const getTaskName = (task: VueWrapper | DOMWrapper<Node>) =>
  task.find('label')?.text() || ''

const isDone = (task: VueWrapper | DOMWrapper<Node>) => {
  const status: DOMWrapper<HTMLInputElement> = task.find(
    'input[type="checkbox"]'
  )

  return status.element.checked === true
}

async function addTask(wrapper: VueWrapper, name: string) {
  const form = wrapper.find('form')

  await form.find('input').setValue(name)
  await form.find('button[type="submit"]').trigger('click')
}
