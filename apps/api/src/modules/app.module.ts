import { Module } from '@nestjs/common'
import { EnvalidModule } from 'nestjs-envalid'
import { validators } from '@config/index'
import { DatabaseModule } from './database/database.module'

@Module({
  imports: [
    EnvalidModule.forRoot({
      isGlobal: true,
      useDotenv: true,
      validators
    }),
    DatabaseModule
  ]
})
export class AppModule {}
