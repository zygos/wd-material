const { exec } = require('child_process')

const [command, migrationName] = process.argv.slice(2)

// using a custom script to run typeorm cli to address 2 issues:
// 1. it's tedious to pass src/database/migrations as a path to typeorm cli
// 2. using bash -c in script tags does not work on Windows without WSL
const script = `npm run typeorm -- ${command.replace('$0', migrationName)}`

const child = exec(script, (error) => {
  if (error) {
    process.stderr.write(error.message)
    return
  }
})

child.stdout.on('data', (message) => {
  process.stdout.write(message)
})

child.stderr.on('data', (message) => {
  process.stderr.write(message)
})

child.on('exit', (code) => {
  process.exit(code)
})
