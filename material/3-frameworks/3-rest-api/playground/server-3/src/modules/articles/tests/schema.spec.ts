import { omit } from 'lodash/fp';
import { parse, parseInsertable, parseUpdateable } from '../schema';
import { articleFactoryFull } from './utils';

// Generally, schemas are tested with a few examples of valid and invalid records.

it('parses a valid record', () => {
  const record = articleFactoryFull();

  expect(parse(record)).toEqual(record);
});

it('throws an error due to empty/missing title (concrete)', () => {
  // ARRANGE
  const articleWithoutTitle = {
    id: 52,
    title: '',
    content: 'content',
  };
  const articleEmptyTitle = {
    id: 52,
    title: '',
    content: 'content',
  };

  // ACT & ASSERT
  // expect our function to throw an error that
  // mentions an issue with the title
  expect(() => parse(articleWithoutTitle)).toThrow(/title/i);
  expect(() => parse(articleEmptyTitle)).toThrow(/title/i);
})

// a more generic vesion of the above test, which makes
// no assumptions about other properties
it('throws an error due to empty/missing title (generic)', () => {
  const articleWithoutTitle = omit(['title'], articleFactoryFull());
  const articleEmptyTitle = articleFactoryFull({
    title: '',
  });

  expect(() => parse(articleWithoutTitle)).toThrow(/title/i);
  expect(() => parse(articleEmptyTitle)).toThrow(/title/i);
});

it('throws an error due to empty/missing content', () => {
  const recordWithoutContent = omit(['content'], articleFactoryFull());
  const recordEmpty = articleFactoryFull({
    content: '',
  });

  expect(() => parse(recordWithoutContent)).toThrow(/content/i);
  expect(() => parse(recordEmpty)).toThrow(/content/i);
});

// every other function is a derivative of parse()
describe('parseInsertable', () => {
  it('omits id', () => {
    const parsed = parseInsertable(articleFactoryFull());

    expect(parsed).not.toHaveProperty('id');
  });
});

describe('parseUpdateable', () => {
  it('omits id', () => {
    const parsed = parseUpdateable(articleFactoryFull());

    expect(parsed).not.toHaveProperty('id');
  });
});
