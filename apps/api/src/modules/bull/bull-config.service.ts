import { Config, ENV } from '@config/index'
import { BullRootModuleOptions, SharedBullConfigurationFactory } from '@nestjs/bull'
import { Inject, Injectable } from '@nestjs/common'

@Injectable()
export class BullConfigService implements SharedBullConfigurationFactory {
  constructor(@Inject(ENV) private readonly config: Config) {}

  public createSharedConfiguration(): BullRootModuleOptions {
    return {
      redis: {
        host: this.config.REDIS_HOST,
        port: this.config.REDIS_PORT
      }
    }
  }
}
