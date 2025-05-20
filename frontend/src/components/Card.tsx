import { useState } from 'react'
import API from '../lib/api'
import type { Card as CardType } from '../types'
import { Edit3, Trash2 } from 'lucide-react'

type Props = {
  data: CardType
}

export default function Card({ data }: Props) {
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState(data.title)

  const handleDelete = async () => {
    await API.delete(`/cards/${data._id}`)
  }

  const handleEdit = async () => {
    if (title !== data.title) {
      await API.put(`/cards/${data._id}`, {
        title,
        columnId: data.columnId,
        order: data.order,
        __v: data.__v
      })
    }
    setIsEditing(false)
  }

  return (
    <div className="card">
      {isEditing ? (
        <input
          className="card-title-input"
          value={title}
          onChange={e => setTitle(e.target.value)}
          onBlur={handleEdit}
          onKeyDown={e => e.key === 'Enter' && handleEdit()}
          autoFocus
        />
      ) : (
        <p className="card-title">{title}</p>
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
  )
}