import { Gender } from '@/types'
import { z } from 'zod'

export const myProfileSchema = z.object({
  username: z
    .string({ required_error: 'Username is a required field.' })
    .min(3, { message: 'Username must be at least 3 characters.' })
    .max(20, { message: 'Username must be maximum 20 characters.' })
    .regex(/^[a-z0-9]+$/, 'Username must not contain any special characters.')
    .toLowerCase(),
  gender: z.nativeEnum(Gender, {
    required_error: 'Gender selection is required.'
  }),
  nativeLanguage: z.string({
    required_error: 'Language selection is required.'
  })
})

export const updatePasswordSchema = z
  .object({
    oldPassword: z.string().optional(),
    newPassword: z
      .string({ required_error: 'You must enter your new password.' })
      .min(6, { message: 'New password must be at least 6 characters.' })
      .max(60, { message: 'New password must be maximum 60 characters.' }),
    newPassword2: z.string({
      required_error: 'You must confirm your new password.'
    })
  })
  .refine((data) => data.newPassword === data.newPassword2, {
    message: 'New passwords do not match.',
    path: ['newPassword2']
  })
