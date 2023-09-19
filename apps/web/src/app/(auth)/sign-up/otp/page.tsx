import { Metadata } from 'next'

import SignUpOtpForm from '@/components/auth/sign-up/sign-up-otp-form'

export const metadata: Metadata = {
  title: 'Verify Account'
}

export default function SignUpOtp() {
  return (
    <>
      <h1 className="font-medium text-4xl">Enter One-time Password</h1>
      <h4 className="text-lg">
        For your security, we&apos;ve sent a one-time password to your email
        address.
      </h4>

      <SignUpOtpForm />
    </>
  )
}
