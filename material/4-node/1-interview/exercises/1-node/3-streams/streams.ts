import { watchFile } from 'fs'

const logFilePath = 'path/to/log/file.log'
let lastSize = 0

const watcher = watchFile(__filename, (curr) => {
  if (curr.size === lastSize) return

  // do something with the file

  lastSize = curr.size
})
