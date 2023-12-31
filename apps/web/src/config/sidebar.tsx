import { Gamepad2, LayoutGrid, List, Settings } from 'lucide-react'

import { NavbarItem } from '@/types'

export const sidebarNavItems: NavbarItem[] = [
  { title: 'Dashboard', path: '/', icon: <LayoutGrid /> },
  { title: 'My lists', path: '/my-lists', icon: <List /> },
  { title: 'Exercises', path: '/exercises', icon: <Gamepad2 /> },
  { title: 'Settings', path: '/settings', icon: <Settings /> }
]
