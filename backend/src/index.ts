import express, { Request, Response } from 'express'
import mongoose from 'mongoose'

const app = express()
app.use(express.json())
mongoose.connect(process.env.MONGO_URL!)

app.get('/', (_req: Request, res: Response) => {
  res.send('OK')
})

app.listen(5000, () => console.log('API listening on 5000'))
