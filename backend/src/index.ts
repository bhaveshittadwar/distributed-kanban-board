import session from 'express-session'
import passport from './auth/passport'
import User from './models/User'
import express, { Request, Response, NextFunction } from 'express'

import mongoose from 'mongoose'

const app = express()
app.use(session({
  secret: 'replace_me',
  resave: false,
  saveUninitialized: false
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

app.listen(5000, () => console.log('API listening on 5000'))
