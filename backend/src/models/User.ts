import { Schema, model } from 'mongoose'
import bcrypt from 'bcrypt'

export interface User extends Document { 
  email: string
  password: string
  compare(pwd: string): Promise<boolean>
}

const userSchema = new Schema<User>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
})

userSchema.pre('save', async function () {
  if (!this.isModified('password')) return
  this.password = await bcrypt.hash(this.password, 10)
})

userSchema.methods.compare = function (pwd: string) {
  return bcrypt.compare(pwd, this.password)
}

export default model<User>('User', userSchema)
