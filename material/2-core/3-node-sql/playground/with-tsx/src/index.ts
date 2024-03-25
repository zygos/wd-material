import { join } from 'path'
// import { fileURLToPath } from 'url'
// import { something } from './something'
import { readFile } from 'fs/promises'

readFile(join(__dirname,'../../car-shop.csv'), 'utf-8')
  .then(file => console.log(file.slice(0, 10)))

console.log('Hello, world!', __dirname)
