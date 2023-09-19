import useSWR from 'swr'

import { fetchApi } from '@/lib/utils'
import { ApiResponse, User } from '@/types'
import { useUserStore } from '@/store/user'

export function useUser() {
  const { data, isLoading } = useSWR<ApiResponse<User>>('/users/me', fetchApi)
  const setUser = useUserStore((state) => state.set)

  if (data) {
    setUser(data.data)
  }

  return {
    user: data?.data,
    isLoading
  }
}
