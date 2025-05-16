import {Schema, model, Types, Document} from 'mongoose'

export interface Card extends Document {
    title: string,
    description?: string,
    columnId: Types.ObjectId,
    order: number
}

const cardSchema = new Schema<Card>({
    title: {type: String, required:true},
    description: {type: String},
    columnId: {type: Schema.Types.ObjectId, ref: 'Column', required:true},
    order:  {type: Number, required: true}
})

const CardModel = model<Card>('Card', cardSchema)
export default CardModel