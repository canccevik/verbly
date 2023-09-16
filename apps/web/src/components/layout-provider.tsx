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
  const isPublicRoute = publicRoutes.includes(pathname)

  return (
    <main className="flex">
      {!isPublicRoute && <Sidebar />}

      <section className={isPublicRoute ? 'w-full' : 'w-10/12 ml-auto'}>
        {children}
      </section>

      <Toaster />
    </main>
  )
}
