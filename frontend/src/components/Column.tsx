import { useState } from 'react'
import API from '../lib/api'
import type { Column as ColumnType } from '../types'
import Card from './Card'

type Props = {
  data: ColumnType
}

export default function Column({ data }: Props) {
  const [title, setTitle] = useState(data.title)
  const [newCardTitle, setNewCardTitle] = useState('')
  const [isEditing, setIsEditing] = useState(false)

  const handleEdit = async () => {
    if (title !== data.title) {
      await API.put(`/columns/${data._id}`, {
        title,
        order: data.order,
        __v: data.__v
      })
    }
    setIsEditing(false)
  }

  const handleDelete = async () => {
    await API.delete(`/columns/${data._id}`)
  }

  const handleCreateCard = async () => {
    if (!newCardTitle.trim()) return
    await API.post('/cards', {
      title: newCardTitle,
      columnId: data._id,
      order: data.cards.length
    })
    setNewCardTitle('')
  }

  return (
    <div className="column">
      <div className="column-header">
        {isEditing ? (
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            onBlur={handleEdit}
            onKeyDown={e => e.key === 'Enter' && handleEdit()}
            autoFocus
          />
        ) : (
          <h2 onClick={() => setIsEditing(true)}>{data.title}</h2>
        )}
        <button onClick={handleDelete}>🗑️</button>
      </div>

      {data.cards.map(card => (
        <Card key={card._id} data={card} />
      ))}

      <input
        placeholder="New card title"
        value={newCardTitle}
        onChange={e => setNewCardTitle(e.target.value)}
      />
      <button onClick={handleCreateCard}>Add Card</button>
    </div>
  )
}