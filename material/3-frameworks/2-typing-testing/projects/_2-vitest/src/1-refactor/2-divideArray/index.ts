export default function divideArray(array, divisor) {
  const dividedArray = []
  for (let i = 0; i < array.length; i++) {
    const dividedValue = array[i] / divisor
    dividedArray.push(dividedValue)
  }
  return dividedArray
}
