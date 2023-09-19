import { Metadata } from 'next'

import ResetPasswordForm from '@/components/auth/password/reset-password-form'

export const metadata: Metadata = {
  title: 'Reset Password'
}

export default function ResetPassword() {
  return (
    <>
      <h1 className="font-medium text-4xl">Reset password</h1>
      <h4 className="text-lg">Please enter and confirm your new password.</h4>

      <ResetPasswordForm />
    </>
  )
}
