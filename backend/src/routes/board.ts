import { Router, Request, Response, NextFunction } from 'express'
import getBoard from '../utils/getBoard'

const router = Router()

// return all columns with their cards
router.get('/', async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const board = await getBoard()
    res.json(board)
  } catch (err) {
    next(err)
  }
})

export default router