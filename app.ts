import express, { Application } from 'express'
import config from './configures/envConfigure'
import connectDB from './configures/db'
import { errorHandler, notFound } from './middlewares/ErrorMiddleware'
import UserRouter from './routes/UserRoutes'
import verifyToken from './middlewares/authjwt'

const app: Application = express()
app.use(express.json())
connectDB()

app.get('/hearbeat', verifyToken, (_, res) => res.json('You are alive.'))

// User Route
app.use('/api/auth', UserRouter)

// Middleware
app.use(notFound)
app.use(errorHandler)

app.listen(config.port, () => console.log('Listening on port', config.port))
