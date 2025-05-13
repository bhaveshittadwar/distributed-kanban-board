import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import User from '../models/User'

passport.use(
  new LocalStrategy(
    { usernameField: 'email' },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email })
        if (!user) {
          return done(null, false, { message: 'Incorrect email.' })
        }
        const ok = await user.compare(password)
        if(!ok) return done(null, false, { message: 'Incorrect password.' })
        return done(null, user)
      } catch (error) {
        return done(error)
    }
    }
  )
)

passport.serializeUser((user: any, done) => done(null, user.id))
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id)
    done(null, user)
  } catch (err) {
    done(err as any)
  }
})

export default passport