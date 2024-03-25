<script setup lang="ts">
import { ref } from 'vue'

const taskFactory = () => ({
  name: '',
  isDone: false,
})

const taskNew = ref(taskFactory())
const tasks = ref([])

function addTask(task) {
  for (let i = 0; i < tasks.value.length; i++) {
    if (task.name === tasks.value[i].name) return
  }

  tasks.value.push({ ...taskNew.value })

  taskNew.value = taskFactory()
}

function deleteTask(index) {
  for (let i = 0; i < tasks.value.length; i++) {
    if (i == index) {
      tasks.value = tasks.value.slice(0, i).concat(tasks.value.slice(i + 1))
      break
    }
  }
}
</script>

<template>
  <div id="task-manager">
    <ul v-if="tasks.length" class="tasks">
      <li v-for="(task, index) in tasks" :key="task.name" role="listitem">
        <label>
          <input type="checkbox" v-model="task.isDone" />
          {{ task.name }}
        </label>
        <button aria-label="delete" type="button" @click="deleteTask(index)">
          Delete
        </button>
      </li>
    </ul>
    <div v-else class="empty" role="status">
      You have not created any tasks. Create one now down below!
    </div>
    <form>
      <label for="add-task">Task name</label>
      <input id="add-task" type="text" v-model="taskNew.name" />
      <button type="submit" @click.prevent="addTask(taskNew)">Add</button>
    </form>
  </div>
</template>
