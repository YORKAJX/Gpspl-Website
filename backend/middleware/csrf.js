import crypto from "node:crypto";
import { env } from "../config/env.js";
import { ApiError } from "../utils/ApiError.js";

const tokenTtlMs = 60 * 60 * 1000;

function signToken(value) {
  return crypto.createHmac("sha256", env.COOKIE_SECRET).update(value).digest("base64url");
}

function createCsrfToken() {
  const issuedAt = Date.now();
  const nonce = crypto.randomBytes(32).toString("base64url");
  const payload = `${issuedAt}.${nonce}`;
  return `${payload}.${signToken(payload)}`;
}

function isValidCsrfToken(token) {
  if (!token || typeof token !== "string") return false;
  const parts = token.split(".");
  if (parts.length !== 3) return false;
  const [issuedAt, nonce, signature] = parts;
  const payload = `${issuedAt}.${nonce}`;
  const expected = signToken(payload);
  const age = Date.now() - Number(issuedAt);
  if (signature.length !== expected.length) return false;
  return (
    Number.isFinite(age) &&
    age >= 0 &&
    age <= tokenTtlMs &&
    crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))
  );
}

export function csrfProtection(req, _res, next) {
  if (["GET", "HEAD", "OPTIONS"].includes(req.method)) return next();
  const token = req.get("x-csrf-token") || req.body?._csrf;
  if (!isValidCsrfToken(token)) return next(new ApiError(403, "Invalid CSRF token"));
  next();
}

export function csrfTokenController(req, res) {
  const token = createCsrfToken();
  res.cookie(env.CSRF_COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: env.isProduction,
    signed: true,
    maxAge: tokenTtlMs
  });
  res.json({ csrfToken: token });
}
