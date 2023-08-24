import { port, str } from 'envalid'
import { makeValidators, Static } from 'nestjs-envalid'

const config = {
  PORT: port({ default: 3001 }),
  GLOBAL_PREFIX: str({ default: 'api' }),
  DATABASE_URI: str()
}

export const validators = makeValidators(config)
export type Config = Static<typeof validators>
export const ENV = 'EnvalidModuleEnv'
