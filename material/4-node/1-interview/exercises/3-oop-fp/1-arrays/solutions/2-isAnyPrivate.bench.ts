import { bench, describe } from 'vitest'
import {
  isAnyPrivateReduce,
  isAnyPrivateMap,
  isAnyPrivateFilter,
  isAnyPrivateFind,
  isAnyPrivateSome,
  isAnyPrivateEvery,
  isAnyPrivateImperative,
} from './2-isAnyPrivate'
import { Post } from '../types'

const fakePost = ((id) => (isPublic: (n: number) => boolean) => (): Post => ({
  id: id++,
  isPublic: isPublic(id),
  comments: [],
}))(1)

// 100 posts, every 10th is private
const arraySmall = Array.from(
  { length: 100 },
  fakePost((id) => !(id % 10)),
)

// worst case - 1_000_000 posts, none are private
const arrayLargeWorst = Array.from(
  { length: 1_000_000 },
  fakePost(() => false),
)

describe('arraySmall', () => {
  bench('isAnyPrivateImperative', () => {
    isAnyPrivateImperative(arraySmall)
  })

  bench('isAnyPrivateReduce', () => {
    isAnyPrivateReduce(arraySmall)
  })

  bench('isAnyPrivateMap', () => {
    isAnyPrivateMap(arraySmall)
  })

  bench('isAnyPrivateFilter', () => {
    isAnyPrivateFilter(arraySmall)
  })

  bench('isAnyPrivateFind', () => {
    isAnyPrivateFind(arraySmall)
  })

  bench('isAnyPrivateSome', () => {
    isAnyPrivateSome(arraySmall)
  })

  bench('isAnyPrivateEvery', () => {
    isAnyPrivateEvery(arraySmall)
  })
})

describe('arrayLargeWorst', () => {
  bench('isAnyPrivateImperative', () => {
    isAnyPrivateImperative(arrayLargeWorst)
  })

  bench('isAnyPrivateReduce', () => {
    isAnyPrivateReduce(arrayLargeWorst)
  })

  bench('isAnyPrivateMap', () => {
    isAnyPrivateMap(arrayLargeWorst)
  })

  bench('isAnyPrivateFilter', () => {
    isAnyPrivateFilter(arrayLargeWorst)
  })

  bench('isAnyPrivateFind', () => {
    isAnyPrivateFind(arrayLargeWorst)
  })

  bench('isAnyPrivateSome', () => {
    isAnyPrivateSome(arrayLargeWorst)
  })

  bench('isAnyPrivateEvery', () => {
    isAnyPrivateEvery(arrayLargeWorst)
  })
})
