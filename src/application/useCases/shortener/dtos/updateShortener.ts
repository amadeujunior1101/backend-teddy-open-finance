import { IsString, IsNotEmpty } from 'class-validator'

export class UpdateShortenerDTO {
  @IsString()
  @IsNotEmpty({ message: 'Url cannot be empty!' })
  originalUrl: string

  @IsString()
  @IsNotEmpty({ message: 'url code cannot be empty!' })
  codeShortenerUrl: string

  constructor(originalUrl: string, codeShortenerUrl: string) {
    this.originalUrl = originalUrl
    this.codeShortenerUrl = codeShortenerUrl
  }
}
