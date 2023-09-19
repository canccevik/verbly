import React from 'react'

import { Skeleton } from '@/components/ui/skeleton'

export default function UpdatePasswordSkeleton() {
  return (
    <div className="w-full flex flex-col gap-y-8">
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
      </div>

      <Skeleton className="w-full h-[60px]" />
    </div>
  )
}
