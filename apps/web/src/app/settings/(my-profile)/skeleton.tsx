import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

export default function MyProfileSkeleton() {
  return (
    <div className="w-full flex flex-col gap-y-8">
      <div className="flex flex-col gap-y-3">
        <Skeleton className="w-20 h-5" />
        <Skeleton className="w-full h-[60px]" />
        <Skeleton className="w-40 h-5" />
      </div>

      <div className="flex flex-col gap-y-3">
        <Skeleton className="w-20 h-5" />
        <Skeleton className="w-full h-[60px]" />
      </div>

      <div className="flex flex-col gap-y-3">
        <Skeleton className="w-20 h-5" />
        <Skeleton className="w-full h-[60px]" />
      </div>

      <div className="flex flex-col gap-y-3">
        <Skeleton className="w-20 h-5" />
        <Skeleton className="w-full h-[60px]" />
        <Skeleton className="w-40 h-5" />
      </div>

      <Skeleton className="w-full h-[60px]" />
    </div>
  )
}
