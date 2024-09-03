import {
  badRequestResponse,
  HttpResponse,
  responseSuccess,
} from '../../../shared/contracts'
import { ShortenerAbstract } from '../../../domain/abstract'
import redisClient from '../../../infra/config/redisClient.config'

export class RedirectShortenerUseCase {
  constructor(private readonly shortenerRepository: ShortenerAbstract) {}
  async execute(input: {
    codeShortenerUrl: string
  }): Promise<HttpResponse<any>> {
    try {
      const storedData = await redisClient.get(input.codeShortenerUrl)

      const parsedData = storedData ? JSON.parse(storedData) : null

      if (!parsedData) {
        const shortener = await this.shortenerRepository.get({
          codeShortenerUrl: input.codeShortenerUrl,
        })

        if (!shortener) {
          return responseSuccess(
            `${process.env.BASE_URL}/api/shortener/invalid-link`
          )
        }

        await redisClient.set(
          shortener.codeShortenerUrl,
          JSON.stringify({
            id: shortener.id,
            codeShortenerUrl: shortener.codeShortenerUrl,
            originalUrl: shortener.originalUrl,
          })
        )
      }

      await this.shortenerRepository.saveClicks({ id: parsedData.id })

      return responseSuccess(parsedData.originalUrl)
    } catch (error) {
      return badRequestResponse({
        message: 'Erro ao processar URL curta: ' + input.codeShortenerUrl,
      })
    }
  }
}
