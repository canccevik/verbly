import { Metadata } from 'next'

import ForgotPasswordForm from '@/app/(auth)/(password)/forgot-password/form'

export const metadata: Metadata = {
  title: 'Forgot Password'
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
