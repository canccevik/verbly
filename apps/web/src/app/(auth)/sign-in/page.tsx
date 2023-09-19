import { Metadata } from 'next'

import SignInForm from '@/app/(auth)/sign-in/form'
import AuthSidebar from '@/components/auth/auth-sidebar'

export const metadata: Metadata = {
  title: 'Sign In'
}

export default function SignIn() {
  return (
    <div className="w-full h-screen flex">
      <div className="w-8/12 flex justify-center items-center">
        <div className="w-4/12 text-center flex flex-col gap-6">
          <h1 className="font-medium text-4xl">Hello Again!</h1>
          <h4 className="text-lg">Welcome back you&apos;ve been missed!</h4>

          <SignInForm />
        </div>
      </div>

      <AuthSidebar
        src={'images/auth/sign-in-character.svg'}
        width={700}
        height={700}
        className="right-44"
      />
    </div>
  )
}
