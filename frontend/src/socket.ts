import { io } from 'socket.io-client'

const SOCKET_URL =
  import.meta.env.VITE_SOCKET_URL ?? 'http://localhost:5001'

export default io(SOCKET_URL, {
  withCredentials: true, // needed since i am using express session - to send session cookies in handshakes
  autoConnect: false
})
