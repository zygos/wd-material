// import { all, length, pipe } from 'ramda'

const isOdd = x => x % 2 === 1

// allOddProcedural
function allOddProcedural(words) {
  let result = true

  for (let i = 0; i < words.length; ++i) {
    if (!isOdd(words[i].length)) {
      result = false
      break
    }
  }

  return result
}

// allOddFunctional
const allOddFunctional = words => words.every(word => isOdd(word.length))

// allOddPointFree
import { all, length, pipe } from 'ramda'

const allOddPointFree = all(pipe(length, isOdd))

// allOddObjectOriented
class AllOddObjectOriented {
  constructor(words) {
    this.words = words
  }

  get areAllOdd() {
    return this.words.every(word => isOdd(word.length))
  }
}

// const result = allOddProcedural(['Jon', 'Doe', 'had', 'a', 'cat'])
// const result = allOddFunctional(['John', 'Doe', 'had', 'a', 'cat'])
// const result = allOddPointFree(['John', 'Doe', 'had', 'a', 'cat'])
const result = new AllOddObjectOriented(['John', 'Doe', 'had', 'a', 'cat']).areAllOdd

console.log(result)
