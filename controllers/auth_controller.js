// controllers/auth_controller.js
import authService from "../services/auth_service.js";

async function register(req, res, next) {
  try {
    const user = await authService.register(req.body);
    return res.created(user, "User registered");
  } catch (e) { next(e); }
}

async function login(req, res, next) {
  try {
    const result = await authService.login(req.body);
    return res.ok(result, "Login success");
  } catch (e) { e.status ||= 401; next(e); }
}

export default { register, login };