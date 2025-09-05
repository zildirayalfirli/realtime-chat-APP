// services/user_services.js
import User from "../models/user.js";

async function getMe(userId) {
  return User.findById(userId).select("_id username createdAt");
}

export default { getMe };