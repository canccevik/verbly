import { z } from 'zod'

export const forgotPasswordSchema = z.object({
  email: z
    .string({ required_error: 'You must enter your email address.' })
    .email({ message: 'Email address must be in a valid email format.' })
})
