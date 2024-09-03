import {
  CreateShortenerUseCase,
  DeleteShortenerUseCase,
  RedirectShortenerUseCase,
  UpdateShortenerUseCase,
} from '../application/useCases/shortener'
import { AppDataSource } from '../infra/config'
import { ShortenerModel } from '../infra/orm/typeorm/models'
import { ShortenerRepository } from '../infra/orm/typeorm/repositories/'
import { ShortenerController } from '../main/controllers/'

const shortenerRepository = new ShortenerRepository(
  AppDataSource.getRepository(ShortenerModel)
)
const createShortenerUseCase = new CreateShortenerUseCase(shortenerRepository)
const updateShortenerUseCase = new UpdateShortenerUseCase(shortenerRepository)
const deleteShortenerUseCase = new DeleteShortenerUseCase(shortenerRepository)
const redirectShortenerUseCase = new RedirectShortenerUseCase(
  shortenerRepository
)

const shortenerController = new ShortenerController(
  createShortenerUseCase,
  updateShortenerUseCase,
  deleteShortenerUseCase,
  redirectShortenerUseCase
)

export { shortenerController }
