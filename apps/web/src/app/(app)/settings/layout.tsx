import { Metadata } from 'next'

import Navbar from '@/components/settings/navbar'
import Header from '@/components/header'

export const metadata: Metadata = {
  title: 'Settings'
}

interface SettingsLayoutProps {
  children: React.ReactNode
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <div className="flex flex-col gap-y-5 py-10">
      <Header
        title="Settings"
        description="Manage your account and preferences."
      />

      <Navbar />

      <div className="w-full flex justify-start px-20">
        <div className="w-5/12">{children}</div>
      </div>
    </div>
  )
}
