import { ShortenerEntity } from './shortener.entity'

export class UserEntity {
  id: string
  name: string
  email: string
  password: string
  createdAt: Date
  shortener?: Array<ShortenerEntity>

  constructor(input: {
    id: string
    name: string
    email: string
    password: string
    createdAt: Date
    shortener?: Array<ShortenerEntity>
  }) {
    this.id = input.id
    this.name = input.name
    this.email = input.email
    this.password = input.password
    this.createdAt = input.createdAt
    this.shortener = input.shortener
  }
}
