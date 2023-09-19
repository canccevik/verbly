import AuthSidebar from '@/components/auth/auth-sidebar'

interface PasswordLayoutProps {
  children: React.ReactNode
}

export default function PasswordLayout({ children }: PasswordLayoutProps) {
  return (
    <div className="w-screen h-screen flex">
      <div className="w-8/12 flex justify-center items-center">
        <div className="w-4/12 text-center flex flex-col gap-6">{children}</div>
      </div>

      <AuthSidebar
        src={'images/auth/password-character.svg'}
        width={700}
        height={700}
        className="right-44"
      />
    </div>
  )
}
