import { Metadata } from 'next'

import Navbar from '@/components/settings/navbar'

export const metadata: Metadata = {
  title: 'Settings'
}

interface SettingsLayoutProps {
  children: React.ReactNode
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <div className="flex flex-col gap-y-5 py-10">
      <div className="px-20">
        <h1 className="text-3xl font-semibold">Settings</h1>
        <p className="mt-2">Manage your account and preferences.</p>
      </div>

      <Navbar />

      <div className="w-full flex justify-start px-20">
        <div className="w-5/12">{children}</div>
      </div>
    </div>
  )
}
