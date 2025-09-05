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

### 2) Backend `.env` (`.env`)

```env
PORT=4000
MONGO_URI=mongodb://localhost:27017/chatapp
JWT_SECRET=supersecret_change_me
JWT_EXPIRES=7d


## ▶️ Menjalankan Aplikasi

### Backend
```bash
cd chat-backend
npm install
npm run dev   # atau npm start
# http://localhost:4000
