import { expect, it, vi } from 'vitest';
import createAnagramSolver from './anagramSolver';

it('should print a list of anagrams to the console found in the dictionary path', async () => {
  const getDictionary = vi.fn(() => ['dusty']);
  const logger = vi.fn();

  const { getAnagrams, printAnagrams } = await createAnagramSolver(getDictionary, logger);
  const anagrams = getAnagrams('study');

  printAnagrams(anagrams);

  expect(logger).toHaveBeenCalledWith('There is 1 anagram in the dictionary:\n  - dusty');
});
