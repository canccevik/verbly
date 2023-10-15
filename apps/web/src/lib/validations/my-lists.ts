import { z } from 'zod'

export const newListSchema = z.object({
  name: z
    .string({ required_error: 'List name is required.' })
    .min(1, { message: 'List name must be at least 1 character.' })
    .max(50, { message: 'List name must be maximum 50 characters.' })
    .toLowerCase(),
  wordLanguage: z.string({
    required_error: 'Word language is required.'
  }),
  meaningLanguage: z.string({
    required_error: 'Meaning language is required.'
  }),
  icon: z.string()
})
