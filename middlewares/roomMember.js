// middleware/roomMember.js
import roomService from "../services/room_service.js";

export async function requireRoomMember(req, res, next) {
  const roomId = req.params.id || req.body.roomId;
  if (!roomId) return res.fail(400, "Room id required");

  const isMember = await roomService.isMember(roomId, req.user.id);
  if (!isMember) return res.fail(403, "Join the room first");

  next();
}
