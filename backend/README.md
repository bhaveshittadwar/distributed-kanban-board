# Kanban Board API

Node.js + Express + TypeScript backend for the **Distributed Kanban Board**.

---

## 🌐 Live URL

| Service | URL                                                         |
|---------|-------------------------------------------------------------|
| API     | https://backend-morning-resonance-6865.fly.dev              |

---

## Overview

- Local and Google OAuth 2.0 authentication  
- CRUD for Columns and Cards with Socket.io live sync  
- Optimistic concurrency (`__v` version key)  
- `/board` aggregate endpoint returns columns with their cards  

---

## Environment

Place a `.env` file in `backend/`:

~~~bash
MONGO_URL=mongodb://mongo:27017/kanban
SESSION_SECRET=<random-string>
GOOGLE_CLIENT_ID=<google-id>
GOOGLE_CLIENT_SECRET=<google-secret>
GOOGLE_CALLBACK_URL=http://localhost:5001/auth/google/callback
CLIENT_ORIGIN=http://localhost:3000
PORT=5001
~~~

Fly.io overrides `PORT` to 8080 automatically; set the other keys with  
`flyctl secrets set KEY=value`.

---

## Run Locally

~~~bash
# In backend/
npm install
npm run build
npm start
~~~

### Docker Compose (root)

~~~bash
docker compose up --build api
~~~

API now listens on http://localhost:5001

---

## API Endpoints

### Auth

| Method | Path                     | Notes                                        |
|--------|--------------------------|----------------------------------------------|
| POST   | /signup                  | { email, password }                          |
| POST   | /login                   | { email, password }                          |
| GET    | /auth/google             | Start OAuth                                  |
| GET    | /auth/google/callback    | OAuth redirect                               |
| POST   | /logout                  | Destroy session                              |
| GET    | /me                      | Returns { email } if logged in               |

### Columns

- POST /columns  
- GET  /columns  
- PUT  /columns/:id      (must include `__v`)  
- DELETE /columns/:id

### Cards

- POST /cards  
- GET  /cards/column/:columnId  
- PUT  /cards/:id        (must include `__v`)  
- DELETE /cards/:id

### Board

- GET /board — returns all columns with embedded cards

---

## Optimistic Concurrency

- Updates match `{ _id, __v }`  
- Successful writes run `$inc: { __v: 1 }`  
- Mismatched version → `409 Conflict`

---

## Real-time Sync

Socket.io events:

- column:created, column:updated, column:deleted  
- card:created,   card:updated,   card:deleted  
- board:updated (full board refresh)

---