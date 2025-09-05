export class AppError extends Error {
  constructor(status = 500, message = "Internal Server Error", data = []) {
    super(message);
    this.status = status;
    this.data = Array.isArray(data) ? data : (data == null ? [] : [data]);
  }
}

export const BadRequest   = (msg = "Bad Request", data)  => new AppError(400, msg, data);
export const Unauthorized = (msg = "Unauthorized", data) => new AppError(401, msg, data);
export const Forbidden    = (msg = "Forbidden", data)    => new AppError(403, msg, data);
export const NotFound     = (msg = "Not Found", data)    => new AppError(404, msg, data);
export const Conflict     = (msg = "Conflict", data)     => new AppError(409, msg, data);

export function mapMongooseError(err) {
  if (err?.code === 11000) {
    const key = Object.keys(err.keyValue || {})[0];
    const val = err.keyValue?.[key];
    return Conflict(`${key || "Resource"} already exists`, [{ key, value: val }]);
  }
  if (err?.name === "ValidationError") {
    const details = Object.values(err.errors || {}).map(e => ({ path: e.path, message: e.message }));
    return BadRequest("Validation error", details);
  }
  if (err?.name === "CastError") {
    return BadRequest(`Invalid ${err.path}`, [{ path: err.path, value: err.value }]);
  }
  return err;
}
