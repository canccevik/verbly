import { z } from 'zod'

export const signUpOtpSchema = z.object({
  email: z.string().email(),
  otpCode: z.string()
})
