// routes/room_route.js
import { Router } from "express";
import { auth } from "../middlewares/auth.js";
import roomController from "../controllers/room_controller.js";

const router = Router();

router.post("/", auth(true), roomController.create);
router.get("/", roomController.listAll);
router.get("/:id", roomController.detail);
router.post("/:id/join", auth(true), roomController.join);

export default router;
