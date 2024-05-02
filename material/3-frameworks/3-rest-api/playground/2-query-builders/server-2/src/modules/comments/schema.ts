import { z } from 'zod'

// validation schema
const insertable = z.object({
  articleId: z.number().int(),
  userId: z.number().int(),
  content: z.string(),
})

export const parseInsertable = (record: unknown) => insertable.parse(record)
