import { readFile } from 'fs/promises'
import { join } from 'path'
import subfile from './subfile'

// readFile(join(__dirname, './readme2.txt'), 'utf-8')
//   .then(output => console.log(output))

setInterval(async () => {
  const output = await readFile(join(__dirname, './readme2.txt'), 'utf-8')

  console.log(output)
}, 500)
