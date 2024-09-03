import { v4 as uuidv4 } from 'uuid'
import { ShortenerAbstract } from '../../../domain/abstract'
import redisClient from '../../../infra/config/redisClient.config'
import { validateURL, generateUniqueCode } from '../../../helpers'
import { ShortenerEntity } from '../../../domain/entities'
import {
  badRequestResponse,
  BadRequestResponse,
  HttpResponse,
  responseSuccess,
} from '../../../shared'

export class CreateShortenerUseCase {
  constructor(private readonly shortenerRepository: ShortenerAbstract) {}

  async execute(input: {
    url: string
    userId?: string
  }): Promise<HttpResponse<any>> {
    try {
      const urlIsValid = validateURL(input.url)

      if (!urlIsValid) {
        return new BadRequestResponse('invalid URL')
      }

      const shortURL = generateUniqueCode()

      const shortener = new ShortenerEntity({
        id: uuidv4(),
        originalUrl: input.url,
        codeShortenerUrl: shortURL,
        createdAt: new Date(),
        updatedAt: new Date(),
      })

      if (input.userId) {
        shortener.user = { id: input.userId }
      }

      const create = await this.shortenerRepository.create(shortener)

      await redisClient.set(
        create.codeShortenerUrl,
        JSON.stringify({
          id: create.id,
          codeShortenerUrl: create.codeShortenerUrl,
          originalUrl: create.originalUrl,
        })
      )

      return responseSuccess({
        shortURL: `${process.env.BASE_URL}/api/shortener/${create.codeShortenerUrl}`,
      })
    } catch (error) {
      if (error instanceof Error) {
        switch (error.message) {
          case 'insert or update on table "shortener" violates foreign key constraint "fk_model_shortener_user"':
            return badRequestResponse({
              message: 'User id not found!',
            })
          default:
            break
        }
      }
      return badRequestResponse({
        message: 'Error created shortener URL: ' + input.url,
      })
    }
  }
}
