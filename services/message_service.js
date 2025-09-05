// services/message_service.js
import mongoose from "mongoose";
import Message from "../models/message.js";
import { AppError, BadRequest, mapMongooseError } from "../utils/errors.js";

function ensureObjectId(id, fieldName = "id") {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw BadRequest(`Invalid ${fieldName}`, [{ field: fieldName, value: id }]);
  }
}

async function listRoomMessages({ roomId, before }) {
  try {
    ensureObjectId(roomId, "roomId");

    const filter = { room: roomId };
    if (before) {
      const dt = new Date(before);
      if (isNaN(dt.getTime())) throw BadRequest("Invalid 'before' datetime");
      filter.createdAt = { $lt: dt };
    }

    return await Message.find(filter)
      .sort({ createdAt: -1 })
      .populate("sender", "username");
  } catch (err) {
    const mapped = mapMongooseError(err);
    throw mapped instanceof AppError ? mapped : err;
  }
}

async function createMessage({ roomId, senderId, content }) {
  try {
    ensureObjectId(roomId, "roomId");
    ensureObjectId(senderId, "senderId");
    if (!content?.trim()) throw BadRequest("content required");

    const msg = await Message.create({ room: roomId, sender: senderId, content });
    return msg;
  } catch (err) {
    const mapped = mapMongooseError(err);
    throw mapped instanceof AppError ? mapped : err;
  }
}

export default { listRoomMessages, createMessage };