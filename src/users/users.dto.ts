import { IsNotEmpty, IsString, IsEmail, IsOptional } from 'class-validator'
import { IsUnique } from 'src/validators'
import { User } from './user.entity'

/*
 * User register DTO.
 */
export class UserRegisterDto {
  /**
   * Name.
   */
  @IsNotEmpty()
  @IsString()
  @IsUnique(User)
  name: string

  /**
   * Display name(default is name value.).
   */
  @IsString()
  @IsOptional()
  displayName?: string

  /**
   * Email.
   */
  @IsNotEmpty()
  @IsEmail()
  @IsUnique(User)
  email: string

  /**
   * Password.
   */
  @IsNotEmpty()
  @IsString()
  password: string
}
