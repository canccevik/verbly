import helmet from 'helmet'
import compression from 'compression'
import mongoSanitize from 'express-mongo-sanitize'
import { NestExpressApplication } from '@nestjs/platform-express'
import { Config, ENV } from '@config/index'
import { HttpExceptionFilter } from '@core/filters'
import { ValidationPipe } from '@nestjs/common'
import { LoggingInterceptor, TransformInterceptor } from '@core/interceptors'
import { Reflector } from '@nestjs/core'
import { Logger } from 'nestjs-pino'
import { useContainer } from 'class-validator'
import { AppModule } from '@modules/app.module'

export function setupApp(app: NestExpressApplication): void {
  useContainer(app.select(AppModule), { fallbackOnErrors: true })

  const config = app.get<Config>(ENV)

  app.setGlobalPrefix(config.GLOBAL_PREFIX)

  app.use(helmet())
  app.use(compression())
  app.use(mongoSanitize())

  app.useGlobalPipes(new ValidationPipe())
  app.useGlobalFilters(new HttpExceptionFilter())
  app.useGlobalInterceptors(new TransformInterceptor(new Reflector()))

  if (!config.isTest) {
    const logger = app.get<Logger>(Logger)
    app.useGlobalInterceptors(new LoggingInterceptor(logger))
  }
}
