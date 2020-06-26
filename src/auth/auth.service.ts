import { Injectable } from '@nestjs/common'
import { UsersService } from 'src/users/users.service'
import * as bcrypt from 'bcrypt'
import { User } from 'src/users/user.entity'
import { JwtService } from '@nestjs/jwt'
import { omit } from 'src/helpers'

@Injectable()
export class AuthService {
  /**
   * Users service.
   */
  private readonly usersService: UsersService

  /**
   * JWT service.
   */
  private readonly jwtService: JwtService

  /**
   * AuthService constructor.
   *
   * @param usersService Users service(DI).
   * @param jwtService JWT service(DI).
   */
  constructor(usersService: UsersService, jwtService: JwtService) {
    this.usersService = usersService
    this.jwtService = jwtService
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

  /**
   * Login user and returns jwt token.
   *
   * @param user User.
   */
  async login(user: User): Promise<string> {
    const payload = {
      user: omit(user, ['password']),
    }

    return this.jwtService.sign(payload)
  }
}
