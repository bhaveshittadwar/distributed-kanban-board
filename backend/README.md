# Kanban Board API

A Node.js + Express + TypeScript backend powering a real-time collaborative Kanban board.

---

## Overview

This service includes:

- User authentication (local via `passport-local`, Google via `passport-google-oauth20`)
- CRUD for Columns and Cards with real-time sync via Socket.io
- Optimistic concurrency using Mongoose’s version key (`__v`)
- Aggregated `/board` route returning columns with their cards

---

## Environment

Place a `.env` file at the project root:

~~~bash
MONGO_URL=mongodb://mongo:27017/kanban
GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET=YOUR_GOOGLE_CLIENT_SECRET
GOOGLE_CALLBACK_URL=http://localhost:5001/auth/google/callback
SESSION_SECRET=your_session_secret
CLIENT_ORIGIN=http://localhost:3000
~~~

---

## Run

~~~bash
# Local run (in backend/)
npm install
npm run build
npm start

# Or with Docker (from root)
docker-compose up --build api
~~~

---

## API Endpoints

### Auth

- `POST /signup` — `{ email, password }` → `{ email }`  
- `POST /login`  — `{ email, password }` → `{ email }`  
- `GET /auth/google` — start Google OAuth  
- `GET /auth/google/callback` — OAuth redirect  
- `POST /logout` — destroys session  
- `GET /me` — returns `{ email }` if logged in

---

### Columns

- `POST /columns`  
- `GET /columns`  
- `PUT  /columns/:id` — must include `__v`  
- `DELETE /columns/:id`

---

### Cards

- `POST /cards`  
- `GET  /cards/column/:columnId`  
- `PUT  /cards/:id` — must include `__v`  
- `DELETE /cards/:id`

---

### Board

- `GET /board` — returns all columns with embedded cards

---

## Optimistic Concurrency

- All updates use `{ _id, __v }` match  
- Successful writes increment version: `$inc: { __v: 1 }`  
- Fails with `409 Conflict` if version has changed

---

## Real-time Sync

- Server initializes Socket.io over same HTTP server
- Events:
  - `column:created`, `column:updated`, `column:deleted`
  - `card:created`, `card:updated`, `card:deleted`
  - `board:updated` for full state