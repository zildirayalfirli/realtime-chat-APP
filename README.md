# Realtime Chat App — Express, MongoDB, Socket.IO, React

Aplikasi chat sederhana dengan:
- Auth JWT (login/register)
- Room (buat, daftar, detail, join)
- Chat realtime (Socket.IO) + persist ke MongoDB
- Typing indicator & presence online/offline (snapshot per join/leave/disconnect)

---

## 📦 Tech Stack
- Backend: Node.js, Express, Socket.IO, MongoDB
- Auth: JWT
- Frontend: React (Vite)

---

## 🔧 Persiapan

### 1) Prasyarat
- Node.js 18+ (disarankan LTS terbaru)
- MongoDB berjalan lokal (`mongodb://localhost:27017`) atau URI lain

### 2) Konfigurasi Backend (`.env`)
Buat file `.env`:
PORT=4000
MONGODB_URI=mongodb+srv://zildirayalfirli_db_user:5TSyqlB68CCQd6h7@chatapp.bljqm8z.mongodb.net/chatapp?retryWrites=true&w=majority&appName=chatapp
JWT_SECRET=supersecretkey
JWT_EXPIRES=1d
