import { expect, it } from 'vitest';
import formMessage from './formMessage';

it('should display a message for a given list of anagrams', () => {
  const anagrams = ['dusty', 'study'];

  expect(formMessage(anagrams)).toEqual(
    `There are 2 anagrams in the dictionary:
  - dusty
  - study`);
})

it('should display a message for a single anagram', () => {
  const anagrams = ['dusty'];

  expect(formMessage(anagrams)).toEqual(
    `There is 1 anagram in the dictionary:
  - dusty`);
})

it('should display a message for no anagrams', () => {
  const anagrams: string[] = [];

  expect(formMessage(anagrams)).toEqual(
    `There are no anagrams in the dictionary.`);
})
