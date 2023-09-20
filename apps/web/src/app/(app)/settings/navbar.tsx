'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/lib/utils'
import { navbarItems } from '@/config/settings'

export default function Navbar() {
  const pathname = usePathname()

  return (
    <div className="px-20 border-t-2 border-b-2 border-gray-100">
      <ul className="flex gap-x-10 pt-4 font-medium">
        {navbarItems.map((item, i) => (
          <li
            key={i}
            className={cn(
              'pb-4 hover:text-main-blue',
              item.path === pathname &&
                'text-main-blue border-b-2 border-main-blue'
            )}
          >
            <Link href={item.path}>{item.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
