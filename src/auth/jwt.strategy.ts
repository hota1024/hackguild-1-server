import { Injectable } from '@nestjs/common'
import { Strategy, ExtractJwt } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { getConfig } from 'src/config'
import { User } from 'src/users/user.entity'

/*
 * JWT STrategy class.
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  /**
   * JwtStrategy constructor.
   */
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: getConfig('JWT_SECRET'),
    })
  }

  /**
   * Validate.
   */
  validate(payload: { user: User }): User {
    return payload.user
  }
}
