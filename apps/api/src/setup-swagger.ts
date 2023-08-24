import { NestExpressApplication } from '@nestjs/platform-express'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { Config, ENV } from '@config/index'
import { version } from 'package.json'

export function setupSwagger(app: NestExpressApplication): void {
  const config = app.get<Config>(ENV)

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Verbly')
    .setDescription('Official documentation of Verbly API.')
    .setVersion(version)
    .build()

  const document = SwaggerModule.createDocument(app, swaggerConfig)

  SwaggerModule.setup('/', app, document)
  SwaggerModule.setup(config.GLOBAL_PREFIX, app, document)
}
