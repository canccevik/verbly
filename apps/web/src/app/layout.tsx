import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'

import '@/styles/globals.css'
import { siteConfig } from '@/config/site'
import { Toaster } from '@/components/ui/toaster'
import { cn } from '@/lib/utils'

const montserrat = Montserrat({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`
  }
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={cn(montserrat.className, 'bg-gray-50')}>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
