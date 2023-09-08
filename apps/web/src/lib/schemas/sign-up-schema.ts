import { z } from 'zod'

export const signUpSchema = z.object({
  username: z
    .string({ required_error: 'Username is a required field.' })
    .min(3, { message: 'Username must be at least 3 characters.' })
    .max(20, { message: 'Username must be maximum 20 characters.' })
    .regex(/^[a-z0-9]+$/, 'Username must not contain any special characters.')
    .toLowerCase(),
  password: z
    .string({ required_error: 'Password is a required field.' })
    .min(6, { message: 'Password must be at least 6 characters.' })
    .max(60, { message: 'Password must be maximum 60 characters.' }),
  email: z
    .string({ required_error: 'Email is a required field.' })
    .email({ message: 'Email address must be in a valid email format.' }),
  nativeLanguage: z.string({
    required_error: 'Language selection is required.'
  })
})
