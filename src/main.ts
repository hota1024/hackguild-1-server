import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { getConfig } from './config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.useGlobalPipes(new ValidationPipe())
  app.enableCors({
    origin: getConfig('APP_MODE') === 'development' ? '*' : '',
  })

  await app.listen(getConfig('APP_PORT'))
}
bootstrap()
