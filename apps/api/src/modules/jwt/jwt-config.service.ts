import { Inject, Injectable } from '@nestjs/common'
import { JwtOptionsFactory, JwtModuleOptions } from '@nestjs/jwt'
import { Config, ENV } from '@config/index'

@Injectable()
export class JwtConfigService implements JwtOptionsFactory {
  constructor(@Inject(ENV) private readonly config: Config) {}

  public createJwtOptions(): JwtModuleOptions {
    return {
      secret: this.config.JWT_SECRET,
      signOptions: {
        expiresIn: this.config.JWT_EXPIRES_IN
      }
    }
  }
}
