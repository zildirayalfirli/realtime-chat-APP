# Realtime Chat App — Express, MongoDB, Socket.IO, React

A simple chat application with:

- JWT authentication (register/login)
- Rooms (create, list, detail, join)
- Realtime chat with Socket.IO + MongoDB persistence
- Typing indicator & online/offline presence (room snapshot on join/leave/disconnect)

---

## 🧰 Tech Stack

- **Backend:** Node.js (Express 5), Socket.IO, Mongoose (MongoDB)
- **Auth:** JWT
- **Frontend:** React (Vite)

---

## 🔧 Setup

### 1) Prerequisites

- Node.js 18+
- MongoDB running locally or a cloud URI

### 2) Backend `.env`

```env
PORT=4000
MONGODB_URI=mongodb+srv://zildirayalfirli_db_user:5TSyqlB68CCQd6h7@chatapp.bljqm8z.mongodb.net/chatapp?retryWrites=true&w=majority&appName=chatapp
JWT_SECRET=supersecretkey
JWT_EXPIRES=1d
```

### 3) Run backend

```
npm install
npm run dev   # or: npm start
# → http://localhost:4000
```

---

## 🔧 Request

Import Sagara Test.postman_collection.json on your postman app

### 1. Register

POST /api/auth/register

```
{ "username": "alice", "password": "secret" }
```

### 2. Login

Login

POST /api/auth/login

```
{ "username": "alice", "password": "secret" }
```

### 3. Get current user

GET /api/users/me (JWT required)

```
{
  "status": 200,
  "message": "OK",
  "data": [{ "_id": "64...", "username": "alice", "createdAt": "..." }]
}
```

### 4. Create room

POST /api/rooms (JWT required)

```
{ "name": "General" }
```

### 5. List rooms

GET /api/rooms

```
{
  "status": 200,
  "message": "Rooms fetched",
  "data": [
    { "_id": "...", "name": "General", "members": [ ... ] }
  ]
}
```

### 6. Room detail

GET /api/rooms/:id

```
{
  "status": 200,
  "message": "Rooms fetched",
  "data": [
    { "_id": "...", "name": "General", "members": [ ... ] }
  ]
}
```

### 7. Join room 

POST /api/rooms/:id/join (JWT required)

```
{
  "status": 200,
  "message": "Joined",
  "data": [{ "roomId": "..." }]
}
```

### 8. List messages 

GET /api/rooms/:id/messages (JWT + membership required)

```
{
  "status": 200,
  "message": "Messages fetched",
  "data": [
    {
      "_id": "...",
      "room": "...",
      "sender": { "_id": "...", "username": "alice" },
      "content": "Hi",
      "createdAt": "..."
    }
  ]
}
```

### 9. Create message

POST /api/rooms/:id/messages (JWT + membership required)
```
{ "content": "Hello world" }
```

---

## 🔧 ⚡ Socket.IO (Realtime)

Connect with JWT for:

### 1. Emit

  - joinRoom — { roomId }
  - leaveRoom — { roomId }
  - chatMessage — { roomId, content }
  - typing — { roomId, isTyping: true | false }

### 2. Listen

  - chatMessage — payload of the new message
  - typing — { roomId, userId, username, isTyping }
  - userOnline / userOffline — incremental presence hints
