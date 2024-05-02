import { computed, ref } from 'vue'

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

// computed automatically sets the right type
const tasksCompleted = computed(() =>
  tasks.value.filter((task) => task.completedAt),
)

export { addTask, markIndexAsCompleted, tasks, tasksCompleted }
