import { cn } from '@/lib/utils'

interface HeaderProps {
  title: string
  description: string
  className?: string
}

export default function Header({ title, description, className }: HeaderProps) {
  return (
    <div className={cn('px-20', className)}>
      <h1 className="text-3xl font-semibold">{title}</h1>
      <p className="mt-2">{description}</p>
    </div>
  )
}
