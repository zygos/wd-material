import { z } from 'zod';
import type { User } from '@/database';
import buildParsers from '@/utils/buildParsers';

const schema = z.object({
  id: z.coerce.number().int().positive(),
  username: z.string().min(1).max(100),
});

export const parsers = buildParsers(schema);

export const keys: (keyof User)[] = Object.keys(schema.shape) as (keyof z.infer<
  typeof schema
>)[];
