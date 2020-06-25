import { IsNotEmpty } from 'class-validator'

/*
 * User login DTO.
 */
export class UserLoginDto {
  /**
   * Name or Email.
   */
  @IsNotEmpty()
  nameOrEmail: string

  /**
   * Password.
   */
  @IsNotEmpty()
  password: string
}
