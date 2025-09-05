// routes/user_route.js
import { Router } from "express";
import { auth } from "../middlewares/auth.js";
import userController from "../controllers/user_controller.js";

const router = Router();

router.get("/me", auth(true), userController.me);

export default router;
