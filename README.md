# Distributed Kanban Board

**MVP: Real‑time collaborative Kanban board**

---

## Overview

This application is a real‑time collaborative Kanban board. Authenticated users can:

- Sign up or log in (email/password or Google OAuth)  
- Create boards with multiple columns  
- Add, edit, and move cards between columns  
- See live updates when other users make changes  
- (Drag‑and‑drop support will be added later)

---

## Project Spec

- **Frontend:** React + Vite + TypeScript  
- **Backend:** Node.js + Express + TypeScript  
- **Database:** MongoDB  
- **Real‑time sync:** Socket.io  
- **Auth:**  
  1. Local (email/password via `passport‑local`)  
  2. Google OAuth 2.0  
- **Concurrency:** Optimistic versioning on Columns & Cards (`409 Conflict`)  
- **Dev setup:** Docker Compose orchestrating:
  - MongoDB  
  - API service (host 5001 → container 5000)  
  - Frontend service (host 3000 → container 5173)  

---

## Environment (`.env` in project root)

~~~bash
MONGO_URL=mongodb://mongo:27017/kanban
SESSION_SECRET=your_session_secret
GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET=YOUR_GOOGLE_CLIENT_SECRET
GOOGLE_CALLBACK_URL=http://localhost:5001/auth/google/callback
CLIENT_ORIGIN=http://localhost:3000
~~~

---

## Build & Run

From repo root:

~~~bash
docker-compose up --build -d
~~~

- **Backend API:** `http://localhost:5001/` → “OK”  
- **Frontend UI:** `http://localhost:3000/`

---

## Work Completed

- Project scaffold with `backend/`, `frontend/`, and `docker-compose.yml`
- Backend:
  - Express app with session + passport setup
  - Auth routes for `/signup`, `/login`, `/auth/google`
  - MongoDB models for `User`, `Column`, and `Card`
  - CRUD routes with optimistic versioning + real-time emits
  - Socket.io configured on shared HTTP server
- Frontend:
  - React + Vite app with `App.tsx` as main container
  - Modular components for `Column`, `Card`, `Login`, `Signup`
  - Auth-aware routing using `react-router-dom`
  - Socket.io client with board sync + updates
  - Reusable Axios instance with cookie/session support

---

## .gitignore (root)

~~~gitignore
**/node_modules/
backend/dist/
frontend/node_modules/
.env
.DS_Store
.vscode/
~~~

## Subproject Docs

- [`backend/README.md`](./backend/README.md)
- [`frontend/README.md`](./frontend/README.md)