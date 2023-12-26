import { Response, Request, NextFunction } from 'express'

const notFound = async (req: Request, res: Response, next: NextFunction) => {
  //   const error = new Error(`Not Found ${req.originalUrl}`)
  res.status(404).send('Page not found')
}

const errorHandler = async (err: Error, req: Request, res: Response) => {
  const statusCode = req.statusCode === 200 ? 500 : res.statusCode
  res.status(statusCode)
  res.json({ success: false, message: err.message })
}

export { notFound, errorHandler }
