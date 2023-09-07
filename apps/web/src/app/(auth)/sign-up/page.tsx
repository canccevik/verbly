import SignUpForm from '@/components/auth/sign-up/sign-up-form'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Verbly - Sign Up'
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
