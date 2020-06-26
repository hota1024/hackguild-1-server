import { Controller, UseGuards, Post, Request, Get } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { AuthService } from './auth.service'
import { RequestWithUser } from 'src/types'
import { User } from 'src/users/user.entity'

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
   *
   * @param request Request.
   */
  @UseGuards(AuthGuard('local'))
  @Post('/login')
  async login(
    @Request() request: RequestWithUser
  ): Promise<{
    accessToken: string
  }> {
    const accessToken = await this.authService.login(request.user)

    return {
      accessToken,
    }
  }

  /**
   * Me.
   *
   * @param request Request.
   */
  @UseGuards(AuthGuard('jwt'))
  @Get('/me')
  me(@Request() request: RequestWithUser): User {
    return request.user
  }
}
