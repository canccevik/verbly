import AuthSidebar from '@/components/auth/auth-sidebar'

interface SignUpLayoutProps {
  children: React.ReactNode
}

export default function SignUpLayout({ children }: SignUpLayoutProps) {
  return (
    <div className="w-screen h-screen flex">
      <div className="w-8/12 flex justify-center items-center">
        <div className="w-4/12 text-center flex flex-col gap-6">{children}</div>
      </div>

      <AuthSidebar
        src={'images/auth/sign-up-character.svg'}
        width={600}
        height={600}
        className="right-64"
      />
    </div>
  )
}
