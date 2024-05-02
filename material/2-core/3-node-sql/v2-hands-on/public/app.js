const SERVER_URL = 'http://localhost:3000'
const todoForm = document.getElementById('todo-form')
const todoInput = document.getElementById('todo-input')
const todosList = document.getElementById('todo-list')

// Fetch existing todos when the page loads
window.addEventListener('DOMContentLoaded', async () => {
  const todos = await fetchTodos()
  displayTodos(todos)
})

todoForm.addEventListener('submit', async (event) => {
  // prevent the form from submitting and refreshing the page
  event.preventDefault()

  const title = todoInput.value.trim()

  if (!title) {
    alert('Please enter a todo')
    return
  }

  const response = await fetch(`${SERVER_URL}/todos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title }),
  })

  const createdTodo = await response.json()

  addTodoToList(createdTodo)

  todoInput.value = '' // Clear the input field
})

async function fetchTodos() {
  const response = await fetch(`${SERVER_URL}/todos`)

  return response.json()
}

function displayTodos(todos) {
  todos.forEach(addTodoToList)
}

function addTodoToList(todo) {
  const listItem = document.createElement('li')
  listItem.classList = ['todo-item', todo.is_done ? 'todo-done' : ''].join(' ')
  listItem.dataset.id = todo.id
  listItem.innerHTML = `
    <span class="todo-title">${todo.title}</span>
    <div>
      <button class="done-btn">Mark as done</button>
      <button class="delete-btn">Delete</button>
    </div>
  `
  todosList.appendChild(listItem)

  // Add event listeners to the buttons
  listItem.querySelector('.done-btn').addEventListener('click', setTodoDone)
  listItem.querySelector('.delete-btn').addEventListener('click', deleteTodo)
}

// Handle todo done
async function setTodoDone(event) {
  const todoItem = event.target.closest('.todo-item')
  const todoId = todoItem.dataset.id

  const resposne = await fetch(`${SERVER_URL}/todos/${todoId}/done`, { method: 'PATCH' })
  await resposne.json()

  // Optimistically update the todo list on the page
  todoItem.classList.toggle('todo-done')
}

// Handle todo deletion
async function deleteTodo(event) {
  const todoItem = event.target.closest('.todo-item')
  const todoId = todoItem.dataset.id

  await fetch(`${SERVER_URL}/todos/${todoId}`, { method: 'DELETE' })

  // Remove the todo item from the list
  todoItem.remove()
}
