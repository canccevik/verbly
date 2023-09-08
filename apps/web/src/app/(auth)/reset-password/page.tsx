import ResetPasswordForm from '@/components/auth/reset-password/reset-password-form'
import { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Verbly - Reset Password'
}

export default function ResetPassword() {
  return (
    <div className="w-screen h-screen flex">
      <div className="w-8/12 flex justify-center items-center">
        <div className="w-[400px] text-center flex flex-col gap-6">
          <h1 className="font-medium text-4xl">Reset password</h1>
          <h4 className="text-lg">
            Please enter and confirm your new password.
          </h4>

          <ResetPasswordForm />
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
