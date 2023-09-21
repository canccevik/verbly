import dynamicIconImports from 'lucide-react/dynamicIconImports'

export type SiteConfig = {
  name: string
}

export type NavbarItem = {
  title: string
  path: string
  icon?: React.ReactNode
}

export type ApiResponse<T> = {
  data: T
  message: string
  statusCode: number
}

export enum Gender {
  NotKnown = '0',
  Male = '1',
  Female = '2',
  NonBinary = '3'
}

export type User = {
  _id: string
  username: string
  email: string
  gender: Gender
  nativeLanguage: string
  profilePhoto: string
  isEmailConfirmed: boolean
  hasPassword: boolean
  registeredAt: string
}

export enum WordStatus {
  ToBeLearned,
  BeingLearned,
  Learned
}

export type Word = {
  _id: string
  listId: string
  word: string
  meaning: string
  pronunciation?: string
  status: WordStatus
  order: number
}

export type List = {
  _id: string
  ownerId: string
  name: string
  wordLanguage: string
  meaningLanguage: string
  words: Word[]
  icon: keyof typeof dynamicIconImports
  color: string
  isFavorite: boolean
}
