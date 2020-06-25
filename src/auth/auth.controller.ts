import { Controller, UseGuards, Post } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {
  /**
   * Auth service.
   */
  private readonly authService: AuthService

  /**
   * AuthController constructor.
   *
   * @param authService Auth service(DI).
   */
  constructor(authService: AuthService) {
    this.authService = authService
  }

  /**
   * Login.
   */
  @UseGuards(AuthGuard('local'))
  @Post('/login')
  login(): boolean {
    return true
  }
}
