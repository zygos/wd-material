import { expect, it, vi } from 'vitest';
import type { Expect, Equal } from 'type-testing';
import { wrap } from './wrap';

it('does not return the original function', () => {
  const nothing = () => {};
  const wrapped = wrap(nothing);

  expect(wrapped).not.toBe(nothing);
});

it('should pass through the input for function without arguments', () => {
  const always5 = (): number => 5;
  const wrapped = wrap(always5);

  type TypeMatch = Expect<Equal<typeof always5, typeof wrapped>>;
  expect(wrapped()).toBe(5);
});

it('should pass through the input for a unary function', () => {
  const identity = (a: number): number => a;
  const wrapped = wrap(identity);

  type TypeMatch = Expect<Equal<typeof identity, typeof wrapped>>;
  expect(wrapped(1)).toBe(1);
});

it('should pass through the input for a binary function', () => {
  const join = (a: string, b: number): string => a + b;
  const wrapped = wrap(join);

  type TypeMatch = Expect<Equal<typeof join, typeof wrapped>>;
  expect(wrapped('1', 2)).toBe('12');
});

it('should pass through the input with arbitrary number of arguments', () => {
  const joinNumbers = (...numbers: number[]): string => numbers.join('');
  const wrapped = wrap(joinNumbers);

  type TypeMatch = Expect<Equal<typeof joinNumbers, typeof wrapped>>;

  const numbers = Array.from({ length: 32 }, (_, i) => i);
  const expected = numbers.join('');

  expect(wrapped(...numbers)).toBe(expected);
});

it('returns a function which calls the original function once', () => {
  const fn = (number: number, string: string, object: object): void => {};
  const spy = vi.fn(fn);
  const wrapped = wrap(spy);

  const object = {};
  wrapped(1, '2', object);

  expect(spy).toHaveBeenCalledTimes(1);
  expect(spy).toHaveBeenCalledWith(1, '2', object);
});

// Optional challenge
it.skip('should handle function overloads', () => {
  function overloaded(a: number): number;
  function overloaded(a: string): string;
  function overloaded(a: any): any {
    return a;
  }

  const wrapped = wrap(overloaded);

  type TypeMatch = Expect<Equal<typeof overloaded, typeof wrapped>>;

  expect(wrapped(1)).toBe(1);
  expect(wrapped('2')).toBe('2');
});
