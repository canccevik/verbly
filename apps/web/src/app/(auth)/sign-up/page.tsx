import SignUpForm from '@/components/auth/sign-up-form'
import { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Verbly - Sign Up'
}

export default function SignUp() {
  return (
    <div className="w-screen h-screen flex">
      <div className="w-8/12 flex justify-center items-center">
        <div className="w-[400px] text-center flex flex-col gap-6">
          <h1 className="font-medium text-4xl">Get&apos;s Started</h1>
          <h4 className="text-lg">Join our amazing community for free.</h4>

          <SignUpForm />
        </div>
      </div>

      <div className="w-4/12 bg-main-blue flex flex-col justify-center">
        <Image
          src={'images/sign-up-character.svg'}
          alt="Sign up character"
          width={600}
          height={600}
          className="absolute right-64"
        />
      </div>
    </div>
  )
}
