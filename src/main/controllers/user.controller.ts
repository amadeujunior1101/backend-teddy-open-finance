import { Request, Response } from 'express'
import {
  CreateUserUseCase,
  LoginUserUseCase,
  ListUserUseCase,
} from '../../application/useCases/user'

class UserController {
  constructor(
    private readonly createUser: CreateUserUseCase,
    private readonly loginUser: LoginUserUseCase,
    private readonly listUser: ListUserUseCase
  ) {}

  create = async (req: Request, res: Response) => {
    const result = await this.createUser.execute(req.body)

    res.status(result.status).json(result)
  }

  login = async (req: Request, res: Response) => {
    const result = await this.loginUser.execute(req.body)

    res.status(result.status).json(result)
  }

  list = async (req: Request, res: Response) => {
    const userId = (req as any).user?.id

    const result = await this.listUser.execute({ id: userId })

    res.status(result.status).json(result)
  }
}

export { UserController }
