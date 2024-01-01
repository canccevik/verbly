import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="w-full flex flex-col items-center gap-9">
      <Image
        src={'images/not-found.svg'}
        width={450}
        height={450}
        alt="Not found"
        className="ml-24"
      />

      <h1 className="font-semibold text-4xl -mt-10">We have lost this page.</h1>
      <p className="text-lg">
        Sorry, the page you&apos;re looking for doesn&apos;t exist or has been
        removed.
      </p>

      <Link href={'/'}>
        <Button className="w-[350px] rounded-xl py-8" variant={'outline'}>
          Back to home
        </Button>
      </Link>
    </div>
  )
}
