import { z } from 'zod'

export const signUpOtpSchema = z.object({
  email: z.string().email(),
  otpCode: z.string({ required_error: 'You must enter your otp code.' })
})
