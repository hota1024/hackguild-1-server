import { Controller, UseGuards, Post, Request } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { AuthService } from './auth.service'
import { RequestWithUser } from 'src/types'

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
}
