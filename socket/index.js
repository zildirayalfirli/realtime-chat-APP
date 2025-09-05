// socket/index.js
import jwt from "jsonwebtoken";
import roomService from "../services/room_service.js";
import messageService from "../services/message_service.js";

const userSocketCount = new Map();
const socketRooms = new Map();

function incUser(uid) { userSocketCount.set(uid, (userSocketCount.get(uid) || 0) + 1); }
function decUser(uid) {
  const n = (userSocketCount.get(uid) || 1) - 1;
  if (n <= 0) userSocketCount.delete(uid); else userSocketCount.set(uid, n);
}
function isOnline(uid) { return userSocketCount.has(uid); }

export function initSocket(io) {
  io.use((socket, next) => {
    const token = socket.handshake.auth?.token || socket.handshake.query?.token;
    if (!token) return next(new Error("unauthorized"));
    try {
      const p = jwt.verify(token, process.env.JWT_SECRET);
      socket.user = { id: p.id, username: p.username };
      next();
    } catch {
      next(new Error("unauthorized"));
    }
  });

  io.on("connection", (socket) => {
    const { id: userId, username } = socket.user;
    incUser(userId);
    io.emit("userOnline", { userId, username });
    socketRooms.set(socket.id, new Set());

    socket.on("joinRoom", async ({ roomId }) => {
    if (!roomId) return;
    const ok = await roomService.isMember(roomId, userId);
    if (!ok) return;

    socket.join(String(roomId));
    socketRooms.get(socket.id).add(String(roomId));

    const clients = await io.in(String(roomId)).fetchSockets();
    const onlineUsers = [];
    const seen = new Set();
    for (const s of clients) {
        const uid = s.user?.id;
        const uname = s.user?.username;
        if (uid && !seen.has(uid)) { seen.add(uid); onlineUsers.push({ userId: uid, username: uname }); }
    }

    io.to(String(roomId)).emit("presence", { roomId: String(roomId), users: onlineUsers });

    socket.to(String(roomId)).emit("userOnline", { userId, username, roomId });
    });

    socket.on("leaveRoom", async ({ roomId }) => {
    if (!roomId) return;
    const ok = await roomService.isMember(roomId, userId);
    if (!ok) return;

    socket.leave(String(roomId));
    socketRooms.get(socket.id)?.delete(String(roomId));

    const clients = await io.in(String(roomId)).fetchSockets(); 
    const onlineUsers = [];
    const seen = new Set();
    for (const s of clients) {
        const uid = s.user?.id;
        const uname = s.user?.username;
        if (uid && !seen.has(uid)) { seen.add(uid); onlineUsers.push({ userId: uid, username: uname }); }
    }

    io.to(String(roomId)).emit("presence", { roomId: String(roomId), users: onlineUsers });

    socket.emit("presence", { roomId: String(roomId), users: onlineUsers });

    socket.to(String(roomId)).emit("userOffline", { userId, username, roomId });
    });

    socket.on("typing", ({ roomId, isTyping }) => {
      if (!roomId) return;
      socket.to(String(roomId)).emit("typing", { roomId, userId, username, isTyping: !!isTyping });
    });

    socket.on("chatMessage", async ({ roomId, content }) => {
      if (!roomId || !content?.trim()) return;
      const ok = await roomService.isMember(roomId, userId);
      if (!ok) return;

      const msg = await messageService.createMessage({ roomId, senderId: userId, content });
      const payload = {
        _id: msg._id,
        room: String(msg.room),
        sender: { _id: userId, username },
        content: msg.content,
        createdAt: msg.createdAt
      };
      io.to(String(roomId)).emit("chatMessage", payload);
    });

    socket.on("disconnect", () => {
      const rooms = socketRooms.get(socket.id) || new Set();
      rooms.forEach(rid => socket.to(rid).emit("userOffline", { userId, username, roomId: rid }));
      socketRooms.delete(socket.id);

      decUser(userId);
      if (!isOnline(userId)) io.emit("userOffline", { userId, username });
    });
  });
}
