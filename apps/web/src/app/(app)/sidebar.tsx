'use client'

import Link from 'next/link'
import { LogOut } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import useSWRMutation from 'swr/mutation'

import { HttpMethod, fetcher } from '@/lib/utils/fetcher'
import { sidebarNavItems } from '@/config/sidebar'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { useUser } from '@/hooks/use-user'

export default function Sidebar() {
  const {} = useUser()
  const router = useRouter()
  const pathname = usePathname()
  const { trigger } = useSWRMutation('/auth/logout', fetcher(HttpMethod.POST))

  async function logout() {
    await trigger({})
    router.push('/sign-in')
  }

  return (
    <div className="w-2/12 h-screen border-r-2 bg-white border-gray-100 fixed top-0 left-0 overflow-y-auto flex flex-col justify-between items-center pt-10 px-8">
      <h1 className="font-semibold text-center text-3xl text-zinc-900">
        Verbly
      </h1>

      <ul className="w-full flex flex-col gap-y-5">
        {sidebarNavItems.map((item, i) => (
          <Link href={item.path} key={i}>
            <li
              className={cn(
                'flex hover:bg-zinc-100 p-5 rounded-xl text-zinc-800',
                item.path === pathname && 'bg-zinc-100'
              )}
            >
              <span className={cn(item.path === pathname && 'text-main-blue')}>
                {item.icon}
              </span>
              <span
                className={cn(
                  'ml-6 font-medium',
                  item.path === pathname && 'text-main-blue'
                )}
              >
                {item.title}
              </span>
            </li>
          </Link>
        ))}
      </ul>

      <div></div>

      <Button
        className="w-full mb-5 py-8 rounded-xl hover:no-underline"
        variant={'secondary'}
        onClick={() => logout()}
      >
        <LogOut size={18} />
        <span className="ml-3 font-medium">Logout</span>
      </Button>
    </div>
  )
}
