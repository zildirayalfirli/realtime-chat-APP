// middlewares/response.js
export function send(res, status = 200, message = "OK", data = []) {
  const arr = Array.isArray(data) ? data : (data == null ? [] : [data]);
  return res.status(status).json({ status, message, data: arr });
}

export default function responseMiddleware(_req, res, next) {
  res.reply   = (status = 200, message = "OK", data = []) => send(res, status, message, data);
  res.ok      = (data = [], message = "OK")                => send(res, 200, message, data);
  res.created = (data = [], message = "Created")           => send(res, 201, message, data);
  res.fail    = (status = 400, message = "Bad Request", data = []) =>
    send(res, status, message, data);
  next();
}
