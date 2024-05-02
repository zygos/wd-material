import { curry } from 'rambda'

const isThenable = promise =>
  typeof promise === 'object' &&
  promise &&
  typeof promise.then === 'function'

const andThen = curry((method, promise) => isThenable(promise)
  ? promise.then(method)
  : Promise.resolve(promise).then(method))

export const intoSequentialPromise = async (previous, current) => [
  ...await (previous || []),
  await current(),
]

export const pipeAsync = (() => {
  const pipeWith = piper => (methodFirst, ...methodsRemaining) => (...methodArguments) =>
    methodsRemaining
      .reduce((result, method) => piper(method, result), methodFirst(...methodArguments))

  return pipeWith(andThen)
})()
