import { useEffect } from "react";
import socket from './socket'

function App() {
  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected: ', socket.id)
    })
  
    socket.on('test-event', data => {
      console.log('Received test-event:', data)
    })
  
    socket.on('column:created', data => console.log('Column created:', data))
    socket.on('column:updated', data => console.log('Column updated:', data))
    socket.on('column:deleted', data => console.log('Column deleted:', data))
  
    socket.on('card:created', data => console.log('Card created:', data))
    socket.on('card:updated', data => console.log('Card updated:', data))
    socket.on('card:deleted', data => console.log('Card deleted:', data))

    socket.on('board:updated', (data) => {
      console.log('Received board update:', data)
    })
  
    return () => {
      socket.off('connect')
      socket.off('test-event')
  
      socket.off('column:created')
      socket.off('column:updated')
      socket.off('column:deleted')
  
      socket.off('card:created')
      socket.off('card:updated')
      socket.off('card:deleted')

      socket.off('board:updated')
    }
  }, [])

  return <div>Frontend Connected to Socket.io</div>
}

export default App