import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import User from '../models/User'

passport.use(new GoogleStrategy(
  {
    clientID:     process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    callbackURL:  process.env.GOOGLE_CALLBACK_URL!
  },
  async (_accessToken, _refreshToken, profile, done) => {
    try {
      const email = profile.emails?.[0]?.value
      if (!email) return done(new Error('No email in Google profile'), false)

      let user = await User.findOne({ email })
      if (!user) {
        user = await User.create({
          email,
          googleId: profile.id
        })
      }

      return done(null, user)
    } catch (err) {
      console.error('Google OAuth error:', err)
      return done(err as Error, false)
    }
  }
))

export default passport
