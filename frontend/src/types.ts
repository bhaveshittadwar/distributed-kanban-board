export type Card = {
    _id: string
    title: string
    order: number
    columnId: string
    __v: number
}
  
export type Column = {
    _id: string
    title: string
    order: number
    __v: number
    cards: Card[]
}