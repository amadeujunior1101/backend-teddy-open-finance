import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import {
  badRequestResponse,
  forbiddenResponse,
  HttpResponse,
  InternalServerErrorException,
  responseSuccess,
} from '../../../shared/contracts'
import { UserAbstract } from '../../../domain/abstract/user.abstract'

export class LoginUserUseCase {
  constructor(private readonly userRepository: UserAbstract) {}

  async execute(input: {
    email: string
    password: string
  }): Promise<HttpResponse<any>> {
    try {
      const user = await this.userRepository.get({ email: input.email })
      if (!user) {
        return forbiddenResponse({ message: 'Invalid credentials' })
      }

      const isPasswordValid = await bcrypt.compare(
        input.password,
        user.password
      )
      if (!isPasswordValid) {
        return forbiddenResponse({ message: 'Invalid credentials' })
      }

      const secret = process.env.SECRET_JWT
      if (!secret) {
        throw new InternalServerErrorException(
          'Jwt token environment variable not set.'
        )
      }

      const token = jwt.sign({ id: user.id, email: user.email }, secret, {
        expiresIn: process.env.TOKEN_EXPIRES_IN,
      })

      return responseSuccess(token)
    } catch (error) {
      return badRequestResponse({
        message: 'Error logging in: ' + error,
      })
    }
  }
}
