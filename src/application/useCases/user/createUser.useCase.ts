import bcrypt from 'bcryptjs'
import { v4 as uuidv4 } from 'uuid'
import {
  badRequestResponse,
  HttpResponse,
  responseSuccess,
} from '../../../shared/contracts'
import { UserEntity } from '../../../domain/entities/user.entity'
import { UserAbstract } from '../../../domain/abstract/user.abstract'

export class CreateUserUseCase {
  constructor(private readonly userRepository: UserAbstract) {}

  async execute(input: {
    name: string
    email: string
    password: string
  }): Promise<HttpResponse<any>> {
    try {
      const hashedPassword = await bcrypt.hash(input.password, 10)

      const data = {
        id: uuidv4(),
        name: input.name,
        email: input.email,
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      const user = new UserEntity(data)

      await this.userRepository.create(user)

      return responseSuccess('User added successfully!')
    } catch (error: any) {
      if (
        error.code === '23505' &&
        error.constraint === 'unique_model_user_email'
      ) {
        return badRequestResponse({
          message: 'Email is already in use.',
        })
      } else {
        return badRequestResponse({
          message: 'Error creating user' + error.message,
        })
      }
    }
  }
}
