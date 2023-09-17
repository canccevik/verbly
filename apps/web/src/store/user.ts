import { User } from '@/types'
import { create } from 'zustand'

interface State {
  user: User | null
}

interface Actions {
  set: (user: User) => void
}

export const useUserStore = create<State & Actions>((set) => ({
  user: null,
  set: (user) => set(() => ({ user: user }))
}))
