import { Module } from '@nestjs/common'
import { EnvalidModule } from 'nestjs-envalid'
import { validators } from '@config/index'
import { DatabaseModule } from './database/database.module'
import { LoggerModule } from './logger/logger.module'
import { MailModule } from './mail/mail.module'
import { FeatureModule } from '@features/feature.module'
import { BullModule } from './bull/bull.module'
import { JwtModule } from './jwt/jwt.module'
import { RequestContextModule } from '@medibloc/nestjs-request-context'
import { AuthenticatedContext } from '@common/context'

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
    FeatureModule,
    DatabaseModule,
    LoggerModule,
    MailModule,
    BullModule,
    JwtModule
  ]
})
export class AppModule {}
