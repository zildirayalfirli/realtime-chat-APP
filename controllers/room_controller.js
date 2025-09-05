// controllers/room_controller.js
import roomService from "../services/room_service.js";

async function create(req, res, next) {
  try {
    const room = await roomService.createRoom({ name: req.body.name, creatorId: req.user.id });
    return res.created(room, "Room created");
  } catch (e) { e.status ||= 400; next(e); }
}

async function listAll(_req, res, next) {
  try {
    const rooms = await roomService.listRooms();
    return res.ok(rooms, "Rooms fetched");
  } catch (e) { next(e); }
}

async function detail(req, res, next) {
  try {
    const room = await roomService.getRoom(req.params.id);
    if (!room) return res.fail(404, "Room not found");
    return res.ok(room, "Room detail");
  } catch (e) { next(e); }
}

async function join(req, res, next) {
  try {
    const room = await roomService.joinRoom(req.params.id, req.user.id);
    if (!room) return res.fail(404, "Room not found");
    return res.ok({ roomId: room._id }, "Joined");
  } catch (e) { next(e); }
}

export default { create, listAll, detail, join };