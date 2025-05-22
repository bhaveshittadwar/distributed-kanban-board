import { createServer } from 'http'
import { Server } from 'socket.io'
import cors from 'cors'

import express, { Request, Response, NextFunction } from 'express'
import session from 'express-session'
import passport from './auth/passport' // local
import './auth/google' // google
import User from './models/User'
import { isAuthenticated } from './middleware/auth'

// routers
import columnsRouter from './routes/columns'
import cardsRouter from './routes/cards'
import boardRouter from './routes/board'

import mongoose from 'mongoose'

const app = express()
app.use(session({
  secret: 'secret_for_session_123123123',
  resave: false,
  saveUninitialized: false
}))

app.use(cors({
  origin: process.env.CLIENT_ORIGIN,
  credentials: true
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(express.json())

mongoose.connect(process.env.MONGO_URL!)

app.get('/', (_req: Request, res: Response) => {
  res.send('OK')
})

// Signup
app.post('/signup',
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const user = await User.create(req.body)
      req.login(user, err => {
        if (err) return next(err)
        res.json({ email: user.email })
      })
    } catch (err) {
      next(err)
    }
  }
)

// Login
app.post('/login',
  passport.authenticate('local'),
  (req: Request, res: Response, next: NextFunction) => {
    res.json({ email: (req.user as any).email })
  }
)


app.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['email'] })
)

// Google OAuth callback
app.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (_req: Request, res: Response) => {
    res.redirect('http://localhost:3000')
  }
)

app.post('/logout', (req: Request, res: Response) => {
  req.logout(err => {
    if (err) return res.status(500).json({ message: 'Logout failed' })
    res.clearCookie('connect.sid')
    res.status(200).json({ message: 'Logged out' })
  })
})

app.get('/me', (req: Request, res: Response) => {
  if (!req.user) {
    res.status(401).json({ message: 'Not logged in' })
    return
  }
  res.json({ email: (req.user as any).email })
})

app.post('/test-socket', (req: Request, res: Response) => {
  const io = req.app.get('io')
  io.emit('test-event', {message: 'Socket.io works!'})
  res.send('Emitted test-event')
})

app.use('/columns', isAuthenticated, columnsRouter)
app.use('/cards', isAuthenticated, cardsRouter)
app.use('/board', isAuthenticated, boardRouter)

const server = createServer(app)
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_ORIGIN || 'http://localhost:3000',
    credentials: true
  }
})

io.on('connection', socket => {
  console.log('Socket connected: ', socket.id)
  socket.on('disconnect', () => {
    console.log('Socket disconnected: ', socket.id)
  })
})

app.set('io', io)

const PORT = process.env.PORT || 5000
server.listen(PORT, () => {
  console.log(`API + Socket.io running on ${PORT}`)
})
