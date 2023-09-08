import Image from 'next/image'

interface SignUpLayoutProps {
  children: React.ReactNode
}

export default function SignUpLayout({ children }: SignUpLayoutProps) {
  return (
    <div className="w-screen h-screen flex">
      <div className="w-8/12 flex justify-center items-center">
        <div className="w-[400px] text-center flex flex-col gap-6">
          {children}
        </div>
      </div>

      <div className="w-4/12 bg-main-blue flex flex-col justify-center">
        <Image
          src={'images/auth/sign-up-character.svg'}
          alt="Sign up character"
          width={600}
          height={600}
          className="absolute right-64"
        />
      </div>
    </div>
  )
}
