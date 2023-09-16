'use client'

import Link from 'next/link'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import {
  ChevronsUpDown,
  Compass,
  Globe2,
  HomeIcon,
  LayoutGrid,
  List,
  LogOut,
  Settings,
  User2
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { useUser } from '@/hooks/use-user'
import { Skeleton } from './ui/skeleton'
import { fetchApi } from '@/lib/utils'
import { useRouter } from 'next/navigation'

export default function Sidebar() {
  const { user } = useUser()
  const router = useRouter()

  async function logout() {
    await fetchApi('/auth/logout', 'POST')
    router.push('/sign-in')
  }

  return (
    <div className="w-2/12 h-screen border-r-2 border-gray-100 fixed top-0 left-0 overflow-y-auto flex flex-col justify-between items-center pt-10 px-8">
      <div className="flex items-center gap-x-5 self-start ml-5">
        <Globe2 size={35} />
        <h1 className="font-semibold text-2xl text-zinc-900">Verbly</h1>
      </div>

      <ul className="w-full flex flex-col gap-y-5">
        <Link href={'/'}>
          <li className="flex bg-zinc-100 px-8 py-5 rounded-2xl">
            <HomeIcon className="text-zinc-800" />
            <span className="ml-6 font-semibold">Home</span>
          </li>
        </Link>

        <Link href={'/'}>
          <li className="flex px-8 py-5 rounded-2xl hover:bg-zinc-100">
            <List className="text-zinc-800" />
            <span className="ml-6 font-semibold">My lists</span>
          </li>
        </Link>

        <Link href={'/'}>
          <li className="flex px-8 py-5 rounded-2xl hover:bg-zinc-100">
            <LayoutGrid className="text-zinc-800" />
            <span className="ml-6 font-semibold">Exercises</span>
          </li>
        </Link>

        <Link href={'/'}>
          <li className="flex px-8 py-5 rounded-2xl hover:bg-zinc-100">
            <Compass className="text-zinc-800" />
            <span className="ml-6 font-semibold">Translate</span>
          </li>
        </Link>
      </ul>

      <div></div>

      <div className="w-full mb-5 relative">
        <DropdownMenu>
          <DropdownMenuTrigger className="w-full outline-none flex items-center justify-between bg-zinc-100 px-8 py-5 rounded-2xl">
            <div className="flex items-center justify-start">
              {user ? (
                <>
                  <Avatar>
                    <AvatarImage src={user.profilePhoto} alt="Avatar" />
                  </Avatar>

                  <span className="ml-3 font-semibold">{user.username}</span>
                </>
              ) : (
                <>
                  <Skeleton className="w-10 h-10 rounded-full bg-zinc-300" />
                  <Skeleton className="w-24 h-4 bg-zinc-300 ml-3" />
                </>
              )}
            </div>

            <ChevronsUpDown className="text-zinc-600" size={20} />
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-[260px]">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuItem>
              <User2 size={18} />
              <span className="ml-3 font-medium">Profile</span>
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => router.push('/settings')}>
              <Settings size={18} />
              <span className="ml-3 font-medium">Settings</span>
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => logout()}>
              <LogOut size={18} />
              <span className="ml-3 font-medium">Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
