import { Module } from '@nestjs/common'
import { EnvalidModule } from 'nestjs-envalid'
import { validators } from '@config/index'
import { DatabaseModule } from './database/database.module'
import { LoggerModule } from './logger/logger.module'
import { MailModule } from './mail/mail.module'
import { FeatureModule } from '@features/feature.module'
import { BullModule } from './bull/bull.module'

@Module({
  imports: [
    EnvalidModule.forRoot({
      isGlobal: true,
      useDotenv: true,
      validators
    }),
    FeatureModule,
    DatabaseModule,
    LoggerModule,
    MailModule,
    BullModule
  ]
})
export class AppModule {}
