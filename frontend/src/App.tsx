import { useEffect, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import './App.css'
import API from './lib/api'
import socket from './socket'
import Column from './components/Column'
import Login from './components/Login'
import Signup from './components/Signup'
import type { Column as ColumnType } from './types'

export default function App() {
  const navigate = useNavigate()
  const [columns, setColumns] = useState<ColumnType[]>([])
  const [newCol, setNewCol] = useState('')
  const [userEmail, setUserEmail] = useState<string | null>(null)

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Socket connected:', socket.id)
    })

    socket.on('board:updated', (data: ColumnType[]) => {
      setColumns(data)
    })

    if (window.location.pathname === '/') {
      API.get('/me')
        .then(res => {
          setUserEmail(res.data.email)
          return API.get('/board')
        })
        .then(res => setColumns(res.data))
        .catch(() => {
          navigate('/login')
        })
    }

    return () => {
      socket.off('connect')
      socket.off('board:updated')
    }
  }, [navigate])

  const handleCreateColumn = async () => {
    if (!newCol.trim()) return
    await API.post('/columns', { title: newCol, order: columns.length })
    setNewCol('')
  }

  const handleLogout = async () => {
    await API.post('/logout')
    setUserEmail(null)
    navigate('/login')
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          userEmail ? (
            <div>
              <h1>Distributed Kanban MVP</h1>
              <p>👤 Logged in as {userEmail}</p>
              <button onClick={handleLogout}>Log Out</button>

              <div className="board">
                {columns.map(col => (
                  <Column key={col._id} data={col} />
                ))}
              </div>

              <input
                value={newCol}
                onChange={e => setNewCol(e.target.value)}
                placeholder="New column title"
              />
              <button onClick={handleCreateColumn}>Add Column</button>
            </div>
          ) : null
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  )
}