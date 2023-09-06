import Image, { ImageProps } from 'next/image'
import Link from 'next/link'
import React from 'react'

interface CircleSocialButtonProps {
  text: string
  href: string
  alt: string
  img: Omit<ImageProps, 'alt'>
}

export default function CircleSocialButton({
  text,
  href,
  alt,
  img
}: CircleSocialButtonProps) {
  return (
    <div className="w-[100px] flex flex-col items-center gap-1">
      <Link href={href}>
        <div className="w-[60px] h-[60px] rounded-full bg-main-grey flex justify-center hover:bg-main-grey-hover">
          <Image {...img} alt={alt} />
        </div>
        <p className="text-sm">{text}</p>
      </Link>
    </div>
  )
}
