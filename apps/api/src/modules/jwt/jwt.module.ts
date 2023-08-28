import { Module } from '@nestjs/common'
import { JwtModule as JwtModuleHost } from '@nestjs/jwt'
import { JwtConfigService } from './jwt-config.service'

@Module({
  imports: [
    JwtModuleHost.registerAsync({
      useClass: JwtConfigService,
      global: true
    })
  ]
})
export class JwtModule {}
