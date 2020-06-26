import * as path from 'path'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UsersModule } from './users/users.module'
import { AuthModule } from './auth/auth.module'
import { getConfig } from './config'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: getConfig('DB_HOST'),
      port: getConfig('DB_PORT'),
      username: getConfig('DB_USER'),
      password: getConfig('DB_PASSWORD'),
      database: getConfig('DB_NAME'),
      entities: [path.join(__dirname, '**/**.entity{.ts,.js}')],
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
