/* eslint-disable promise/prefer-await-to-then */
const { curry } = require('rambda')

const isPromise = promise =>
  typeof promise === 'object' &&
  promise &&
  typeof promise.then === 'function'

const andThen = curry((method, promise) => isPromise(promise)
  ? promise.then(method)
  : Promise.resolve(promise).then(method))

module.exports.intoSequentialPromise = async (previous, current) => [
  ...await (previous || []),
  await current(),
]

module.exports.pipeAsync = (() => {
  const pipeWith = piper => (methodFirst, ...methodsRemaining) => (...methodArguments) =>
    methodsRemaining
      .reduce((result, method) => piper(method, result), methodFirst(...methodArguments))

  return pipeWith(andThen)
})()
