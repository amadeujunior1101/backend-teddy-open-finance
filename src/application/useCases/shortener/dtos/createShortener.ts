import { IsString, IsNotEmpty } from 'class-validator'

export class CreateShortenerDTO {
  @IsString()
  @IsNotEmpty({ message: 'Url cannot be empty!' })
  originalUrl: string

  constructor(originalUrl: string) {
    this.originalUrl = originalUrl
  }
}
