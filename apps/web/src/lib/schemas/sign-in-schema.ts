import { z } from 'zod'

export const signInSchema = z.object({
  username: z.string({ required_error: 'Username is a required field.' }),
  password: z.string({ required_error: 'Password is a required field.' })
})
