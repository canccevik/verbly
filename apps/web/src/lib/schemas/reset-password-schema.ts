import { z } from 'zod'

export const resetPasswordSchema = z
  .object({
    firstPassword: z.string().min(6).max(60),
    secondPassword: z.string().min(6).max(60)
  })
  .refine((data) => data.firstPassword === data.secondPassword, {
    message: 'Passwords do not match',
    path: ['secondPassword']
  })
