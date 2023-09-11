export type SiteConfig = {
  name: string
}

export type ApiResponse<T> = {
  data: T
  message: string
  statusCode: number
}

enum Gender {
  NotKnown,
  Male,
  Female,
  NonBinary
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
