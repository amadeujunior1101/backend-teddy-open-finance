import { IsEmail, IsNotEmpty } from 'class-validator'

export class LoginUserDTO {
  @IsEmail({}, { message: 'E-mail must be valid!' })
  email: string

  @IsNotEmpty({ message: 'Password cannot be empty!' })
  password: string

  constructor(email: string, password: string) {
    this.email = email
    this.password = password
  }
}
