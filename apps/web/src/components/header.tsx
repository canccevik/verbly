interface HeaderProps {
  title: string
  description: string
}

export default function Header({ title, description }: HeaderProps) {
  return (
    <div className="px-20">
      <h1 className="text-3xl font-semibold">{title}</h1>
      <p className="mt-2">{description}</p>
    </div>
  )
}
