import { DeleteResult, UpdateResult } from 'typeorm'
import { ShortenerEntity } from '../entities/shortener.entity'
import { ShortenerModel } from '../../infra/orm/typeorm/models'

export abstract class ShortenerAbstract {
  abstract create(input: ShortenerEntity): Promise<ShortenerModel>
  abstract saveClicks(input: { id: string }): Promise<void>
  abstract get(
    input: Pick<ShortenerEntity, 'codeShortenerUrl'>
  ): Promise<ShortenerModel | null>
  abstract update(
    input: Pick<ShortenerEntity, 'id' | 'originalUrl'>
  ): Promise<Pick<UpdateResult, 'affected'>>
  abstract delete(input: Pick<ShortenerEntity, 'id'>): Promise<DeleteResult>
}
