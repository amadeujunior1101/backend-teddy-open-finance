import { DeleteResult, Repository, UpdateResult } from 'typeorm'
import { ShortenerAbstract } from '../../../../domain/abstract'
import { ShortenerModel } from '../models'
import { ShortenerEntity } from '../../../../domain/entities/shortener.entity'

export class ShortenerRepository extends ShortenerAbstract {
  constructor(private readonly repository: Repository<ShortenerModel>) {
    super()
  }

  async create(input: ShortenerEntity): Promise<ShortenerModel> {
    return this.repository.save(input)
  }

  async saveClicks(input: { id: string }): Promise<void> {
    const shortener = await this.repository.findOneBy({ id: input.id })

    if (!shortener) {
      throw new Error('Record not found')
    }

    shortener.clicks += 1

    await this.repository.save(shortener)
  }

  async get(
    input: Pick<ShortenerEntity, 'codeShortenerUrl'>
  ): Promise<ShortenerModel | null> {
    return this.repository.findOne({
      where: { codeShortenerUrl: input.codeShortenerUrl },
      withDeleted: false,
      relations: ['user'],
    })
  }

  async update(
    input: Pick<ShortenerEntity, 'id' | 'originalUrl' | 'codeShortenerUrl'>
  ): Promise<UpdateResult> {
    return this.repository.update(input.id, {
      originalUrl: input.originalUrl,
      codeShortenerUrl: input.codeShortenerUrl,
    })
  }

  async delete(input: Pick<ShortenerEntity, 'id'>): Promise<DeleteResult> {
    return this.repository.softDelete(input.id)
  }
}
