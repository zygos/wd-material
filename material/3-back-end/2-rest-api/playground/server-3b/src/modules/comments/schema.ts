import { z } from 'zod';
import type { Comment } from '@/database';
import buildParsers from '@/utils/buildParsers';

const schema = z.object({
  id: z.coerce.number().int().positive(),
  content: z.string().min(1).max(24000), // ~4K words
  userId: z.number().int().positive(),
});

export const parsers = buildParsers(schema);

export const keys: (keyof Comment)[] = Object.keys(
  schema.shape
) as (keyof z.infer<typeof schema>)[];
