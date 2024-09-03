import {
  badRequestResponse,
  HttpResponse,
  responseSuccess,
} from '../../../shared/contracts'
import { UserAbstract } from '../../../domain/abstract'

export class ListUserUseCase {
  constructor(private readonly userRepository: UserAbstract) {}
  async execute(input: { id: string }): Promise<HttpResponse<any>> {
    try {
      const list = await this.userRepository.list({ id: input.id })

      return responseSuccess(list)
    } catch (error) {
      console.error(error)
      return badRequestResponse({ message: 'Error list user URL: ' + error })
    }
  }
}
