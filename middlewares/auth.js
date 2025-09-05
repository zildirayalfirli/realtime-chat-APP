// middleware/auth.js
import { verifyToken } from "../utils/jwt.js";

export function auth(required = true) {
  return (req, res, next) => {
    const hdr = req.headers.authorization || "";
    const token = hdr.startsWith("Bearer ") ? hdr.slice(7) : null;

    if (!token && !required) return next();
    if (!token) return res.fail(401, "Missing token");

    try {
      const payload = verifyToken(token);
      req.user = { id: payload.id, username: payload.username };
      next();
    } catch {
      return res.fail(401, "Invalid token");
    }
  };
}