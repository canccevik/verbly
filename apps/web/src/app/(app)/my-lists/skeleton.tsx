import { Skeleton } from '@/components/ui/skeleton'

const ITEM_COUNT = 16

export default function MyListsSkeleton() {
  return Array(ITEM_COUNT)
    .fill(null)
    .map((_, i) => (
      <Skeleton
        key={i}
        className="w-[330px] px-8 py-11 flex justify-between items-center"
      >
        <Skeleton className="flex flex-col">
          <Skeleton className="w-36 h-6 bg-zinc-400" />

          <Skeleton className="flex mt-4">
            <Skeleton className="w-10 h-4 bg-zinc-400" />
            <Skeleton className="w-14 h-4 ml-2 bg-zinc-400" />
          </Skeleton>
        </Skeleton>

        <Skeleton className="w-[50px] h-[50px] rounded-full bg-zinc-400" />
      </Skeleton>
    ))
}
