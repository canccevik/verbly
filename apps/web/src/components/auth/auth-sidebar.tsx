import React from 'react'
import Image, { ImageProps } from 'next/image'

import { cn } from '@/lib/utils'

interface AuthSidebarProps extends Omit<ImageProps, 'alt'> {}

export default function AuthSidebar({ className, ...props }: AuthSidebarProps) {
  return (
    <div className="w-4/12 bg-main-blue flex flex-col justify-center">
      <Image className={cn('absolute', className)} alt="Character" {...props} />
    </div>
  )
}
