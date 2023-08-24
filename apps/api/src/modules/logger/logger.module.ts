import { Module } from '@nestjs/common'
import { LoggerModule as PinoModule } from 'nestjs-pino'
import { Config, ENV } from '@config/index'

@Module({
  imports: [
    PinoModule.forRootAsync({
      useFactory: (config: Config) => {
        const targets = [
          {
            target: 'pino-pretty',
            level: 'info',
            options: {}
          }
        ]

        if (config.isProd) {
          targets.push({
            target: '@logtail/pino',
            level: 'info',
            options: {
              sourceToken: config.LOGTAIL_SOURCE_TOKEN
            }
          })
        }
        return {
          pinoHttp: {
            autoLogging: false,
            transport: { targets }
          }
        }
      },
      inject: [ENV]
    })
  ]
})
export class LoggerModule {}
