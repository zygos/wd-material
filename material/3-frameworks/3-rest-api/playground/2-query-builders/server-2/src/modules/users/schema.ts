import { z } from 'zod'

const insertable = z.object({
  firstName: z.string(),
  lastName: z.string(),
})

export const parseInsertable = (record: unknown) => insertable.parse(record)
