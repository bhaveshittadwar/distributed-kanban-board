# Distributed Kanban Board

**MVP 1: Real-time collaborative Kanban board**

---

## 🚀 Live Demo

| Service   | URL                                                         |
|-----------|-------------------------------------------------------------|
| Frontend  | https://kanban-ui.fly.dev/                             |
| Backend   | https://backend-morning-resonance-6865.fly.dev              |

*(Both run on Fly.io’s free tier.)*

---

## Overview

Authenticated users can:

- Sign up or log in (email/password **or** Google OAuth)  
- Create boards with multiple columns  
- Add, edit, and move cards between columns  
- See live updates as other users make changes  

MVP 2 (in progress) adds multi-board, roles, drag-and-drop, and live cursors.

---

## Project Spec

- **Frontend:** React 19 + Vite + TypeScript  
- **Backend:** Node 20 + Express + TypeScript  
- **Database:** MongoDB  
- **Real-time sync:** Socket.io  
- **Auth:** Local (`passport-local`) & Google OAuth 2.0  
- **Concurrency:** Optimistic versioning (`409 Conflict`)  
- **Dev setup:** Docker Compose  
  - MongoDB  
  - API (host 5001 → container 5000)  
  - Frontend (host 3000 → container 5173)

---

## Environment

### `backend/.env`
~~~bash
MONGO_URL=mongodb://mongo:27017/kanban
SESSION_SECRET=<random-string>
GOOGLE_CLIENT_ID=<google-id>
GOOGLE_CLIENT_SECRET=<google-secret>
GOOGLE_CALLBACK_URL=http://localhost:5001/auth/google/callback
CLIENT_ORIGIN=http://localhost:3000
PORT=5001            # Fly overrides to 8080
~~~

### `frontend/.env`
~~~bash
VITE_API_URL=http://localhost:5001
VITE_SOCKET_URL=http://localhost:5001
~~~

---

## Build & Run (local)

~~~bash
docker compose up --build -d
~~~

- **Frontend:** http://localhost:3000  
- **Backend:**  http://localhost:5001

---

## Work Completed (MVP 1)

- **Backend:** Auth routes, column/card CRUD, optimistic concurrency, Socket.io
- **Frontend:** Auth-aware routing, live board UI, Axios + Socket.io client
- **DevOps:** Docker Compose stack; Fly.io deployment (frontend + backend)

---

## Subproject Docs

- [`backend/README.md`](./backend/README.md)  
- [`frontend/README.md`](./frontend/README.md)

---

## Repository

GitHub: https://github.com/bhaveshittadwar/distributed-kanban-board

---

## License

MIT – see [`LICENSE`](./LICENSE)