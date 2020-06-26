import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { LocalStrategy } from './local.strategy'
import { UsersModule } from 'src/users/users.module'
import { JwtStrategy } from './jwt.strategy'
import { getConfig } from 'src/config'

@Module({
  imports: [
    PassportModule,
    UsersModule,
    JwtModule.register({
      secret: getConfig('JWT_SECRET'),
      signOptions: {
        expiresIn: getConfig('JWT_EXPIRES_IN'),
      },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
