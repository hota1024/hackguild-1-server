import { Request } from 'express'
import { User } from 'src/users/user.entity'

/*
 * RequestWithUser interface.
 */
export interface RequestWithUser extends Request {
  /**
   * User.
   */
  user: User
}
