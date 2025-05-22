# Kanban Board Frontend

React + Vite + TypeScript client for the **Distributed Kanban Board**.

---

## 🌐 Live URLs

| Service   | URL                                                         |
|-----------|-------------------------------------------------------------|
| Frontend  | https://kanban-ui.fly.dev/                              |

---

## Features

- Create, edit, delete columns & cards  
- Real-time updates via Socket.io  
- Email/password **and** Google OAuth 2.0 authentication  
- Protected routes that redirect unauthenticated users  
- Automatic UI refresh on login / logout  
- Clean routing with React Router v6

---

## Tech Stack

- React 19, Vite, TypeScript  
- Axios for REST calls  
- Socket.io-client for web-socket events  
- React Router for SPA navigation

---

## Project Structure

~~~text
frontend/
├── src/
│   ├── App.tsx            # Main router & layout
│   ├── components/        # Column, Card, Login, Signup …
│   ├── lib/
│   │   └── api.ts         # Axios instance
│   ├── socket.ts          # Singleton socket.io client
│   └── types.ts           # Shared domain types
└── vite.config.ts
~~~

---

## Environment

Create `frontend/.env` :

~~~bash
VITE_API_URL=http://localhost:5001
VITE_SOCKET_URL=http://localhost:5001
~~~

For Fly.io production deploys:

~~~bash
flyctl secrets set \
  VITE_API_URL=https://backend-morning-resonance-6865.fly.dev \
  VITE_SOCKET_URL=https://backend-morning-resonance-6865.fly.dev
~~~

---

## Development

~~~bash
cd frontend
npm install
npm run dev          # served at http://localhost:5173
~~~

or via Docker Compose from repo root:

~~~bash
docker compose up --build frontend
~~~

---

## Routing

| Path     | Description                          |
|----------|--------------------------------------|
| `/`      | Protected Kanban board UI           |
| `/login` | Login & signup (toggle inside)      |
| `/signup`| Optional explicit signup route      |

---

## Real-time Events

Socket.io channels:

- `board:updated`  
- `column:created`, `column:updated`, `column:deleted`  
- `card:created`,   `card:updated`,   `card:deleted`

Updates propagate instantly to all connected clients.

---

## Auth Flow

1. On boot, app fetches `/me`; redirects to `/login` if 401.  
2. User logs in via form **or** Google OAuth popup.  
3. Successful auth sets session cookie → UI reloads to board.  
4. Logout clears session and redirects to `/login`.

---

## Repository

GitHub: https://github.com/bhaveshittadwar/distributed-kanban-board

---

## License

MIT