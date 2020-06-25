import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './user.entity'
import { Repository } from 'typeorm'
import { UserRegisterDto } from './dto/users.dto'
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
  private readonly usersRepository: Repository<User>

  constructor(@InjectRepository(User) usersRepository: Repository<User>) {
    this.usersRepository = usersRepository
  }

  /**
   * Register a user.
   *
   * @param data User register DTO.
   */
  async register(data: UserRegisterDto): Promise<User> {
    data.displayName = data.displayName ?? data.name
    const password = await bcrypt.hash(data.password, 16)

    const user = this.usersRepository.create({
      ...data,
      password,
      bio: '',
    })
    await this.usersRepository.save(user)

    return user
  }

  /**
   * Find a user by name or email.
   *
   * @param nameOrEmail Name or Email.
   */
  findOneByNameOrEmail(nameOrEmail: string): Promise<User> {
    return this.usersRepository.findOne({
      where: [
        {
          name: nameOrEmail,
        },
        {
          email: nameOrEmail,
        },
      ],
    })
  }
}
