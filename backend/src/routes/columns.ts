import { Router, Request, Response, NextFunction } from 'express';
import Column from '../models/Column';
import getBoard from '../utils/getBoard';

const router = Router();

// create
router.post('/', async(req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const col = await Column.create(req.body);
        req.app.get('io').emit('column:created', col)
        const board = await getBoard()
        req.app.get('io').emit('board:updated', board)
        res.status(201).json(col);
    } catch (error) {
        next(error);
    }
});

// read all
router.get('/', async(req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const cols = await Column.find().sort('order')
        res.json(cols)
        } catch (err) { 
            next(err)
        }
    }
);

// update
// IMP: __v is the versionKey maintained by mongo for each doc
router.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { __v, ...update } = req.body
        const col = await Column.findOneAndUpdate(
          { _id: req.params.id, __v },     // match v
          { ...update, $inc: { __v: 1 } }, // bump v
          { new: true }
        )
        if (!col) {
            res.status(409).json({ message: 'Version conflict' })
            return
        }
        req.app.get('io').emit('column:updated', col)
        const board = await getBoard()
        req.app.get('io').emit('board:updated', board)
        res.json(col)
      } catch (err) {
        next(err)
    }
})

// delete
router.delete('/:id', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        await Column.findByIdAndDelete(req.params.id)
        req.app.get('io').emit('column:deleted', {id: req.params.id})
        const board = await getBoard()
        req.app.get('io').emit('board:updated', board)
        res.status(204).end()
    } catch (err) {
        next(err)
    }
})

export default router;