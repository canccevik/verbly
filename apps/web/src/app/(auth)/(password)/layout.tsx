import Image from 'next/image'

export default function PasswordLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className="w-screen h-screen flex">
      <div className="w-8/12 flex justify-center items-center">
        <div className="w-[400px] text-center flex flex-col gap-6">
          {children}
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