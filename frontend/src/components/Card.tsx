import { useState } from 'react'
import API from '../lib/api'
import type { Card as CardType } from '../types'

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
          value={title}
          onChange={e => setTitle(e.target.value)}
          onBlur={handleEdit}
          onKeyDown={e => e.key === 'Enter' && handleEdit()}
          autoFocus
        />
      ) : (
        <p onClick={() => setIsEditing(true)}>{data.title}</p>
      )}
      <button onClick={handleDelete}>🗑️</button>
    </div>
  )
}