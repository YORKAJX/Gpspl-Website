import { prisma } from "../config/prisma.js";

export const tokenRepository = {
  create(data) {
    return prisma.refreshToken.create({ data });
  },
  findByHash(tokenHash) {
    return prisma.refreshToken.findUnique({ where: { tokenHash }, include: { user: true } });
  },
  revoke(id) {
    return prisma.refreshToken.update({ where: { id }, data: { revokedAt: new Date() } });
  },
  revokeAllForUser(userId) {
    return prisma.refreshToken.updateMany({ where: { userId, revokedAt: null }, data: { revokedAt: new Date() } });
  }
};
