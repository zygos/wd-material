import { ref, watch } from 'vue'

// Usually, we would instead test component behaviour
// instead testing of these functions directly.
// However, this is a good example of how to refactor
// a messy watcher into a computed property, so we'll
// use this as a refactoring exercise.

type Task = {
  id: number
  completedAt: Date | null
}

const tasks = ref<Task[]>([])

function addTask(task: Task) {
  tasks.value.push(task)
}

function markIndexAsCompleted(index: number) {
  tasks.value[index].completedAt = new Date()
}

// TODO: refactor tasksCompleted to be a computed property instead
// of relying on a watcher to set its value.
const tasksCompleted = ref<Task[]>([])

watch(
  tasks,
  (tasksUpdated) => {
    tasksCompleted.value = tasksUpdated.filter(
      (task) => task.completedAt !== null,
    )
  },
  { deep: true },
)

export { addTask, markIndexAsCompleted, tasks, tasksCompleted }
