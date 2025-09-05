// controllers/user_controller.js
import userService from "../services/user_service.js";

async function me(req, res, next) {
  try {
    const user = await userService.getMe(req.user.id);
    return res.ok(user, "OK");
  } catch (e) { next(e); }
}

export default { me };