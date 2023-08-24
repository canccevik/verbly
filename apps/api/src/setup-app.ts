import helmet from 'helmet'
import compression from 'compression'
import mongoSanitize from 'express-mongo-sanitize'
import { NestExpressApplication } from '@nestjs/platform-express'
import { Config, ENV } from '@config/index'
import { HttpExceptionFilter } from '@core/filters'
import { ValidationPipe } from '@nestjs/common'

export function setupApp(app: NestExpressApplication): void {
  const config = app.get<Config>(ENV)

  app.setGlobalPrefix(config.GLOBAL_PREFIX)

  app.use(helmet())
  app.use(compression())
  app.use(mongoSanitize())

  app.useGlobalPipes(new ValidationPipe())
  app.useGlobalFilters(new HttpExceptionFilter())
}
