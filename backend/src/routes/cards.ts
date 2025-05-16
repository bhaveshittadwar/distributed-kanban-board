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
        const card = await Card.findByIdAndUpdate(req.params.id, req.body, {new: true})
        res.json(card)
    } catch (error) {
        next(error)
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