import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'

/*
 * User entity class.
 */
@Entity()
export class User {
  /**
   * ID.
   */
  @PrimaryGeneratedColumn('uuid')
  id: string

  /**
   * Name.
   */
  @Column()
  name: string

  /**
   * Display name.
   */
  @Column()
  displayName: string

  /**
   * Email.
   */
  @Column()
  email: string

  /**
   * Password hash.
   */
  @Column()
  password: string

  /**
   * Bio.
   */
  @Column('text')
  bio: string

  /**
   * Created at.
   */
  @CreateDateColumn()
  createdAt: Date

  /**
   * Updated at.
   */
  @UpdateDateColumn()
  updatedAt: Date
}
