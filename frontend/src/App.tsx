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
  const [showNewColInput, setShowNewColInput] = useState(false)
  const[users, setUsers] = useState<string[]>([]);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Socket connected:', socket.id)
    })
    socket.on('board:updated', (data: ColumnType[]) => {
      setColumns(data)
    })
    socket.on('users-update', (data) => {
      setUsers(data.users)
    })

    if (location.pathname === '/') {
      API.get('/me')
        .then(res => {
          socket.connect()
          setUserEmail(res.data.email)
          return API.get('/board')
        })
        .then(res => setColumns(res.data))
        .catch(() => {
          setUserEmail(null)
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

  const logout = async () => {
    socket.disconnect()
    await API.post('/logout')
    window.location.reload()
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          userEmail ? (
            <div className="app-container">
              <div className="header">
                <h1>Distributed Kanban MVP</h1>
                {users && (
                  <div>users live: {users.length}</div>
                )}

                <div className="user-info">
                  <span>👤 {userEmail}</span>
                  <button onClick={logout}>Log Out</button>
                </div>
              </div>

              <div className="board">
                {columns.map(col => (
                  <Column key={col._id} data={col} />
                ))}
                <div className="column new-column">
                  {showNewColInput ? (
                    <>
                      <input
                        value={newCol}
                        onChange={e => setNewCol(e.target.value)}
                        placeholder="New column title"
                      />
                      <button onClick={handleCreateColumn}>Create</button>
                      <button onClick={() => setShowNewColInput(false)}>Cancel</button>
                    </>
                  ) : (
                    <button onClick={() => setShowNewColInput(true)}>+ Add Column</button>
                  )}
                </div>
              </div>
              {users.length > 0 && (
                <>
                <h2>Live Users Email List: </h2>
                <ul>
                  {users.map(user => (
                    <li key={user}>{user}</li>
                  ))}
                </ul>
                </>
              )}
            </div>
          ) : null
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  )
}