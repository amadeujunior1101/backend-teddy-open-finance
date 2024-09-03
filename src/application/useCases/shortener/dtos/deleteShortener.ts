import { IsString, IsNotEmpty } from 'class-validator'

export class DeleteShortenerDTO {
  @IsString()
  @IsNotEmpty({ message: 'url code cannot be empty!' })
  codeShortenerUrl: string

  constructor(codeShortenerUrl: string) {
    this.codeShortenerUrl = codeShortenerUrl
  }
}
