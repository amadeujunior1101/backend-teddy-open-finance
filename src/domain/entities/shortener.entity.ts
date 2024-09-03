import { UserEntity } from './user.entity'

export class ShortenerEntity {
  id: string
  originalUrl: string
  codeShortenerUrl: string
  user?: Partial<UserEntity> & Pick<UserEntity, 'id'>
  clicks?: number
  createdAt: Date
  updatedAt: Date
  deletedAt?: Date

  constructor(input: {
    id: string
    originalUrl: string
    codeShortenerUrl: string
    user?: Partial<UserEntity> & Pick<UserEntity, 'id'>
    clicks?: number
    createdAt: Date
    updatedAt: Date
    deletedAt?: Date
  }) {
    this.id = input.id
    this.originalUrl = input.originalUrl
    this.codeShortenerUrl = input.codeShortenerUrl
    this.user = input.user
    this.clicks = input.clicks
    this.createdAt = input.createdAt
    this.updatedAt = input.updatedAt
    this.deletedAt = input.deletedAt
  }
}
