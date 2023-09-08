import ResetPasswordForm from '@/components/auth/password/reset-password-form'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Verbly - Reset Password'
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
