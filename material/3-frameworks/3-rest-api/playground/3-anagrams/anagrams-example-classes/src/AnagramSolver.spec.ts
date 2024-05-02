import { describe, expect, it, vi } from 'vitest';
import AnagramSolver from './AnagramSolver';

it('should print a list of anagrams to the console found in the dictionary path', async () => {
  const getDictionary = vi.fn(() => ['dusty']);
  const logger = vi.fn();

  const anagramSolver = new AnagramSolver(logger);
  await anagramSolver.loadDictionary(getDictionary);

  const anagrams = anagramSolver.getAnagrams('study');

  anagramSolver.printAnagrams(anagrams);

  expect(logger).toHaveBeenCalledWith('There is 1 anagram in the dictionary:\n  - dusty');
});

describe('printAnagrams', async () => {
  it('should print a list of anagrams to provided logger', () => {
    const logger = vi.fn();
    const anagramSolver = new AnagramSolver(logger);

    anagramSolver.printAnagrams(['smoky']);

    expect(logger).toHaveBeenCalledWith('There is 1 anagram in the dictionary:\n  - smoky');
  })
})

describe('getAnagrams', async () => {
  const anagramSolver = new AnagramSolver(vi.fn());
  await anagramSolver.loadDictionary(vi.fn(() => ['dusty', 'night']));

  it('should return an array of anagrams for the given word', () => {
    expect(anagramSolver.getAnagrams('study')).toEqual(['dusty'])
    expect(anagramSolver.getAnagrams('thing')).toEqual(['night'])
  })

  it('should return an empty array if there are no anagrams', () => {
    expect(anagramSolver.getAnagrams('coding')).toEqual([])
  })

  it('should return an empty array if the dictionary is empty', async () => {
    const anagramSolverEmpty = new AnagramSolver(vi.fn());
    await anagramSolverEmpty.loadDictionary(vi.fn(() => []));

    expect(anagramSolverEmpty.getAnagrams('study')).toEqual([])
  })

  it('should return an empty array if the word is empty', async () => {
    expect(anagramSolver.getAnagrams('')).toEqual([])
  })

  it('should not include partial anagrams', () => {
    expect(anagramSolver.getAnagrams('dust')).toEqual([])
    expect(anagramSolver.getAnagrams('dustyy')).toEqual([])
  })

  it('should not include the word itself', () => {
    expect(anagramSolver.getAnagrams('dusty')).toEqual([])
  })
})
