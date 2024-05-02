export default function divideAll(divisor: number, numbers: number[]) {
  if (divisor === 0) throw new Error('Cannot divide by 0')

  // using Math.truc is also an option
  return numbers.map((value) => (value - (value % divisor)) / divisor)
}
