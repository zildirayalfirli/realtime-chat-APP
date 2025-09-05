// services/room_services.js
import mongoose from "mongoose";
import Room from "../models/room.js";
import { BadRequest } from "../utils/errors.js";

function ensureId(id, field = "id") {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw BadRequest(`Invalid ${field}`, [{ field, value: id }]);
  }
}

async function createRoom({ name, creatorId }) {
  if (!name?.trim()) throw BadRequest("Name required");
  const exists = await Room.findOne({ name });
  if (exists) throw BadRequest("Room name exists");
  return Room.create({ name, members: [creatorId] });
}

async function listRooms() {
  return Room.find().select("_id name members createdAt");
}

async function getRoom(id) {
  ensureId(id, "roomId");
  return Room.findById(id);
}

async function joinRoom(id, userId) {
  ensureId(id, "roomId");
  const room = await Room.findById(id);
  if (!room) return null;
  const already = room.members.some(m => String(m) === String(userId));
  if (!already) {
    room.members.push(userId);
    await room.save();
  }
  return room;
}

async function isMember(roomId, userId) {
  ensureId(roomId, "roomId");
  const room = await Room.findById(roomId).select("_id members");
  if (!room) return false;
  return room.members.some(m => String(m) === String(userId));
}

export default { createRoom, listRooms, getRoom, joinRoom, isMember };