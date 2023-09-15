import Navbar from '@/components/settings/navbar'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Settings'
}

interface SettingsLayoutProps {
  children: React.ReactNode
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <div className="flex flex-col gap-y-5">
      <div className="px-20">
        <h1 className="text-3xl font-semibold">Settings</h1>
        <p className="mt-2">Manage your account and preferences.</p>
      </div>

      <Navbar />

      <div className="px-20 w-full">{children}</div>
    </div>
  )
}
