# Kanban Board Frontend

A React + Vite + TypeScript frontend for a real-time collaborative Kanban board.

---

## Features

- Create, edit, delete columns and cards
- Real-time sync across clients via Socket.io
- User authentication (email/password + Google OAuth 2.0)
- Protected routes based on login status
- Auto reload on login/signup/logout
- Simple routing with React Router

---

## Tech Stack

- React 19 + Vite + TypeScript
- Axios for API calls
- Socket.io client for real-time events
- React Router for client-side routing

---

## Project Structure

- `App.tsx` — Main logic and routing
- `components/` — UI components like `Column`, `Card`, `Login`, `Signup`
- `lib/api.ts` — Axios instance with baseURL and credentials
- `socket.ts` — Socket.io client instance
- `types.ts` — Shared TS types for Column and Card

---

## Environment

Create a `.env` file inside `frontend/`:

~~~bash
VITE_API_URL=http://localhost:5001
VITE_SOCKET_URL=http://localhost:5001
~~~

---

## Development

~~~bash
# From frontend/
npm install
npm run dev
~~~

You can also run it via Docker Compose from the root:

~~~bash
docker-compose up --build frontend
~~~

---

## Routing

- `/` — Protected board UI (requires login)
- `/login` — Login and signup form
- `/signup` — (Optional, accessible via `/login` toggle)

---

## Realtime Events

Socket.io listens for:

- `board:updated`
- `column:created`, `column:updated`, `column:deleted`
- `card:created`, `card:updated`, `card:deleted`

All changes are reflected live across sessions.

---

## Auth Flow

- App checks `/me` on load
- If not logged in, redirects to `/login`
- Supports both manual signup/login and Google OAuth login