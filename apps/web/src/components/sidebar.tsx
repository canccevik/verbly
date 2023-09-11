import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
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

export default function Sidebar() {
  return (
    <div className="w-2/12 h-screen border-r-2 border-gray-100 flex flex-col justify-between items-center pt-10 px-8">
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

      <ul className="w-full mb-5 relative">
        <DropdownMenu>
          <DropdownMenuTrigger className="w-full outline-none">
            <li className="flex items-center justify-between bg-zinc-100 px-8 py-5 rounded-2xl">
              <div className="flex items-center justify-start">
                <Avatar>
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CÇ</AvatarFallback>
                </Avatar>

                <span className="ml-6 font-semibold">Can Çevik</span>
              </div>

              <ChevronsUpDown className="text-zinc-600" size={20} />
            </li>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-[250px]">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuItem>
              <User2 size={18} />
              <span className="ml-3 font-medium">Profile</span>
            </DropdownMenuItem>

            <DropdownMenuItem>
              <Settings size={18} />
              <span className="ml-3 font-medium">Settings</span>
            </DropdownMenuItem>

            <DropdownMenuItem>
              <LogOut size={18} />
              <span className="ml-3 font-medium">Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </ul>
    </div>
  )
}
