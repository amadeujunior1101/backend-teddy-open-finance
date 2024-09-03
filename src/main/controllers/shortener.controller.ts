import { Request, Response } from 'express'
import {
  CreateShortenerUseCase,
  UpdateShortenerUseCase,
  DeleteShortenerUseCase,
  RedirectShortenerUseCase,
} from '../../application/useCases/shortener'

class ShortenerController {
  constructor(
    private readonly createShortUrl: CreateShortenerUseCase,
    private readonly updateShortUrl: UpdateShortenerUseCase,
    private readonly deleteShortUrl: DeleteShortenerUseCase,
    private readonly redirectShortUrl: RedirectShortenerUseCase
  ) {}

  redirect = async (req: Request, res: Response) => {
    const { codeShortenerUrl } = req.params

    const result = await this.redirectShortUrl.execute({ codeShortenerUrl })

    return res.redirect(result.data)
  }

  create = async (req: Request, res: Response) => {
    const userId = (req as any).user?.id

    const shortenerURL = await this.createShortUrl.execute({
      ...req.body,
      userId,
    })

    res.status(shortenerURL.status).json(shortenerURL)
  }

  update = async (req: Request, res: Response) => {
    const { originalUrl, codeShortenerUrl } = req.body as {
      originalUrl: string
      codeShortenerUrl: string
    }

    const userId = (req as any).user?.id

    const result = await this.updateShortUrl.execute({
      originalUrl,
      codeShortenerUrl,
      userId: userId,
    })

    res.status(result.status).json(result)
  }

  delete = async (req: Request, res: Response) => {
    const { codeShortenerUrl } = req.body as { codeShortenerUrl: string }

    const userId = (req as any).user?.id

    const result = await this.deleteShortUrl.execute({
      codeShortenerUrl,
      userId: userId,
    })
    res.status(result.status).json(result)
  }
}

export { ShortenerController }
