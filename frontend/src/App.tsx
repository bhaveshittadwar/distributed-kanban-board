import { useEffect } from "react";
import socket from './socket'

function App() {
  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected: ', socket.id)
    })

    socket.on('test-event', (data) => {
      console.log('Received test-event: ', data)
    })

    return () => {
      socket.off('connect')
      socket.off('test-event')
    }
  }, [])

  return <div>Frontend Connected to Socket.io</div>
}

export default App