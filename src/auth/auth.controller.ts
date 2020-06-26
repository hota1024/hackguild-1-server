import { Controller, UseGuards, Post, Request } from '@nestjs/common'
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
  login(@Request() request) {
    return this.authService.login(request.user)
  }
}
