// models/message.js
import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    room: { type: mongoose.Schema.Types.ObjectId, ref: "Room", required: true },
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false },
    senderName: { type: String, trim: true },
    content: { type: String, required: true, trim: true }
  },
  { timestamps: true }
);

messageSchema.index({ room: 1, createdAt: -1 });

export default mongoose.model("Message", messageSchema);
