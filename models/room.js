// models/room.js
import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
  {
    name: { type: String, unique: true, required: true, trim: true },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
  },
  { timestamps: true }
);

export default mongoose.model("Room", roomSchema);
