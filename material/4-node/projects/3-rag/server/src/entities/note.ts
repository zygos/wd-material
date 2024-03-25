import { validates } from '@server/utils/validation'
import { z } from 'zod'

export const noteSchema = validates<Note>().with({
  id: z.number().int().positive(),
  text: z.string().min(1).max(10000).trim(),
})

export const noteInsertSchema = noteSchema.omit({ id: true })

export type NoteInsert = z.infer<typeof noteInsertSchema>
