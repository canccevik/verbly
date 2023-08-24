import { Module } from '@nestjs/common'
import { EnvalidModule } from 'nestjs-envalid'
import { validators } from '@config/index'
import { DatabaseModule } from './database/database.module'
import { LoggerModule } from './logger/logger.module'

@Module({
  imports: [
    EnvalidModule.forRoot({
      isGlobal: true,
      useDotenv: true,
      validators
    }),
    DatabaseModule,
    LoggerModule
  ]
})
export class AppModule {}
