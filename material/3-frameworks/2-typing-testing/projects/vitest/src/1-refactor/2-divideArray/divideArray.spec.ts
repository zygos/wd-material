import divideArray from '.'

describe('divideArray', () => {
  it('should return an empty array if the input array is empty', () => {
    const array: number[] = []
    const divisor = 10
    expect(divideArray(array, divisor)).toEqual([])
  })

  it('should divide each element in the array by the divisor', () => {
    const array = [10, 20, 30, 40]
    const divisor = 5
    expect(divideArray(array, divisor)).toEqual([2, 4, 6, 8])
  })
})
