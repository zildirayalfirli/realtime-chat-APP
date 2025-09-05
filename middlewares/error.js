// middlewares/error.js
import { send } from "./response.js";

export function notFound(_req, res) {
  return send(res, 404, "Not Found", []);
}

export function errorHandler(err, _req, res, _next) {
  const status  = Number(err.status) || 500;
  const message = err.message || "Internal Server Error";
  const data    = Array.isArray(err.data) ? err.data : (err.data ? [err.data] : []);
  return send(res, status, message, data);
}
