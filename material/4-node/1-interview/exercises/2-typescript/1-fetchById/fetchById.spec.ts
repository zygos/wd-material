import { it, expect, vi } from 'vitest';
import { fetchUserById } from './fetchById';
import type { Expect, Equal } from 'type-testing';
import type { User } from './entities';

it('fetches data correctly', async () => {
  vi.stubGlobal('fetch', async () => ({
    ok: true,
    json: async () => ({
      id: '123',
      name: 'Test User',
    }),
  }));

  const user = await fetchUserById(123);

  expect(user).toEqual({
    id: '123',
    name: 'Test User',
  });

  // This is a type test. If your IDE flags an error here, it means the type
  // of `user` is not `User` and you should check your implementation.
  type TypeTest = Expect<Equal<typeof user, User>>;
});

it('throws an error when response is not ok', async () => {
  vi.stubGlobal('fetch', async () => ({
    ok: false,
    status: 400,
    statusText: 'Bad Request',
  }));

  await expect(fetchUserById).rejects.toThrow('Failed to fetch data');
});
