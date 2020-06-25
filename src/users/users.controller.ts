import { Controller, Post, Body, Inject } from '@nestjs/common'
import { UserRegisterDto } from './dto/users.dto'
import { UsersService } from './users.service'
import { User } from './user.entity'

@Controller('users')
export class UsersController {
  /**
   * Users service.
   */
  private readonly usersService: UsersService

  /**
   * UsersController constructor.
   *
   * @param usersService Users service(DI).
   */
  constructor(usersService: UsersService) {
    this.usersService = usersService
  }

  /**
   * Register a user.
   *
   * @param data Data.
   */
  @Post()
  async register(@Body() data: UserRegisterDto): Promise<User> {
    return await this.usersService.register(data)
  }
}
