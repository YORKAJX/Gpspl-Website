import ms from "ms";
import { env } from "../config/env.js";
import { tokenRepository } from "../repositories/token.repository.js";
import { userRepository } from "../repositories/user.repository.js";
import { ApiError } from "../utils/ApiError.js";
import { hashPassword, hashToken, verifyPassword } from "../utils/crypto.js";
import { createRefreshToken, signAccessToken } from "../utils/tokens.js";

function refreshExpiryDate() {
  return new Date(Date.now() + ms(env.JWT_REFRESH_EXPIRES_IN));
}

function publicUser(user) {
  return { id: user.id, name: user.name, email: user.email, role: user.role };
}

async function issueTokens(user, reqMeta) {
  const accessToken = signAccessToken(user);
  const refreshToken = createRefreshToken(user);
  await tokenRepository.create({
    tokenHash: hashToken(refreshToken),
    userId: user.id,
    ipAddress: reqMeta.ipAddress,
    userAgent: reqMeta.userAgent,
    expiresAt: refreshExpiryDate()
  });
  return { accessToken, refreshToken };
}

export const authService = {
  async createUser(input) {
    const existing = await userRepository.findByEmail(input.email);
    if (existing) throw new ApiError(409, "A user with this email already exists");

    const user = await userRepository.create({
      name: input.name,
      email: input.email,
      role: input.role,
      passwordHash: await hashPassword(input.password)
    });

    return publicUser(user);
  },

  async login(input, reqMeta) {
    const user = await userRepository.findByEmail(input.email);
    if (!user || !user.isActive) throw new ApiError(401, "Invalid email or password");

    const valid = await verifyPassword(user.passwordHash, input.password);
    if (!valid) throw new ApiError(401, "Invalid email or password");

    await userRepository.updateLastLogin(user.id);
    const tokens = await issueTokens(user, reqMeta);
    return { user: publicUser(user), ...tokens };
  },

  async refresh(refreshToken, reqMeta) {
    const saved = await tokenRepository.findByHash(hashToken(refreshToken));
    if (!saved || saved.revokedAt || saved.expiresAt <= new Date() || !saved.user.isActive) {
      throw new ApiError(401, "Invalid refresh token");
    }

    await tokenRepository.revoke(saved.id);
    const tokens = await issueTokens(saved.user, reqMeta);
    return { user: publicUser(saved.user), ...tokens };
  },

  async logout(refreshToken) {
    const saved = await tokenRepository.findByHash(hashToken(refreshToken));
    if (saved && !saved.revokedAt) await tokenRepository.revoke(saved.id);
  }
};
