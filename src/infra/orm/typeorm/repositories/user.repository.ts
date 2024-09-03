import { Repository } from 'typeorm'
import { UserAbstract } from '../../../../domain/abstract/user.abstract'
import { UserEntity } from '../../../../domain/entities/user.entity'
import { UserModel } from '../models'

export class UserRepository extends UserAbstract {
  constructor(private readonly repository: Repository<UserModel>) {
    super()
  }

  async create(data: Omit<UserEntity, 'id'>): Promise<UserModel> {
    return this.repository.save(data)
  }

  async get(input: Pick<UserEntity, 'email'>): Promise<UserModel | null> {
    return this.repository.findOne({ where: { email: input.email } })
  }

  async list(input: Pick<UserEntity, 'id'>): Promise<UserModel | null> {
    return this.repository.findOne({
      where: { id: input.id },
      select: ['id', 'name', 'email'],
      relations: ['shortener'],
    })
  }
}
