import { readFile } from 'fs/promises'

const output = await readFile('readme.txt', 'utf-8')

console.log(output)