import { useState } from 'react'
import API from '../lib/api'
import { Link } from 'react-router-dom'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    try {
      await API.post('/login', { email, password })
      window.location.href = '/'
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Login failed')
    }
  }

  return (
    <div className="auth-container">
      <h2>Log In</h2>
      <form onSubmit={handleLogin} className="auth-form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button type="submit">Log In</button>
      </form>
      <p>
        Don’t have an account? <Link to="/signup">Sign up here</Link>
      </p>
      <a href={`${import.meta.env.VITE_API_URL}/auth/google`}>
        <button className="google-button">Continue with Google</button>
      </a>
      {error && <p className="error-text">{error}</p>}
    </div>
  )
}