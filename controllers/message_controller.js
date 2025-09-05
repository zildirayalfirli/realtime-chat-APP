// controllers/message_controller.js
import messageService from "../services/message_service.js";

let ioRef = null;
export function bindIO(io) { ioRef = io; }

async function list(req, res, next) {
  try {
    const messages = await messageService.listRoomMessages({
      roomId: req.params.id,
      before: req.query.before
    });
    return res.ok(messages, "Messages fetched");
  } catch (e) { next(e); }
}

async function create(req, res, next) {
  try {
    const msg = await messageService.createMessage({
      roomId: req.params.id,
      senderId: req.user.id,
      content: req.body.content
    });

    const payload = {
      _id: msg._id,
      room: String(msg.room),
      sender: { _id: req.user.id, username: req.user.username },
      content: msg.content,
      createdAt: msg.createdAt
    };

    ioRef?.to(String(msg.room)).emit("chatMessage", payload);
    return res.created(payload, "Message created");
  } catch (e) { e.status ||= 400; next(e); }
}

export default { list, create, bindIO };