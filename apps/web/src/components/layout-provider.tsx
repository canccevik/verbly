'use client'

import { usePathname } from 'next/navigation'
import Sidebar from './sidebar'
import { publicRoutes } from '@/middleware'
import { Toaster } from './ui/toaster'

interface LayoutProviderProps {
  children: React.ReactNode
}

export default function LayoutProvider({ children }: LayoutProviderProps) {
  const pathname = usePathname()

  return (
    <main className="flex">
      {!publicRoutes.includes(pathname) && <Sidebar />}

      <section className="w-full py-10">{children}</section>

      <Toaster />
    </main>
  )
}
