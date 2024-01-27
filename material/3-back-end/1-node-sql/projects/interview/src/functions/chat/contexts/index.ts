import carMechanic from './carMechanic'

export type AgentContext = {
  course: string
  sprint: string
  name: string
  prompt: string | Promise<string> | Promise<Buffer>
}

export default [
  carMechanic,
]
