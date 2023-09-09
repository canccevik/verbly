import Image from 'next/image'

interface PasswordLayoutProps {
  children: React.ReactNode
}

export default function PasswordLayout({ children }: PasswordLayoutProps) {
  return (
    <div className="w-screen h-screen flex">
      <div className="w-8/12 flex justify-center items-center">
        <div className="w-4/12 text-center flex flex-col gap-6">{children}</div>
      </div>

      <div className="w-4/12 bg-main-blue flex flex-col justify-center">
        <Image
          src={'images/auth/password-character.svg'}
          alt="Forgot password character"
          width={700}
          height={700}
          className="absolute right-44"
        />
      </div>
    </div>
  )
}
