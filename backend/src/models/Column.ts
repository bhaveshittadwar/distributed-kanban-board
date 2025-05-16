import {Schema, model, Document} from 'mongoose';

export interface Column extends Document {
    title: string;
    order: number; // board postion
}

const columnSchema = new Schema<Column>({
    title: {
        type: String,
        required: true,
    },
    order: {
        type: Number,
        required: true,
    },
});
const ColumnModel = model<Column>('Column', columnSchema);
export default ColumnModel;