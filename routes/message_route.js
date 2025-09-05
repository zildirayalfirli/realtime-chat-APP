// routes/message_route.js
import { Router } from "express";
import { auth } from "../middlewares/auth.js";
import { requireRoomMember } from "../middlewares/roomMember.js";
import messageController from "../controllers/message_controller.js";

const router = Router();

router.get("/rooms/:id/messages", auth(true), requireRoomMember, messageController.list);
router.post("/rooms/:id/messages", auth(true), requireRoomMember, messageController.create);

export default router;
