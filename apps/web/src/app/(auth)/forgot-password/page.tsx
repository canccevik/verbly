import ForgotPasswordForm from '@/components/auth/forgot-password/forgot-password-form'
import { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Verbly - Forgot Password'
}

export default function ForgotPassword() {
  return (
    <div className="w-screen h-screen flex">
      <div className="w-8/12 flex justify-center items-center">
        <div className="w-[400px] text-center flex flex-col gap-6">
          <h1 className="font-medium text-4xl">Forgot password?</h1>
          <h4 className="text-lg">
            Please enter your email address to receive a verification code.
          </h4>

          <ForgotPasswordForm />
        </div>
      </div>

      <div className="w-4/12 bg-main-blue flex flex-col justify-center">
        <Image
          src={'images/forgot-password-character.svg'}
          alt="Forgot password character"
          width={700}
          height={700}
          className="absolute right-44"
        />
      </div>
    </div>
  )
}
