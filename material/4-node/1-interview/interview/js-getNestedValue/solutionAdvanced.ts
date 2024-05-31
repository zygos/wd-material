function getNestedValue(obj: unknown, path: string): unknown {
  if (!isPlainObjectOrArray(obj) || typeof path !== 'string') {
    return undefined;
  }

  const properties = path.split('.');

  if (properties.length === 0) {
    return undefined;
  }

  for (const property of properties) {
    // do not allow access to Object prototype properties
    if (
      !isPlainObjectOrArray(obj) ||
      !Object.prototype.hasOwnProperty.call(obj, property)
    ) {
      return undefined;
    }

    // do not allow access to Array properties, such as length
    if (Array.isArray(obj) && isNaN(Number(property))) {
      return undefined;
    }

    obj = obj[property];
  }

  return obj;
}

function isPlainObjectOrArray(value: unknown): value is Record<string, unknown> | unknown[] {
  return (
    typeof value === 'object' &&
    value !== null &&
    (Object.getPrototypeOf(value) === Object.prototype || Array.isArray(value))
  );
}

const log = fn => (...args) => console.log(fn(...args))
const logNestedValue = log(getNestedValue)

// accessing nested object properties
logNestedValue({a: 'b'}, 'a') // 'b'

logNestedValue({w:{o:{r:[null,{k:[{s:{'!':'yes'}}]}]}}}, 'w.o.r.1.k.0.s.!') // 'yes'

// accessing array index
logNestedValue([4], '0') // 4

// accessing object prototype
logNestedValue({}, 'toString') // undefined

// accessing array length
logNestedValue([], 'length') // undefined

// console.log(result)
