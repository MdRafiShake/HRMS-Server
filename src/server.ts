import express from 'express'
import type { Application, Request, Response, NextFunction } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { toNodeHandler, fromNodeHeaders } from 'better-auth/node'
import { connectMongoDB } from './lib/mongoConfig.js'
import { auth } from './lib/auth.js'

import roleRouter from './routes/role.routes.js'
import assertRouter from './routes/asset.routes.js'

import globalErrorHandler from './utility/globalErrorHandler.js'

// Load environment variables first
dotenv.config()

const env = process.env.NODE_ENV

// Log reload/start event for tsx watch
console.log('Server is starting / reloading...')
console.log(`Environment: ${env}`)
console.log(`Log Level: ${process.env.LOG_LEVEL}`)
if (env === 'development')
  console.log(`Allowed Origins: ${process.env.ALLOW_ORIGIN}`)

const app: Application = express()
const PORT = process.env.PORT || 5000

const allowedOrigins = process.env.ALLOW_ORIGIN
  ? process.env.ALLOW_ORIGIN.split(',')
  : []

// ==========================================
// 1. MIDDLEWARE
// ==========================================

// CORS Configuration
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true)

      if (
        allowedOrigins.indexOf(origin) !== -1 ||
        allowedOrigins.includes('*')
      ) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    },
    credentials: true
  })
)

// Better Auth Handler (MUST BE BEFORE express.json())
app.all('/api/auth/*', toNodeHandler(auth))

// Body Parser
app.use(express.json())

// Initialize Database Connection
connectMongoDB()

// ==========================================
// 2. ROUTES
// ==========================================

app.use('/api/roles', roleRouter)
app.use('/api/assets', assertRouter)

// Health Check Route
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ message: 'hems Server is running successfully!' })
})

// Protected Route Example (with error safety)
app.get('/api/me', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers)
    })

    if (!session) {
      res.status(401).json({ message: 'Unauthorized' })
      return
    }

    res.json(session)
  } catch (error) {
    next(error) // Passes unexpected issues to global error handler
  }
})

// ==========================================
// 3. ERROR HANDLING MIDDLEWARE
// ==========================================

// 404 Handler (Catch-all for unhandled routes)
app.use((req: Request, res: Response, next: NextFunction) => {
  const error: any = new Error(`Not Found - ${req.originalUrl}`)
  error.statusCode = 404
  next(error)
})

app.use(globalErrorHandler)

// ==========================================
// 4. START SERVER
// ==========================================
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
  console.log(`Health Check: http://localhost:${PORT}/api/health`)
})
