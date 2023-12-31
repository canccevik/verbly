'use client'

import useSWR from 'swr'
import Link from 'next/link'

import Header from '@/components/header'
import { useUserStore } from '@/store/user'
import { fetcher } from '@/lib/utils/fetcher'
import ListCard from '@/components/list-card'
import { ApiResponse, List } from '@/types'

import MyListsSkeleton from './skeleton'
import NewListDialog from './_dialog'

export default function MyLists() {
  const { user } = useUserStore()
  const { data } = useSWR<ApiResponse<List[]>>(
    `/users/${user?._id}/lists`,
    fetcher()
  )

  return (
    <div className="flex flex-col gap-y-5">
      <Header
        title="My lists"
        description="Create or navigate to your lists in here."
        className="pb-5 border-b-2 border-gray-100"
      >
        <NewListDialog />
      </Header>

      <div className="flex justify-between px-20 gap-y-10 gap-x-2 flex-wrap mb-10">
        {data && data.data ? (
          data.data.map((list, i) => (
            <Link href={`/my-lists/${list._id}`} key={i} className="w-[330px]">
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
