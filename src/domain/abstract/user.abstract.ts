import { UserModel } from '../../infra/orm/typeorm/models'
import { UserEntity } from '../entities/user.entity'

export abstract class UserAbstract {
  abstract create(input: any): Promise<UserModel>
  abstract get(input: Pick<UserEntity, 'email'>): Promise<UserModel | null>
  abstract list(input: Pick<UserEntity, 'id'>): Promise<UserModel | null>
}
