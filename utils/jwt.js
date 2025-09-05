// utils/jwt.js
import jwt from "jsonwebtoken";

function requireSecret() {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not set in environment");
  }
}

const DEFAULT_EXPIRES = process.env.JWT_EXPIRES;

export function Token(payload, options = {}) {
  requireSecret();
  const expiresIn = options.expiresIn ?? DEFAULT_EXPIRES;
  return jwt.sign(payload, process.env.JWT_SECRET, { ...options, expiresIn });
}

export function verifyToken(token) {
  requireSecret();
  return jwt.verify(token, process.env.JWT_SECRET);
}