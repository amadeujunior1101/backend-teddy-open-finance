import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  Unique,
} from 'typeorm'
import { UserEntity } from '../../../../domain/entities/user.entity'
import { ShortenerModel } from './shortener.model'

@Entity({
  name: 'user',
})
@Unique('unique_model_user_id', ['id'])
@Unique('unique_model_user_email', ['email'])
export class UserModel {
  @PrimaryColumn({
    name: 'id',
    primaryKeyConstraintName: 'user_pk_id',
    type: 'uuid',
  })
  id!: string

  @Column({ name: 'name', type: 'varchar', length: 200 })
  name!: string

  @Column({ name: 'email', type: 'varchar', length: 100 })
  email!: string

  @Column({ name: 'password', type: 'varchar', length: 100 })
  password!: string

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date

  @OneToMany(() => ShortenerModel, (shortener) => shortener.user)
  shortener!: ShortenerModel[]
}
