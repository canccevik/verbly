import Sidebar from '@/components/sidebar'

interface HomeLayoutProps {
  children: React.ReactNode
}

export default function HomeLayout({ children }: HomeLayoutProps) {
  return (
    <div className="w-full flex">
      <Sidebar />
      {children}
    </div>
  )
}
