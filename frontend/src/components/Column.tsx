import { useState } from 'react'
import API from '../lib/api'
import type { Column as ColumnType } from '../types'
import Card from './Card'
import { Edit3, Trash2 } from 'lucide-react'

type Props = {
  data: ColumnType
}

export default function Column({ data }: Props) {
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState(data.title)
  const [newCard, setNewCard] = useState('')

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

  const handleAddCard = async () => {
    if (!newCard.trim()) return
    await API.post('/cards', {
      title: newCard,
      columnId: data._id,
      order: data.cards.length
    })
    setNewCard('')
  }

  return (
    <div className="column">
      <div className="column-header">
        {isEditing ? (
          <input
            className="column-title-input"
            value={title}
            onChange={e => setTitle(e.target.value)}
            onBlur={handleEdit}
            onKeyDown={e => e.key === 'Enter' && handleEdit()}
            autoFocus
          />
        ) : (
          <p className="column-title">{title}</p>
        )}
        <div className="card-actions">
          {!isEditing && (
            <button className="icon-button" onClick={() => setIsEditing(true)}>
              <Edit3 size={16} />
            </button>
          )}
          <button className="icon-button" onClick={handleDelete}>
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <div className="card-list">
        {data.cards.map(card => (
          <Card key={card._id} data={card} />
        ))}
      </div>

      <input
        className="card-input"
        placeholder="New card title"
        value={newCard}
        onChange={e => setNewCard(e.target.value)}
      />
      <button className="add-card-button" onClick={handleAddCard}>
        Add Card
      </button>
    </div>
  )
}