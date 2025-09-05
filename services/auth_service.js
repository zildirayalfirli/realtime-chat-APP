// services/auth_service.js
import User from "../models/user.js";
import { Token } from "../utils/jwt.js";
import { AppError, BadRequest, Conflict, Unauthorized, mapMongooseError } from "../utils/errors.js";

async function register({ username, password }) {
  try {
    if (!username?.trim() || !password) throw BadRequest("username & password required");

    const exists = await User.findOne({ username });
    if (exists) throw Conflict("Username taken");

    const user = await User.create({ username, password });
    return { id: user._id, username: user.username };
  } catch (err) {
    const mapped = mapMongooseError(err);
    throw mapped instanceof AppError ? mapped : err;
  }
}

async function login({ username, password }) {
  try {
    if (!username?.trim() || !password) throw BadRequest("username & password required");

    const user = await User.findOne({ username });
    if (!user || !(await user.comparePassword(password))) {
      throw Unauthorized("Invalid credentials");
    }

    const token = Token({ id: user._id, username: user.username });
    return { token, user: { id: user._id, username: user.username } };
  } catch (err) {
    const mapped = mapMongooseError(err);
    throw mapped instanceof AppError ? mapped : err;
  }
}

export default { register, login };
