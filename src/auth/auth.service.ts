import { Injectable } from '@nestjs/common'
import { UsersService } from 'src/users/users.service'
import * as bcrypt from 'bcrypt'
import { User } from 'src/users/user.entity'

@Injectable()
export class AuthService {
  /**
   * Users service.
   */
  private readonly usersService: UsersService

  /**
   * AuthService constructor.
   *
   * @param usersService Users service(DI).
   */
  constructor(usersService: UsersService) {
    this.usersService = usersService
  }

  /**
   * Validate a user credentials. If credentials is valid returns the user.
   *
   * @param nameOrEmail Name or Email.
   * @param password Password.
   */
  async validateUser(
    nameOrEmail: string,
    password: string
  ): Promise<User | false> {
    const user = await this.usersService.findOneByNameOrEmail(nameOrEmail)

    if (!user) {
      return false
    }

    const valid = await bcrypt.compare(password, user.password)

    return valid && user
  }
}
