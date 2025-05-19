import { Router, Request, Response, NextFunction } from 'express';
import Card from '../models/Card';

const router = Router();

// create
router.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const card = await Card.create(req.body)
        req.app.get('io').emit('card:created', card)
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
        return
      }
      req.app.get('io').emit('card:updated', card)
      res.json(card)
    } catch (err) {
      next(err)
    }
  })

// delete
router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        await Card.findByIdAndDelete(req.params.id)
        req.app.get('io').emit('card:deleted', { id: req.params.id })
        res.status(204).end()
    } catch (error) {
        next(error)
    }
})

export default router