import { Router, Request, Response, NextFunction} from 'express'
import Column from '../models/Column'
import Card from '../models/Card'

const router = Router();

// get board
router.get('/', async (_: Request, res: Response, next: NextFunction) => {
    try {
      const columns = await Column.find().sort('order').lean()
      const columnIds = columns.map(c => c._id)
      const cards = await Card.find({ columnId: { $in: columnIds } })
                        .sort('order')
                        .lean()
  
      // group cards by columnId
      // reduce use case: accumulate list of cards for column id as key
      const cardsByCol = cards.reduce<Record<string, any[]>>((acc, card) => {
        const col = card.columnId.toString()
        acc[col] = acc[col] || [] // assign empty array if null
        acc[col].push(card)
        return acc
      }, {})
  
      // attach cards to each column
      // to the col object, attach the list of cards from cardsByCol for that col id
      const board = columns.map(col => ({
        ...col,
        cards: cardsByCol[col._id.toString()] || []
      }))
  
      res.json(board)
    } catch (err) {
      next(err)
    }
  })
  
  export default router