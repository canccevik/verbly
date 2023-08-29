import { email, port, str, url } from 'envalid'
import { makeValidators, Static } from 'nestjs-envalid'

const config = {
  PORT: port({ default: 3001 }),
  GLOBAL_PREFIX: str({ default: 'api' }),
  DATABASE_URI: str(),
  LOGTAIL_SOURCE_TOKEN: str(),
  GOOGLE_EMAIL: email(),
  GOOGLE_PASSWORD: str(),
  DEFAULT_PROFILE_PHOTO: url(),
  REDIS_HOST: str(),
  REDIS_PORT: port(),
  SESSION_SECRET: str(),
  GOOGLE_CLIENT_ID: str(),
  GOOGLE_CLIENT_SECRET: str(),
  JWT_SECRET: str(),
  JWT_EXPIRES_IN: str(),
  CLOUDINARY_CLOUD_NAME: str(),
  CLOUDINARY_API_KEY: str(),
  CLOUDINARY_API_SECRET: str()
}

export const validators = makeValidators(config)
export type Config = Static<typeof validators>
export const ENV = 'EnvalidModuleEnv'
