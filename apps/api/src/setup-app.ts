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
import session from 'express-session'
import MongoStore from 'connect-mongo'
import passport from 'passport'

export function setupApp(app: NestExpressApplication): void {
  useContainer(app.select(AppModule), { fallbackOnErrors: true })

  const config = app.get<Config>(ENV)

  app.setGlobalPrefix(config.GLOBAL_PREFIX)

  app.enableCors({
    origin: config.WEB_APP_ORIGIN,
    credentials: true
  })

  app.use(
    session({
      name: 'sessionId',
      secret: config.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days in ms,
        httpOnly: true,
        secure: false
      },
      store: MongoStore.create({
        mongoUrl: config.DATABASE_URI,
        stringify: false
      })
    })
  )

  app.use(passport.initialize())
  app.use(passport.session())

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
