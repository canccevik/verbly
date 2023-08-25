import { Module } from '@nestjs/common'
import { BullModule as BullModuleBase } from '@nestjs/bull'
import { BullConfigService } from './bull-config.service'

@Module({
  imports: [
    BullModuleBase.forRootAsync({
      useClass: BullConfigService
    })
  ]
})
export class BullModule {}
