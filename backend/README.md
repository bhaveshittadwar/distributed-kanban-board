# Kanban Board API

A Node.js + Express + TypeScript backend for a real-time collaborative Kanban board MVP.

---

## Overview

This service provides:

- User authentication (email/password via passport-local, Google OAuth 2.0)  
- CRUD operations for Columns and Cards  
- A consolidated `/board` endpoint returning all columns with their cards  
- **Optimistic concurrency control** using Mongoose’s version key (`__v`)  
- **Real-time sync foundation** with Socket.io

---

## Environment

Create a `.env` file at the project root with:

~~~bash
MONGO_URL=mongodb://mongo:27017/kanban
GOOGLE_CLIENT_ID=YOUR_CLIENT_ID
GOOGLE_CLIENT_SECRET=YOUR_CLIENT_SECRET
GOOGLE_CALLBACK_URL=http://localhost:5001/auth/google/callback
SESSION_SECRET=your_session_secret
~~~

---

## Installation & Run

~~~bash
# in backend/
npm install
npm run build       # compiles TS to dist/
npm start           # runs dist/index.js

# or with Docker Compose from project root:
docker-compose up --build api
~~~

---

## API Endpoints

### Auth

- `POST /signup`  
  - Body: `{ email: string, password: string }`  
  - Response: `{ email: string }`

- `POST /login`  
  - Body: `{ email: string, password: string }`  
  - Response: `{ email: string }`

- `GET /auth/google` → starts Google OAuth  
- `GET /auth/google/callback` → Google redirects here, then forwards to frontend

---

### Columns

- `POST /columns`  
- `GET /columns`  
- `PUT  /columns/:id` *(optimistic versioning — client must include last-seen `__v`)*  
- `DELETE /columns/:id`

---

### Cards

- `POST /cards`  
- `GET  /cards/column/:columnId`  
- `PUT  /cards/:id` *(optimistic versioning — client must include last-seen `__v`)*  
- `DELETE /cards/:id`

---

### Board

- `GET /board`  
  Returns an array of columns, each with a `cards` array.

---

## Optimistic Concurrency Control

- Update routes (`PUT`) match on the client’s last-seen `__v`
- DB increments version with `$inc: { __v: 1 }` only on successful match
- Prevents silent overwrites
- Returns `409 Conflict` if there's a version mismatch

---

## Real-time Events (via Socket.io)

- Server initialized Socket.io alongside Express
- `/test-socket` emits `test-event` to all connected clients
- Clients listen on `test-event` to confirm real-time capability