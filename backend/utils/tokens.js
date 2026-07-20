import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { randomToken } from "./crypto.js";

export function signAccessToken(user) {
  return jwt.sign(
    { sub: user.id, role: user.role, email: user.email },
    env.JWT_ACCESS_SECRET,
    { expiresIn: env.JWT_ACCESS_EXPIRES_IN, issuer: "gpspl-backend", audience: "gpspl-api" }
  );
}

export function verifyAccessToken(token) {
  return jwt.verify(token, env.JWT_ACCESS_SECRET, { issuer: "gpspl-backend", audience: "gpspl-api" });
}

export function createRefreshToken() {
  return randomToken(64);
}
