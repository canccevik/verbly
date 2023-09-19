import { User } from '@/types'
import { create } from 'zustand'

interface State {
  user: User | null
}

interface Actions {
  set: (user: User) => void
  setHasPassword: (value: boolean) => void
}

export const useUserStore = create<State & Actions>((set) => ({
  user: null,
  set: (user) => set(() => ({ user: user })),
  setHasPassword: (value) =>
    set(({ user }) => ({ user: { ...user, hasPassword: value } as User }))
}))
