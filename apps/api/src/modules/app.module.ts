import { Module } from '@nestjs/common'
import { EnvalidModule } from 'nestjs-envalid'
import { Config, ENV, validators } from '@config/index'
import { DatabaseModule } from './database/database.module'
import { LoggerModule } from './logger/logger.module'
import { MailModule } from './mail/mail.module'
import { FeaturesModule } from '@features/features.module'
import { BullModule } from './bull/bull.module'
import { RequestContextModule } from '@medibloc/nestjs-request-context'
import { AuthenticatedContext } from '@common/context'
import { ThrottlerModule, ThrottlerGuard, seconds } from '@nestjs/throttler'
import { ThrottlerStorageRedisService } from 'nestjs-throttler-storage-redis'
import { APP_GUARD } from '@nestjs/core'
import Redis from 'ioredis'

@Module({
  imports: [
    EnvalidModule.forRoot({
      isGlobal: true,
      useDotenv: true,
      validators
    }),
    RequestContextModule.forRoot({
      isGlobal: true,
      contextClass: AuthenticatedContext
    }),
    ThrottlerModule.forRootAsync({
      useFactory: (config: Config) => ({
        throttlers: [{ ttl: seconds(config.THROTTLER_TTL), limit: config.THROTTLER_LIMIT }],
        storage: new ThrottlerStorageRedisService(
          new Redis({ host: config.REDIS_HOST, port: config.REDIS_PORT })
        )
      }),
      inject: [ENV]
    }),
    FeaturesModule,
    DatabaseModule,
    LoggerModule,
    MailModule,
    BullModule
  ],
  providers: [{ provide: APP_GUARD, useClass: ThrottlerGuard }]
})
export class AppModule {}
