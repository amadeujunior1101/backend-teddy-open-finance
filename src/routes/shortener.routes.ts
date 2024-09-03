import express, { Request, Response } from 'express'
import {
  CreateShortenerDTO,
  UpdateShortenerDTO,
  DeleteShortenerDTO,
} from '../application/useCases/shortener/dtos'
import { validate } from 'class-validator'
import { shortenerController } from '../modules'
import { authenticateJWT } from '../application/meddlewares'

const shortenerRoutes = express.Router()

shortenerRoutes.post(
  '/shortener',
  authenticateJWT(false),
  async (req: Request, res: Response) => {
    const { url } = req.body
    const shortener = new CreateShortenerDTO(url)

    const errors = await validate(shortener)

    if (errors.length > 0) {
      return res.status(400).json(errors)
    }

    return shortenerController.create(req, res)
  }
)

shortenerRoutes.put(
  '/shortener',
  authenticateJWT(true),
  async (req: Request, res: Response) => {
    const { originalUrl, codeShortenerUrl } = req.body

    const shortener = new UpdateShortenerDTO(originalUrl, codeShortenerUrl)

    const errors = await validate(shortener)

    if (errors.length > 0) {
      return res.status(400).json(errors)
    }

    return shortenerController.update(req, res)
  }
)

shortenerRoutes.delete(
  '/shortener',
  authenticateJWT(true),
  async (req: Request, res: Response) => {
    const { codeShortenerUrl } = req.body

    const shortener = new DeleteShortenerDTO(codeShortenerUrl)

    const errors = await validate(shortener)

    if (errors.length > 0) {
      return res.status(400).json(errors)
    }

    return shortenerController.delete(req, res)
  }
)

shortenerRoutes.get('/shortener/invalid-link', (req, res) => {
  res.status(404).render('invalid-link')
})

shortenerRoutes.get(
  '/shortener/:codeShortenerUrl',
  async (req: Request, res: Response) => {
    return shortenerController.redirect(req, res)
  }
)

export { shortenerRoutes }
