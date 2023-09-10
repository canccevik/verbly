import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="w-full flex flex-col items-center gap-9">
      <Image
        src={'images/not-found.svg'}
        width={500}
        height={500}
        alt="Not found"
        className="ml-24"
      />

      <h1 className="font-semibold text-4xl -mt-5">We have lost this page.</h1>
      <p className="text-lg">
        Sorry, the page you’re looking for doesn’t exist or has been removed.
      </p>

      <Link href={'/'}>
        <Button variant={'outline'} className="w-[350px]">
          Back to home
        </Button>
      </Link>
    </div>
  )
}
