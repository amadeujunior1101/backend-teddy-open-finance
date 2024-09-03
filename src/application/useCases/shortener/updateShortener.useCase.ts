import {
  badRequestResponse,
  HttpResponse,
  responseSuccess,
  unauthorizedResponse,
} from '../../../shared/contracts'
import { ShortenerAbstract } from '../../../domain/abstract'
import redisClient from '../../../infra/config/redisClient.config'

export class UpdateShortenerUseCase {
  constructor(private readonly shortenerRepository: ShortenerAbstract) {}
  async execute(input: {
    originalUrl: string
    codeShortenerUrl: string
    userId: string
  }): Promise<HttpResponse<any>> {
    const get = await this.shortenerRepository.get({
      codeShortenerUrl: input.codeShortenerUrl,
    })

    if (!get) {
      return badRequestResponse({ message: 'invalid url code' })
    }

    if (get.user.id !== input.userId) {
      return unauthorizedResponse({ message: 'unauthorized user' })
    }

    try {
      const update = await this.shortenerRepository.update({
        id: get.id,
        originalUrl: input.originalUrl,
      })

      if (update.affected === 0) {
        return badRequestResponse({ message: 'Error updating url' })
      }

      await redisClient.set(
        input.codeShortenerUrl,
        JSON.stringify({
          id: get.id,
          codeShortenerUrl: get.codeShortenerUrl,
          originalUrl: get.originalUrl,
        })
      )

      return responseSuccess({
        data: 'Url updated successfully!',
      })
    } catch (error) {
      return badRequestResponse({
        message: 'Error updated shortener URL: ' + error,
      })
    }
  }
}
