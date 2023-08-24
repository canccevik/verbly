import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { AppModule } from '@modules/app.module'
import { ENV, Config } from '@config/index'

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)

  const config = app.get<Config>(ENV)

  await app.listen(config.PORT)
}
bootstrap()
