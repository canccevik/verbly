import '@/styles/globals.css'
import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import { Toaster } from '@/components/ui/toaster'
import { siteConfig } from '@/config/site'

const montserrat = Montserrat({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`
  }
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  )
}
