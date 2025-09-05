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

## 🔧 Persiapan

### 1) Prasyarat
- Node.js 18+ (disarankan LTS terbaru)
- MongoDB berjalan lokal (`mongodb://localhost:27017`) atau URI lain

### 2) Konfigurasi Backend (`.env`)
Buat file `.env`:
- PORT=4000
- MONGODB_URI=mongodb+srv://zildirayalfirli_db_user:5TSyqlB68CCQd6h7@chatapp.bljqm8z.mongodb.net/chatapp?retryWrites=true&w=majority&appName=chatapp
- JWT_SECRET=supersecretkey
- JWT_EXPIRES=1d

---

## ▶️ Menjalankan Aplikasi

### Backend
```bash
cd chat-backend
npm install
npm run dev   # atau npm start
# http://localhost:4000
