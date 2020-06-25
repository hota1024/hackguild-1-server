import { Strategy } from 'passport-local'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { AuthService } from './auth.service'

/*
 * LocalStrategy class.
 */
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  /**
   * Auth service.
   */
  private readonly authService: AuthService

  /**
   * LocalStrategy constructor.
   *
   * @param authService Auth service(DI).
   */
  constructor(authService: AuthService) {
    super()
    this.authService = authService
  }

  /**
   * Validate.
   *
   * @param username Username or Email.
   * @param password Password.
   */
  async validate(username: string, password: string): Promise<boolean> {
    const valid = await this.authService.validateUser(username, password)

    if (valid) {
      return true
    }

    throw new UnauthorizedException()
  }
}
