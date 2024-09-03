import { ShortenerAbstract } from '../../../domain/abstract'
import redisClient from '../../../infra/config/redisClient.config'
import {
  badRequestResponse,
  HttpResponse,
  responseSuccess,
  unauthorizedResponse,
} from '../../../shared'

export class DeleteShortenerUseCase {
  constructor(private readonly shortenerRepository: ShortenerAbstract) {}
  async execute(input: {
    codeShortenerUrl: string
    userId: string
  }): Promise<HttpResponse<any>> {
    try {
      const get = await this.shortenerRepository.get({
        codeShortenerUrl: input.codeShortenerUrl,
      })

      if (!get) {
        return badRequestResponse({ message: 'invalid url code' })
      }

      if (get.user.id !== input.userId) {
        return unauthorizedResponse({ message: 'unauthorized user' })
      }

      await redisClient.del(get.codeShortenerUrl)

      const deleteShortUrl = await this.shortenerRepository.delete({
        id: get.id,
      })

      return responseSuccess(deleteShortUrl)
    } catch (error) {
      return badRequestResponse({
        message: 'Error delete shortener URL: ' + error,
      })
    }
  }
}
