import { readFile } from 'fs/promises'
import type { AgentContext } from '..'

export default <AgentContext>{
  course: 'WD',
  sprint: '3.1.1',
  name: 'Mechanic',
  prompt: readFile('./prompt.md'),
}
