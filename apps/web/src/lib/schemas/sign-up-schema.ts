import { z } from 'zod'

export const signUpSchema = z.object({
  username: z
    .string()
    .min(3)
    .max(20)
    .regex(/^[a-z0-9]+$/, 'Username is not valid')
    .toLowerCase(),
  password: z.string().min(6).max(60),
  email: z.string().email(),
  nativeLanguage: z.string()
})
