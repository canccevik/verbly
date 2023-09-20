import { Compass, HomeIcon, LayoutGrid, List } from 'lucide-react'

import { NavbarItem } from '@/types'

export const sidebarNavItems: NavbarItem[] = [
  { title: 'Home', path: '/', icon: <HomeIcon /> },
  { title: 'My lists', path: '/my-lists', icon: <List /> },
  { title: 'Exercises', path: '/exercises', icon: <LayoutGrid /> },
  { title: 'Translate', path: '/translate', icon: <Compass /> }
]
