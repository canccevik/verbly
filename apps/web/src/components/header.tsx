import React from 'react'

import { cn } from '@/lib/utils'

interface HeaderProps {
  title: string
  description?: string
  className?: string
  children?: React.ReactNode
}

export default function Header({
  title,
  description,
  className,
  children
}: HeaderProps) {
  return (
    <div
      className={cn('px-20 py-8 flex justify-between items-center ', className)}
    >
      <div>
        <h1 className="text-3xl font-semibold">{title}</h1>
        {description && <p className="mt-2">{description}</p>}
      </div>

      {children}
    </div>
  )
}
