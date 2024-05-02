import { z } from 'zod';
import type { Category } from '@/database';
import buildParsers from '@/utils/buildParsers';

const schema = z.object({
  id: z.coerce.number().int().positive(),
  name: z.string().min(1).max(100),
});

export const parsers = buildParsers(schema);

export const keys: (keyof Category)[] = Object.keys(
  schema.shape
) as (keyof z.infer<typeof schema>)[];
