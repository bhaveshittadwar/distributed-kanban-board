import { Schema, model, Document } from 'mongoose'
import bcrypt from 'bcrypt'

export interface IUser extends Document {
  email: string
  password?: string
  googleId?: string
  compare?(pwd: string): Promise<boolean>
}

const userSchema = new Schema<IUser>({
  email:     { type: String, required: true, unique: true },
  password:  {
    type: String,
    required: function(this: IUser) { return !this.googleId }
  },
  googleId:  { type: String }
})

userSchema.pre('save', async function () {
  if (this.password && this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10)
  }
})

userSchema.methods.compare = function (pwd: string) {
  return bcrypt.compare(pwd, this.password!)
}

export default model<IUser>('User', userSchema)
