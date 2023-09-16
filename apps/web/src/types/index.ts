export type SiteConfig = {
  name: string
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
  registeredAt: string
}

export type NavbarItem = {
  title: string
  path: string
}
