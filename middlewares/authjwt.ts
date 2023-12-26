import { NextFunction, Response } from 'express'
import jwt from 'jsonwebtoken'

const verifyToken = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  req: any & { userId: number },
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers.authorization
  if (!token) {
    return res.status(403).send({ message: 'No token provided!' })
  }
  jwt.verify(
    token,
    process.env.JWT_SECRET_KEY as string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (err: any, decode: any) => {
      if (err) {
        return res.status(401).send({ message: 'Unauthorized!' })
      }
      req.userId = decode?.id as number
      next()
    },
  )
}

export default verifyToken
