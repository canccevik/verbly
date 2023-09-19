import { Metadata } from 'next'

import SignUpForm from '@/app/(auth)/sign-up/form'

export const metadata: Metadata = {
  title: 'Sign Up'
}

export default function SignUp() {
  return (
    <>
      <h1 className="font-medium text-4xl">Get&apos;s Started</h1>
      <h4 className="text-lg">Join our amazing community for free.</h4>

      <SignUpForm />
    </>
  )
}
