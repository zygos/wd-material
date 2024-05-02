import { expect, it } from 'vitest'
import formatImage from './formatImage'

it('removes unnecessary whitespace from image descriptions', () => {
  const image = formatImage({ id: 1, url: '/images/1', description: ' A  cat' })

  expect(image.description).toBe('A cat')
})

it('removes non alphanumeric characters from the description', () => {
  const image = formatImage({ id: 1, url: '/images/2', description: '##A dog' })

  return expect(image.description).toBe('A dog')
})
