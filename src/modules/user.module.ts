import {
  CreateUserUseCase,
  ListUserUseCase,
  LoginUserUseCase,
} from '../application/useCases/user'
import { AppDataSource } from '../infra/config'
import { UserModel } from '../infra/orm/typeorm/models'
import { UserRepository } from '../infra/orm/typeorm/repositories'
import { UserController } from '../main/controllers'

const userRepository = new UserRepository(
  AppDataSource.getRepository(UserModel)
)

const createUserUseCase = new CreateUserUseCase(userRepository)
const loginUserUseCase = new LoginUserUseCase(userRepository)
const listUserUseCase = new ListUserUseCase(userRepository)

const userController = new UserController(
  createUserUseCase,
  loginUserUseCase,
  listUserUseCase
)

export { userController }
