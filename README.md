# Distributed Kanban Board

**MVP: Real‑time collaborative Kanban board**

---

## Overview

This application is a real‑time collaborative Kanban board. Authenticated users can:

- Sign up or log in (email/password or Google OAuth)  
- Create boards with multiple columns  
- Add, edit, and move cards between columns  
- See live updates when other users make changes  
- (Drag‑and‑drop support will be added in Phase 2)

---

## Project Spec

- **Frontend:** React + Vite + TypeScript  
- **Backend:** Node.js + Express + TypeScript  
- **Database:** MongoDB (no change streams for MVP)  
- **Real‑time sync:** Socket.io  
- **Auth:**  
  1. Local (email/password via passport‑local)  
  2. Google OAuth 2.0  
- **Concurrency:** Optimistic versioning on Columns & Cards (409 on conflict)  
- **Dev setup:** Docker Compose orchestrating:
  - MongoDB  
  - API service (host 5001 → container 5000)  
  - Frontend service (host 3000 → container 5173)  
- **Future phase:**
  - MongoDB change streams  
  - Microservices & Kubernetes  
  - Optimistic UI + drag‑and‑drop integration  

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

- **Health check (backend):** `http://localhost:5001/` → “OK”  
- **Frontend UI:** `http://localhost:3000/`  

---

## Work Completed

- Git repo with `backend/` & `frontend/`  
- `docker-compose.yml`: Mongo, API (5001→5000), Frontend (3000→5173)

- `backend/src/index.ts`: minimal Express+TS, health-check route  
- `backend/Dockerfile`

- Vite React‑TS app in `frontend/`  
- `frontend/Dockerfile`

- Local auth: `passport-local`, `express-session`, `bcrypt`  
- `User` model with conditional `password` (required if no `googleId`)  
- `/signup` & `/login` routes  
- `src/auth/passport.ts`

- Google OAuth setup with `passport-google-oauth20`  
- `src/auth/google.ts`: strategy using `googleId`  
- `/auth/google` & `/auth/google/callback` routes

- Socket.io setup for real-time testing  
  - `/test-socket` POST route emits `test-event`  
  - Frontend listens for `test-event`  
  - Verified full round-trip sync

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