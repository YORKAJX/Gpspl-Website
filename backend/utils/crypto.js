import crypto from "node:crypto";
import argon2 from "argon2";

export async function hashPassword(password) {
  return argon2.hash(password, {
    type: argon2.argon2id,
    memoryCost: 19456,
    timeCost: 2,
    parallelism: 1
  });
}

export async function verifyPassword(hash, password) {
  return argon2.verify(hash, password);
}

export function sha256(value) {
  return crypto.createHash("sha256").update(value).digest("hex");
}

export function randomToken(bytes = 48) {
  return crypto.randomBytes(bytes).toString("base64url");
}
