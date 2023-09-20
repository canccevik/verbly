import useSWR from 'swr'

import { fetcher } from '@/lib/utils/fetcher'
import { ApiResponse, User } from '@/types'
import { useUserStore } from '@/store/user'

export function useUser() {
  const { data, isLoading } = useSWR<ApiResponse<User>>('/users/me', fetcher())
  const setUser = useUserStore((state) => state.set)

  if (data) {
    setUser(data.data)
  }

  return {
    user: data?.data,
    isLoading
  }
}
