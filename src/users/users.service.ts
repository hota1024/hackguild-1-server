import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './user.entity'
import { Repository } from 'typeorm'
import { UserRegisterDto } from './users.dto'

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

    return this.usersRepository.create(data)
  }
}
