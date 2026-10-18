import type { NextFunction, Request, Response } from 'express'
import { auth } from '../lib/auth'
import { fromNodeHeaders } from 'better-auth/node'
import { logger } from './logger'

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || 500
  const message = err.message || 'Internal Server Error'

  const NODE_ENV = process.env.NODE_ENV || 'development'

  logger.error({
    statusCode,
    message,
    stack: err.stack
  })

  res.status(statusCode).json({
    success: false,
    status: statusCode,
    message: message
  })
}

export default globalErrorHandler
