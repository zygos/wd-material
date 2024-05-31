function flattenObject(obj) {
  const subobj = {}

  for (const key in obj) {
    const value = obj[key]

    if (!isPlainObject(value)) {
      subobj[key] = value
      continue
    }

    const inter = flattenObject(value)
    const interKeys = Object.keys(inter)

    if (!interKeys.length) {
      subobj[key] = {}
    }

    for (const interKey of interKeys) {
      const keyNew = key + '.' + interKey
      subobj[keyNew] = inter[interKey]
    }
  }

  return subobj
}

const isPlainObject = value => typeof value === 'object' && value

// const result = flattenObject({})
// const result = flattenObject({ a: 5 })
// const result = flattenObject({ a: { b: {} }, c: 'hello', d: { a: { b: { d: { e: 'hi!'}}}} })
const result = flattenObject({ a: { b: [1,2,{b: 5}] }, c: 'hello', d: { a: { b: { d: { e: 'hi!'}}}} })

console.log(result)
