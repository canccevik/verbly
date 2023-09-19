import Sidebar from '@/components/sidebar'

interface AppLayout {
  children: React.ReactNode
}

export default function AppLayout({ children }: AppLayout) {
  return (
    <div className="flex">
      <Sidebar />
      <section className="w-10/12 ml-auto">{children}</section>
    </div>
  )
}
