import ForgotPasswordForm from '@/components/auth/password/forgot-password-form'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Verbly - Forgot Password'
}

export default function ForgotPassword() {
  return (
    <>
      <h1 className="font-medium text-4xl">Forgot password?</h1>
      <h4 className="text-lg">
        Please enter your email address to receive a link to reset your
        password.
      </h4>

      <ForgotPasswordForm />
    </>
  )
}
