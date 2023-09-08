import SignInForm from '@/components/auth/sign-in/sign-in-form'
import { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Sign In'
}

export default function SignIn() {
  return (
    <div className="w-screen h-screen flex">
      <div className="w-8/12 flex justify-center items-center">
        <div className="w-[400px] text-center flex flex-col gap-6">
          <h1 className="font-medium text-4xl">Hello Again!</h1>
          <h4 className="text-lg">Welcome back you&apos;ve been missed!</h4>

          <SignInForm />
        </div>
      </div>

      <div className="w-4/12 bg-main-blue flex flex-col justify-center">
        <Image
          src={'images/auth/sign-in-character.svg'}
          alt="Sign in character"
          width={700}
          height={700}
          className="absolute right-44"
        />
      </div>
    </div>
  )
}
