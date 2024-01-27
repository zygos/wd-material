import { describe, expect, it } from 'vitest'
import extractChapters from '.'

describe('extractChapters', () => {
  it('returns empty list of chapters for empty string', () => {
    expect(extractChapters('')).toEqual([])
  })

  it('returns a list of chapters for markdown content', () => {
    const text = `
# Chapter 1
Random text here!,
## Chapter 1.1
### Chapter 1.1.1
Ignore text
# Chapter 2
## Chapter 2.1
### Chapter 2.1.1
`

    expect(extractChapters(text)).toEqual([
      '# Chapter 1',
      '## Chapter 1.1',
      '### Chapter 1.1.1',
      '# Chapter 2',
      '## Chapter 2.1',
      '### Chapter 2.1.1',
    ])
  })

  it('returns list of bold lines as chapters', () => {
    const text = `
# Chapter 1
Random text#Text here!,
## Chapter 1.1
**Chapter 1.1.1**
Ignore text!
`

    expect(extractChapters(text)).toEqual([
      '# Chapter 1',
      '## Chapter 1.1',
      '**Chapter 1.1.1**',
    ])
  })

  it('ignores bold line prefixes', () => {
    const text = `
**Ignore:** Text.
**Do not ignore**
**Ignore:** Text.
`

    expect(extractChapters(text)).toEqual([
      '**Do not ignore**',
    ])
  })
})
