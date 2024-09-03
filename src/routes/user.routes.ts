import { validate } from 'class-validator'
import express, { Request, Response } from 'express'
import { userController } from '../modules/user.module'
import { authenticateJWT } from '../application/meddlewares'
import { CreateUserDTO, LoginUserDTO } from '../application/useCases/user/dtos'

const userRoutes = express.Router()

userRoutes.post('/user', async (req: Request, res: Response) => {
  const { name, email, password } = req.body as {
    name: string
    email: string
    password: string
  }

  const user = new CreateUserDTO(name, email, password)

  const errors = await validate(user)

  if (errors.length > 0) {
    return res.status(400).json(errors)
  }

  return userController.create(req, res)
})

userRoutes.post('/user/login', async (req: Request, res: Response) => {
  const { email, password } = req.body as {
    email: string
    password: string
  }

  const user = new LoginUserDTO(email, password)

  const errors = await validate(user)

  if (errors.length > 0) {
    return res.status(400).json(errors)
  }

  return userController.login(req, res)
})

userRoutes.get(
  '/user/list',
  authenticateJWT(true),
  async (req: Request, res: Response) => {
    return userController.list(req, res)
  }
)

export { userRoutes }
