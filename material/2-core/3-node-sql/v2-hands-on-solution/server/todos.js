import { database } from './database/database.js'

export function getAllTodos() {
  const statement = database.prepare('SELECT * FROM todos')
  const todos = statement.all()

  return todos
}

export function createTodo(title) {
  const statement = database.prepare(
    'INSERT INTO todos (title, is_done) VALUES (?, ?) RETURNING *'
  )
  const todo = statement.get(title, 0)

  return todo
}

export function setTodoAsDone(id) {
  const statement = database.prepare(
    'UPDATE todos SET is_done = TRUE WHERE id = ? RETURNING *'
  )
  const todo = statement.get(id)

  return todo
}

export function deleteTodo(id) {
  const statement = database.prepare('DELETE FROM todos WHERE id = ? RETURNING *')
  const todo = statement.get(id)

  return todo
}
