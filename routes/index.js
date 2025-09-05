// routes/index.js
import { Router } from "express";
import authRoutes from "./auth_route.js";
import userRoutes from "./user_route.js";
import roomRoutes from "./room_route.js";
import messageRoutes from "./message_route.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/rooms", roomRoutes);
router.use("/", messageRoutes);

export default router;
