import { z } from 'zod'

export const resetPasswordSchema = z
  .object({
    firstPassword: z
      .string({ required_error: 'You must enter your new password.' })
      .min(6, { message: 'Password must be at least 6 characters.' })
      .max(60, { message: 'Password must be maximum 60 characters.' }),
    secondPassword: z.string({
      required_error: 'You must confirm your new password.'
    })
  })
  .refine((data) => data.firstPassword === data.secondPassword, {
    message: 'Passwords do not match.',
    path: ['secondPassword']
  })
