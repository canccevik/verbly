import useSWR from 'swr'
import { fetchApi } from '@/lib/utils'
import { ApiResponse, User } from '@/types'

export function useUser() {
  const { data, isLoading } = useSWR<ApiResponse<User>>('/users/me', fetchApi)

  return {
    user: data?.data,
    isLoading
  }
}
