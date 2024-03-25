import { z } from 'zod';
import type { Article } from '@/database';

// validation schema
type Record = Article;
const schema = z.object({
  // positive integer
  id: z.coerce.number().int().positive(),

  // ~100 words, no empty strings
  title: z.string().min(1).max(500),

  // ~16K words, no empty strings
  content: z.string().min(1).max(100000),
});

// parsers for validating and coercing data
const insertable = schema.omit({
  id: true,
});
const partial = insertable.partial();

export const parseId = (id: unknown) => schema.shape.id.parse(id);
export const parse = (record: unknown) => schema.parse(record);
export const parseInsertable = (record: unknown) => insertable.parse(record);
export const parsePartial = (record: unknown) => partial.parse(record);

// matches database and validation schema keys
export const keys: (keyof Record)[] = Object.keys(
  schema.shape
) as (keyof z.infer<typeof schema>)[];
