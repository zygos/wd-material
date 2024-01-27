export default (length: number) =>
  Array.from({ length }, (_, i) => {
    const n = i + 1

    if (!(n % 15)) return 'FizzBuzz'
    if (!(n % 3)) return 'Fizz'
    if (!(n % 5)) return 'Buzz'

    return n.toString()
  })
