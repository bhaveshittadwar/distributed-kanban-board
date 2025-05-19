import Column from '../models/Column'
import Card from '../models/Card'

export default async function getBoard() {
  const columns = await Column.find().sort('order').lean()
  const columnIds = columns.map(c => c._id)
  const cards = await Card.find({ columnId: { $in: columnIds } }).sort('order').lean()

  return columns.map(col => ({
    ...col,
    cards: cards.filter(card => card.columnId.toString() === col._id.toString())
  }))
}