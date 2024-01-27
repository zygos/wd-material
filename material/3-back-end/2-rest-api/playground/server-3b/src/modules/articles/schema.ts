import { z } from 'zod';
import type { Article } from '@/database';
import buildParsers from '@/utils/buildParsers';

// validation schema
const schema = z.object({
  id: z.coerce.number().int().positive(), // positive integer
  title: z.string().min(1).max(500), // ~100 words, no empty strings
  content: z.string().min(1).max(100000), // ~16K words, no empty strings
  userId: z.number().int().positive().nullable(),
});

// parsers for validating and coercing data
export const parsers = buildParsers(schema);

// matches database and validation schema keys
export const keys: (keyof Article)[] = Object.keys(
  schema.shape
) as (keyof z.infer<typeof schema>)[];
