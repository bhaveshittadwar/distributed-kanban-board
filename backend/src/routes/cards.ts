import { Router, Request, Response, NextFunction } from 'express';
import Card from '../models/Card';

const router = Router();

// create
router.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const card = await Card.create(req.body)
        res.status(201).json(card)
    } catch (error) {
        next(error)
    }
})

// read by col
router.get('/column/:columnId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const cards = await Card.find({columnId: req.params.columnId}).sort('order')
        res.json(cards)
    } catch (error) {
        next(error)
    }
})

// update
router.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { __v, ...update } = req.body
      const card = await Card.findOneAndUpdate(
        { _id: req.params.id, __v },
        { ...update, $inc: { __v: 1 } },
        { new: true }
      )
      if (!card) {
        res.status(409).json({ message: 'Version conflict' })
      }
      res.json(card)
    } catch (err) {
      next(err)
    }
  })

// delete
router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        await Card.findByIdAndDelete(req.params.id)
    } catch (error) {
        next(error)
    }
})

export default router