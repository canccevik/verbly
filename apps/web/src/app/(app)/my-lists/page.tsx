'use client'

import { Metadata } from 'next'
import useSWR from 'swr'
import Link from 'next/link'

import Header from '@/components/header'
import { useUserStore } from '@/store/user'
import { fetcher } from '@/lib/utils/fetcher'
import ListCard from '@/components/list-card'
import { ApiResponse, List } from '@/types'

import MyListsSkeleton from './skeleton'

export const metadata: Metadata = {
  title: 'My lists'
}

export default function MyLists() {
  const { user } = useUserStore()
  const { data } = useSWR<ApiResponse<List[]>>(
    `/users/${user?._id}/lists`,
    fetcher()
  )

  return (
    <div className="flex flex-col gap-y-5 py-10">
      <Header
        title="My lists"
        description="Create or navigate to your lists in here."
        className="pb-5 border-b-2 border-gray-100"
      />

      <div className="flex justify-between px-20 gap-y-10 gap-x-2 flex-wrap">
        {data && data.data ? (
          data.data.map((list, i) => (
            <Link href={'/'} key={i} className="w-[330px]">
              <ListCard list={list} />
            </Link>
          ))
        ) : (
          <MyListsSkeleton />
        )}
      </div>
    </div>
  )
}
