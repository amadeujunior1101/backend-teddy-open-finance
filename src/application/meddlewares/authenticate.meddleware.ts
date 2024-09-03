import { InternalServerErrorException } from '../../shared'
import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

interface AuthenticatedRequest extends Request {
  user?: { id: string; email: string }
}

export const authenticateJWT = (isRequired: boolean) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization

    if (!authHeader) {
      if (isRequired) {
        return res.status(401).json({ message: 'Required token' })
      } else {
        return next()
      }
    }

    const token = authHeader.split(' ')[1]
    const secret = process.env.SECRET_JWT

    if (!secret) {
      throw new InternalServerErrorException(
        'Jwt token environment variable not set.'
      )
    }

    try {
      jwt.verify(token, secret, (err: any, user: any) => {
        if (err) {
          return res.status(403).json({
            message: 'Invalid or expired token',
            error: err.message,
          })
        }
        req.user = { id: user.id, email: user.email }
        next()
      })
    } catch (error) {
      console.error('JWT verification error:', error)
      return res.status(500).json({
        message: 'Error generating tokenn',
        error: error instanceof Error ? error.message : 'unknown error',
      })
    }
  }
}
