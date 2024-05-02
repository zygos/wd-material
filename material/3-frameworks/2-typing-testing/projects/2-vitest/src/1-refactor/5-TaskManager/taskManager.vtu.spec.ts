import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import TaskManager from './TaskManager.vue'
import type { DOMWrapper, VueWrapper } from '@vue/test-utils'

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
    const [first, second] = findTasks(wrapper)

    await first.find('input[type="checkbox"]').setValue(true)

    expect(isDone(first)).toBe(true)
    expect(isDone(second)).toBe(false)
  })

  it('deletes a task', async () => {
    const wrapper = await setupWrapper()
    const [first] = findTasks(wrapper)

    await first.find(ariaLabel('delete')).trigger('click')

    const remaining = findTasks(wrapper)
    expect(remaining.length).toBe(1)

    // now first task is the "Second task"
    expect(getTaskName(remaining[0])).toBe('Second task')
  })
})

// shared local utils
const ariaLabel = (label: string) => `[aria-label="${label}"]`
const role = (role: string) => `[role="${role}"]`

const findTasks = (wrapper: VueWrapper) => wrapper.findAll(role('listitem'))

const getTaskName = (task: VueWrapper | DOMWrapper<Node>) =>
  task.find('label')?.text() || ''

const isDone = (task: VueWrapper | DOMWrapper<Node>) => {
  const status: DOMWrapper<HTMLInputElement> = task.find(
    'input[type="checkbox"]'
  )

  return status.element.checked
}

async function addTask(wrapper: VueWrapper, name: string) {
  const form = wrapper.find('form')

  await form.find('input').setValue(name)
  await form.find('button[type="submit"]').trigger('click')
}
