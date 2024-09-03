import { IsString, IsEmail, IsNotEmpty } from 'class-validator'

export class CreateUserDTO {
  @IsString()
  @IsNotEmpty({ message: 'name cannot be empty!' })
  name: string

  @IsEmail({}, { message: 'Email must be valid!' })
  email: string

  @IsNotEmpty({ message: 'Password cannot be empty!' })
  password: string

  constructor(name: string, email: string, password: string) {
    this.name = name
    this.email = email
    this.password = password
  }
}
