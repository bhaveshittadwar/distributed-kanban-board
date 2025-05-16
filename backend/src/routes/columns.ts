import { Router, Request, Response, NextFunction } from 'express';
import Column from '../models/Column';

const router = Router();

// create
router.post('/', async(req: Request, res: Response, next: NextFunction) => {
    try {
        const col = await Column.create(req.body);
        res.status(201).json(col);
    } catch (error) {
        next(error);
    }
});

// read all
router.get('/', async(req: Request, res: Response, next: NextFunction) => {
    try {
        const cols = await Column.find().sort('order')
        res.json(cols)
        } catch (err) { 
            next(err)
        }
    }
);

// update
router.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const col = await Column.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.json(col)
    } catch (err) {
        next(err) 
    }
})

// delete
router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        await Column.findByIdAndDelete(req.params.id)
        res.sendStatus(204)
    } catch (err) {
        next(err)
    }
})


export default router;